import type { Config } from "tailwindcss";
export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "#F97316", // 辅助色：橙色，代表活力和创造力
        accent: "#10B981", // 强调色：绿色，代表成长和进步
        dark: "#1E293B", // 深色文本
        light: "#F8FAFC", // 浅色背景
        muted: "#94A3B8", // 次要文本
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
      },
      spacing: {
        "128": "32rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
