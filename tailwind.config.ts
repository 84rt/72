
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
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: "#d3c7a6",
        input: "#d3c7a6",
        ring: "#847e58",
        background: "#f7f3e9",
        foreground: "#2c2a20",
        primary: {
          DEFAULT: "#847e58",
          foreground: "#f7f3e9",
          hover: "#6a654a",
        },
        secondary: {
          DEFAULT: "#e6dfc9",
          foreground: "#2c2a20",
        },
        muted: {
          DEFAULT: "#e6e0cd",
          foreground: "#6e6c64",
        },
        accent: {
          DEFAULT: "#f0ece0",
          foreground: "#2c2a20",
        },
        popover: {
          DEFAULT: "#f7f3e9",
          foreground: "#2c2a20",
        },
        card: {
          DEFAULT: "#f7f3e9",
          foreground: "#2c2a20",
        },
        destructive: {
          DEFAULT: "#a13122",
          foreground: "#f7f3e9",
        },
        success: {
          DEFAULT: "#31634a",
          foreground: "#f7f3e9",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          'primary-foreground': "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          'accent-foreground': "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        countdown: {
          "0%": { width: "100%" },
          "100%": { width: "0%" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "countdown": "countdown 10s linear forwards"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
