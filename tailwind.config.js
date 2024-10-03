/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Look for Tailwind classes in these files
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Lexend', 'sans-serif'],
      serif: ['Lexend', 'serif'],
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['cupcake', 'coffee'],
    darkTheme: "coffee",
    logs: false, 
  },
  darkMode: ['class', '[data-theme="coffee"]']
}
