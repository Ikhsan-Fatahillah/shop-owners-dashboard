
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
				// New color schemes
				'soft-blue': {
					DEFAULT: '#D3E4FD',
					50: '#F5F9FF',
					100: '#E8F1FD',
					200: '#C1D9FA',
					300: '#9BC2F7',
					400: '#74ABF4',
					500: '#4E94F1',
					600: '#1A71E6',
					700: '#1259B8',
					800: '#0D428A',
					900: '#092C5C',
				},
				'soft-purple': {
					DEFAULT: '#E5DEFF',
					50: '#F7F5FF',
					100: '#EEEAFF',
					200: '#DCD5FF',
					300: '#C5B9FF',
					400: '#AD9EFF',
					500: '#9682FF',
					600: '#6542FF',
					700: '#4819FF',
					800: '#3500EB',
					900: '#2800B3',
				},
				'soft-pink': {
					DEFAULT: '#FFDEE2',
					50: '#FFF5F6',
					100: '#FFEBEE',
					200: '#FFD7DC',
					300: '#FFC0C9',
					400: '#FFA8B5',
					500: '#FF91A2',
					600: '#FF597A',
					700: '#FF2252',
					800: '#E9003A',
					900: '#B1002C',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
				'card': '0 2px 8px rgba(0, 0, 0, 0.07)',
				'elevated': '0 8px 24px rgba(0, 0, 0, 0.12)',
				'button': '0 2px 5px rgba(0, 0, 0, 0.08)',
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			backgroundImage: {
				'gradient-soft': 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)',
				'gradient-warm': 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
				'gradient-blue': 'linear-gradient(90deg, hsla(216, 41%, 79%, 0.3) 0%, hsla(186, 33%, 94%, 0.3) 100%)',
				'gradient-purple': 'linear-gradient(90deg, hsla(277, 75%, 84%, 0.2) 0%, hsla(297, 50%, 51%, 0.1) 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
