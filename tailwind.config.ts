
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
				// Updated colors based on the Eduplex UI image
				status: {
					success: '#22C55E',
					warning: '#FACC15',
					error: '#EF4444'
				},
				'dashboard': {
					'primary': '#8256D9',   // Purple from Eduplex
					'primary-light': '#9D6EE2',
					'primary-dark': '#6F47C1',
					'secondary': '#F3F0FF', // Light purple background
					'secondary-dark': '#E7DEFF',
					'background': '#F7F7F9', // Soft light background
					'card': '#FFFFFF',
					'sidebar': '#1E1E2D',    // Dark sidebar
					'sidebar-active': '#8256D9',
					'text-primary': '#333333',
					'text-secondary': '#6B7280',
					'accent-yellow': '#FFCE3E', // Yellow accent from Eduplex
					'accent-lime': '#BCEB50',   // Lime green from Eduplex
					'accent-pink': '#F8B1D2',   // Pink accent
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
			fontFamily: {
				'sans': ['Inter', 'sans-serif'],
			},
			spacing: {
				'section': '24px',
				'component': '16px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
