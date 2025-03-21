import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        text: {
          50: "oklch(95.36% 0.015 312.24)",
          100: "oklch(90.88% 0.028 311.30)",
          200: "oklch(81.48% 0.061 310.78)",
          300: "oklch(72.05% 0.091 309.66)",
          400: "oklch(62.54% 0.126 309.05)",
          500: "oklch(53.32% 0.157 308.09)",
          600: "oklch(45.50% 0.132 307.98)",
          700: "oklch(37.44% 0.103 308.03)",
          800: "oklch(28.94% 0.075 308.99)",
          900: "oklch(19.78% 0.040 309.80)",
          950: "oklch(14.70% 0.023 306.99)",
        },
        background: {
          50: "oklch(95.31% 0.016 306.41)",
          100: "oklch(90.48% 0.033 308.95)",
          200: "oklch(80.76% 0.068 307.52)",
          300: "oklch(70.97% 0.105 306.46)",
          400: "oklch(61.31% 0.142 305.70)",
          500: "oklch(51.87% 0.176 303.66)",
          600: "oklch(44.38% 0.147 304.05)",
          700: "oklch(36.45% 0.116 303.89)",
          800: "oklch(28.20% 0.084 304.67)",
          900: "oklch(19.20% 0.047 304.43)",
          950: "oklch(14.38% 0.026 309.08)",
        },
        primary: {
          50: "oklch(95.31% 0.016 306.41)",
          100: "oklch(90.48% 0.033 308.95)",
          200: "oklch(81.00% 0.066 308.53)",
          300: "oklch(71.30% 0.102 307.85)",
          400: "oklch(61.53% 0.139 306.31)",
          500: "oklch(52.17% 0.174 304.72)",
          600: "oklch(44.58% 0.145 304.77)",
          700: "oklch(36.79% 0.114 305.61)",
          800: "oklch(28.44% 0.081 306.05)",
          900: "oklch(19.33% 0.047 306.58)",
          950: "oklch(14.38% 0.026 309.08)",
        },
        secondary: {
          50: "oklch(95.12% 0.017 308.26)",
          100: "oklch(90.48% 0.033 308.95)",
          200: "oklch(80.70% 0.072 308.37)",
          300: "oklch(71.02% 0.108 307.69)",
          400: "oklch(61.29% 0.148 306.57)",
          500: "oklch(51.96% 0.182 304.37)",
          600: "oklch(44.47% 0.153 304.92)",
          700: "oklch(36.61% 0.120 305.24)",
          800: "oklch(28.23% 0.087 305.55)",
          900: "oklch(19.33% 0.047 306.58)",
          950: "oklch(14.45% 0.028 306.85)",
        },
        accent: {
          50: "oklch(95.15% 0.018 306.66)",
          100: "oklch(90.32% 0.036 308.84)",
          200: "oklch(80.59% 0.076 307.84)",
          300: "oklch(70.61% 0.117 307.46)",
          400: "oklch(60.97% 0.157 306.30)",
          500: "oklch(51.83% 0.192 304.33)",
          600: "oklch(44.27% 0.161 304.47)",
          700: "oklch(36.38% 0.128 304.68)",
          800: "oklch(28.04% 0.094 305.03)",
          900: "oklch(19.19% 0.051 306.18)",
          950: "oklch(14.13% 0.031 308.70)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
