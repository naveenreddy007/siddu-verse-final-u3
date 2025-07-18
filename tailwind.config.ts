import type { Config } from "tailwindcss"
import defaultConfig from "shadcn/ui/tailwind.config"

const config = {
  ...defaultConfig,
  content: [
    ...defaultConfig.content,
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...defaultConfig.theme,
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        "siddu-deep-night": "#121212",
        "siddu-dark-grey": "#1E1E1E",
        "siddu-light-grey": "#2A2A2A",
        "siddu-electric-blue": "#00BFFF",
        "siddu-text-primary": "#E0E0E0",
        "siddu-text-secondary": "#A0A0A0",
      },
      borderRadius: {
        ...defaultConfig.theme.extend.borderRadius,
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)",
      },
      keyframes: {
        ...defaultConfig.theme.extend.keyframes,
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      animation: {
        ...defaultConfig.theme.extend.animation,
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        aurora: "aurora 60s linear infinite",
      },
    },
  },
  plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
} satisfies Config

export default config
