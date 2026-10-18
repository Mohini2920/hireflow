import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    extend: {},
  },

  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        HireFlowAI: {
          primary: "#6366F1",
          secondary: "#7C3AED",
          accent: "#06B6D4",
          neutral: "#475569",

          "base-100": "#F8FAFC",
          "base-200": "#E2E8F0",
          "base-300": "#FFFFFF",

          info: "#06B6D4",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
    ],

    darkTheme: "HireFlowAI",
  },
};