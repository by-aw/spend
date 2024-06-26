const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
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
        drawer: "hsl(var(--drawer))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          stroke: "hsl(var(--primary-stroke))",
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
        brand: {
          red: "hsl(var(--red))",
          redforeground: "hsl(var(--red-foreground))",
          pink: "hsl(var(--pink))",
          pinkforeground: "hsl(var(--pink-foreground))",
          blue: "hsl(var(--blue))",
          blueforeground: "hsl(var(--blue-foreground))",
          green: "hsl(var(--green))",
          greenforeground: "hsl(var(--green-foreground))",
        }
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
        "overlay-up": "overlayShow 150ms cubic-bezier(0,.4,.4,1)",
        "overlay-down": "overlayShow 150ms cubic-bezier(0,.4,.4,1) reverse",
        shake: "shake 0.2s ease-in-out 0s 1",
        fadein: "fadeIn 0.2s ease-out",
        fadeout: "fadeOut 0.2s ease-out",
        fade: "fade 400ms ease-in-out",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      boxShadow: {
        surface: "var(--shadow-surface)",
      },
      margin: {
        calc: "calc(100dvw - 100%)",
      },
      width: {
        calc: "calc(100% - 2rem)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
