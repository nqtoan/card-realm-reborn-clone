
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Montserrat', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Bootstrap-inspired colors (PokedExplore style)
				bs: {
					blue: '#0d6efd',
					indigo: '#6610f2',
					purple: '#6f42c1',
					pink: '#d63384',
					red: '#dc3545',
					orange: '#fd7e14',
					yellow: '#ffc107',
					green: '#198754',
					teal: '#20c997',
					cyan: '#0dcaf0',
					black: '#000',
					white: '#fff',
					gray: {
						DEFAULT: '#6c757d',
						100: '#f8f9fa',
						200: '#e9ecef',
						300: '#dee2e6',
						400: '#ced4da',
						500: '#adb5bd',
						600: '#6c757d',
						700: '#495057',
						800: '#343a40',
						900: '#212529',
						dark: '#343a40',
					},
				},
				// Pokémon type colors (PokedExplore)
				type: {
					fire: '#ff9c54',
					water: '#4d90d5',
					grass: '#63bb5b',
					poison: '#ab6ac8',
					flying: '#92aade',
					electric: '#f3d23b',
					psychic: '#f97176',
					dark: '#5a5366',
					fairy: '#ec8fe6',
					ice: '#74cec0',
					bug: '#90c12c',
					normal: '#9099a1',
					fighting: '#ce4069',
					ground: '#d97746',
					rock: '#c7b78b',
					ghost: '#5269ac',
					dragon: '#096dc4',
					steel: '#5a8ea2',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in-top': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-10px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				'wave': {
					'0%': {
						transform: 'translateX(0)',
					},
					'100%': {
						transform: 'translateX(-50%)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-top': 'fade-in-top 0.5s ease-out',
				'wave': 'wave 25s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
