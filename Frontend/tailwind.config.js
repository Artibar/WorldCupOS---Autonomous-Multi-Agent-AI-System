/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tertiaryContainer: "#7d4ce7",
        primaryContainer: "#2e5bff",
        tertiary: "#d0bcff",
        onTertiaryContainer: "#f6edff",
        errorContainer: "#93000a",
        surfaceContainerLow: "#131b2e",
        inverseSurface: "#dae2fd",
        inversePrimary: "#124af0",
        onSurface: "#dae2fd",
        secondary: "#a6e6ff",
        surfaceVariant: "#2d3449",
        error: "#ffb4ab",
        outlineVariant: "#434656",
        surfaceDim: "#0b1326",
        onSurfaceVariant: "#c4c5d9",
        primary: "#b8c3ff",
        background: "#0b1326",
        surface: "#0b1326",
        surfaceContainer: "#171f33",
        surfaceContainerHigh: "#222a3d",
        surfaceContainerHighest: "#2d3449",
        secondaryContainer: "#14d1ff",
        outline: "#8e90a2",
        colors: {
          primary: "#b8c3ff",
          primaryContainer: "#2e5bff",
          tertiary: "#d0bcff",
          tertiaryContainer: "#7d4ce7",

          background: "#0b1326",
          surface: "#0b1326",

          surfaceContainerLow: "#131b2e",
          surfaceContainer: "#171f33",
          surfaceContainerHigh: "#222a3d",
          surfaceContainerHighest: "#2d3449",

          surfaceVariant: "#2d3449",

          outlineVariant: "#434656",
          outline: "#8e90a2",

          onBackground: "#dae2fd",
          onSurfaceVariant: "#c4c5d9",
        },
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      animation: {
        pulseSlow: "pulse 2s infinite",
      },

      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};