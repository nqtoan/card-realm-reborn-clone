
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { usePrivy } from '@privy-io/react-auth';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, privyLogin, isAuthenticated } = useAuth();
  const { ready, authenticated, login: privyLoginSDK, getAccessToken } = usePrivy();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const privyAuthProcessed = useRef(false);

  const from = location.state?.from?.pathname || '/dashboard';

  // Handle Privy authentication after user logs in with Privy
  useEffect(() => {
    const handlePrivyAuth = async () => {
      // Skip if already authenticated via backend or already processed
      if (isAuthenticated || privyAuthProcessed.current) {
        return;
      }

      if (ready && authenticated) {
        privyAuthProcessed.current = true;
        try {
          const accessToken = await getAccessToken();
          if (accessToken) {
            setLoading(true);
            const success = await privyLogin(accessToken);
            if (success) {
              toast.success(t('auth.loginSuccess'));
              navigate(from, { replace: true });
            } else {
              toast.error(t('auth.loginError'));
              privyAuthProcessed.current = false; // Reset on failure
            }
          }
        } catch (error) {
          console.error('Privy auth error:', error);
          toast.error(t('errors.somethingWentWrong'));
          privyAuthProcessed.current = false; // Reset on error
        } finally {
          setLoading(false);
        }
      }
    };

    handlePrivyAuth();
  }, [ready, authenticated, getAccessToken, privyLogin, navigate, from, t, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success(t('auth.loginSuccess'));
        navigate(from, { replace: true });
      } else {
        toast.error(t('auth.loginError'));
      }
    } catch (error) {
      toast.error(t('errors.somethingWentWrong'));
    } finally {
      setLoading(false);
    }
  };

  const handlePrivyLogin = async () => {
    if (!ready) return;
    setLoading(true);
    try {
      await privyLoginSDK();
      // The useEffect hook will handle the rest after authentication
    } catch (error) {
      console.error('Privy login error:', error);
      toast.error(t('errors.somethingWentWrong'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-primary py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-text-primary">{t('auth.login')}</CardTitle>
          <CardDescription className="text-base">
            {t('auth.email')} and {t('auth.password').toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-text-primary font-semibold">{t('auth.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t('auth.email')}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-text-primary font-semibold">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={t('auth.password')}
                className="mt-1"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full font-bold" 
              disabled={loading}
            >
              {loading ? t('common.loading') : t('auth.login')}
            </Button>
          </form>
          
          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-surface-primary px-2 text-text-secondary">
                {t('common.or') || 'Or'}
              </span>
            </div>
          </div>

          {/* Privy Login Button */}
          <Button
            type="button"
            onClick={handlePrivyLogin}
            className="w-full font-bold"
            disabled={loading || !ready}
            variant="outline"
          >
            {loading ? t('common.loading') : 'Login with Wallet'}
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary font-medium">
              {t('auth.dontHaveAccount')}{' '}
              <Link to="/register" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                {t('auth.register')}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
