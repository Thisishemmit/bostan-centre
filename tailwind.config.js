/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        lavender: {
          50: 'rgb(248, 247, 250)',
          100: 'rgb(233, 230, 241)',
          200: 'rgb(204, 197, 223)',
          300: 'rgb(175, 164, 205)',
          400: 'rgb(146, 131, 187)',
          500: 'rgb(117, 98, 169)',
          600: 'rgb(94, 77, 140)',
          700: 'rgb(72, 59, 107)',
          800: 'rgb(50, 41, 74)',
          900: 'rgb(28, 23, 41)',
          950: 'rgb(17, 14, 25)',
        },
        honeydew: {
          50: 'rgb(246, 251, 246)',
          100: 'rgb(227, 244, 229)',
          200: 'rgb(191, 230, 194)',
          300: 'rgb(154, 216, 158)',
          400: 'rgb(117, 202, 123)',
          500: 'rgb(80, 187, 88)',
          600: 'rgb(60, 156, 68)',
          700: 'rgb(46, 120, 52)',
          800: 'rgb(32, 83, 36)',
          900: 'rgb(18, 46, 20)',
          950: 'rgb(11, 28, 12)',
        },
        beige: {
          50: 'rgb(253, 252, 245)',
          100: 'rgb(248, 245, 224)',
          200: 'rgb(238, 231, 183)',
          300: 'rgb(228, 217, 142)',
          400: 'rgb(218, 204, 101)',
          500: 'rgb(208, 190, 59)',
          600: 'rgb(175, 158, 42)',
          700: 'rgb(134, 121, 32)',
          800: 'rgb(93, 84, 22)',
          900: 'rgb(51, 47, 12)',
          950: 'rgb(31, 28, 7)',
        },

      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
