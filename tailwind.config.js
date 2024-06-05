/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
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
    themes: true,
    darkTheme: "dark",
    logs: false, 
  },
}

