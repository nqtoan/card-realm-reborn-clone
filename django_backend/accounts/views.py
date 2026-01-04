from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate, login, logout
from django.conf import settings
from django.core.exceptions import ValidationError
import requests
from .serializers import UserSerializer, LoginSerializer, UserProfileSerializer, RegisterSerializer
from .models import User

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'token': token.key,
                    'user': UserSerializer(user).data
                }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['email'],
                password=serializer.validated_data['password']
            )
            if user:
                token, created = Token.objects.get_or_create(user=user)
                login(request, user)
                return Response({
                    'token': token.key,
                    'user': UserSerializer(user).data
                }, status=status.HTTP_200_OK)
        return Response(
            {'error': 'Invalid credentials'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

from rest_framework.parsers import MultiPartParser, JSONParser

class ProfileView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, JSONParser]
    
    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        user = request.user
        # Create a mutable copy of the request data
        data = request.data.copy()
        # If there's a file, it will be in request.FILES
        serializer = UserProfileSerializer(
            user, 
            data=data, 
            partial=True,
            context={'request': request}  # Pass request to access FILES in serializer
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        print(f"Serializer errors: {serializer.errors}")  # Debug logging
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PrivyLoginView(APIView):
    """
    Authenticate user using Privy access token.
    Verifies token with Privy API and creates/retrieves Django user.
    """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        # Extract Privy access token from Authorization header
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return Response(
                {'error': 'Missing or invalid Authorization header. Expected: Bearer <token>'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        privy_token = auth_header.split('Bearer ')[1].strip()
        if not privy_token:
            return Response(
                {'error': 'Missing Privy access token'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Verify token with Privy API
        privy_app_id = getattr(settings, 'PRIVY_APP_ID', None)
        
        if not privy_app_id:
            return Response(
                {'error': 'Privy APP_ID not configured'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        try:
            # Call Privy API to verify token and get user info
            # Note: User access tokens are verified by Privy API directly
            # The privy-app-id header is optional but recommended
            privy_response = requests.get(
                'https://auth.privy.io/api/v1/users/me',
                headers={
                    'Authorization': f'Bearer {privy_token}',
                    'privy-app-id': privy_app_id,
                },
                timeout=10
            )
            
            if privy_response.status_code != 200:
                return Response(
                    {'error': 'Invalid Privy token'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            
            privy_user_data = privy_response.json()
            privy_id = privy_user_data.get('id')
            
            # Extract email - handle both object and string formats
            email = None
            email_data = privy_user_data.get('email')
            if email_data:
                if isinstance(email_data, dict):
                    email = email_data.get('address')
                elif isinstance(email_data, str):
                    email = email_data
            
            # Extract wallet address from linked accounts
            wallet_address = None
            linked_accounts = privy_user_data.get('linked_accounts', [])
            for account in linked_accounts:
                if account.get('type') == 'wallet':
                    wallet_address = account.get('address')
                    break
            
            # Extract name fields - Privy may provide different field names
            first_name = (
                privy_user_data.get('first_name') or 
                privy_user_data.get('given_name') or 
                privy_user_data.get('name', {}).get('first') if isinstance(privy_user_data.get('name'), dict) else ''
            )
            last_name = (
                privy_user_data.get('last_name') or 
                privy_user_data.get('family_name') or 
                privy_user_data.get('name', {}).get('last') if isinstance(privy_user_data.get('name'), dict) else ''
            )
            
            if not privy_id:
                return Response(
                    {'error': 'Invalid Privy user data'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Create or get user by privy_id
            user, created = User.objects.get_or_create(
                privy_id=privy_id,
                defaults={
                    'email': email or f'privy_{privy_id}@privy.local',
                    'username': email or f'privy_{privy_id}',
                    'first_name': first_name or '',
                    'last_name': last_name or '',
                    'wallet_address': wallet_address,
                    'login_provider': 'privy',
                }
            )
            
            # Update wallet address if it changed
            if wallet_address and user.wallet_address != wallet_address:
                user.wallet_address = wallet_address
                user.save()
            
            # Update email if available and different
            if email and user.email != email:
                # Check if email is already taken by another user
                if not User.objects.filter(email=email).exclude(id=user.id).exists():
                    user.email = email
                    user.username = email
                    user.save()
            
            # Get or create Django token
            token, created = Token.objects.get_or_create(user=user)
            login(request, user)
            
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            }, status=status.HTTP_200_OK)
            
        except requests.RequestException as e:
            return Response(
                {'error': f'Failed to verify Privy token: {str(e)}'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        except Exception as e:
            return Response(
                {'error': f'Internal server error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        # Delete the token to force a new login
        request.user.auth_token.delete()
        logout(request)
        return Response(
            {'message': 'Successfully logged out'}, 
            status=status.HTTP_200_OK
        )
