const sharedConfig = require("@workspace/ui/tailwind.config");

/** @type {import('tailwindcss').Config} */
export default {
  ...sharedConfig,
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};
