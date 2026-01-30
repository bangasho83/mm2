import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d8ecff",
          200: "#b3d9ff",
          300: "#85c0ff",
          400: "#4f9cff",
          500: "#2f7bff",
          600: "#1f5ee6",
          700: "#1849b4",
          800: "#173f8f",
          900: "#163671"
        },
        ink: {
          50: "#f6f7fb",
          100: "#e6e9f2",
          200: "#c6cfdf",
          300: "#9eacc7",
          400: "#6f81a9",
          500: "#50628c",
          600: "#3e4d72",
          700: "#323f5d",
          800: "#2b364f",
          900: "#20283a"
        },
        mint: {
          50: "#ecfdf7",
          100: "#d1faec",
          200: "#a3f2d8",
          300: "#6ce7bf",
          400: "#2ed39f",
          500: "#10b981",
          600: "#0c9a6b",
          700: "#0a7c58",
          800: "#0a5f46",
          900: "#0a4a38"
        }
      },
      boxShadow: {
        "soft": "0 18px 60px rgba(15, 23, 42, 0.08)",
        "card": "0 10px 30px rgba(15, 23, 42, 0.08)",
        "glass": "0 12px 40px rgba(15, 23, 42, 0.12)"
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem"
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at top, rgba(46, 211, 159, 0.18), transparent 60%), radial-gradient(circle at 20% 20%, rgba(47, 123, 255, 0.16), transparent 45%), linear-gradient(135deg, #f7f9ff 0%, #f8fbff 40%, #f7fdfc 100%)"
      }
    }
  },
  plugins: []
};

export default config;
