import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-contrast light theme
        primary: '#0a0e27',      // Very dark blue for text on light backgrounds
        secondary: '#f8fafc',    // Very light gray for cards/sections
        tertiary: '#ffffff',     // Pure white for elevated surfaces
        elevated: '#f1f5f9',     // Light gray for borders/edges

        // High-contrast semantic colors
        success: '#166534',      // Dark green (AA+ on white)
        error: '#dc2626',        // Dark red (AA+ on white)
        warning: '#b45309',      // Dark amber (AA+ on white)
        info: '#0369a1',         // Dark blue (AA+ on white)
        purple: '#7c3aed',       // Dark purple (AA+ on white)

        // Border colors
        border: '#cbd5e1',       // Medium gray for visible borders
      },
    },
  },
  plugins: [],
};

export default config;
