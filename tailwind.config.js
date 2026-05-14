/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#111111",
          700: "#2A2A28",
          500: "#52524D",
          400: "#6D6D67",
          300: "#8A8A83",
          200: "#B5B5AE"
        },
        surface: {
          canvas: "#F7F8F5",
          raised: "#FFFFFF",
          sunken: "#F2F2EC",
          muted: "#F6F6F2"
        },
        line: {
          strong: "#D9D9D2",
          DEFAULT: "#E6E6E0",
          soft: "#ECECE6",
          whisper: "#F0F0EB"
        },
        success: {
          DEFAULT: "#16A974",
          soft: "#E8F5EF"
        },
        danger: {
          DEFAULT: "#D4503E",
          soft: "#FBECE8"
        },
        warn: {
          DEFAULT: "#C58B2B",
          soft: "#FAF1DF"
        },
        accent: {
          DEFAULT: "#1F1F1D"
        }
      },
      boxShadow: {
        card: "0 1px 2px rgba(17,17,17,0.04), 0 1px 1px rgba(17,17,17,0.02)",
        raised:
          "0 4px 14px -6px rgba(17,17,17,0.08), 0 1px 2px rgba(17,17,17,0.04)",
        inset: "inset 0 0 0 1px rgba(17,17,17,0.04)"
      },
      fontFamily: {
        sans: [
          '"Inter"',
          '"SF Pro Text"',
          "system-ui",
          "-apple-system",
          "sans-serif"
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          "ui-monospace",
          "monospace"
        ]
      },
      letterSpacing: {
        eyebrow: "0.14em"
      },
      transitionTimingFunction: {
        swift: "cubic-bezier(0.32, 0.72, 0, 1)"
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.15)", opacity: "0.85" }
        }
      },
      animation: {
        shimmer: "shimmer 1.8s linear infinite",
        breathe: "breathe 1.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
}
