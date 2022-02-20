module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./FrontEnd/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'main': ["Roboto", "sans-serif"]
      },
      BackgroundColor:{
        'bg-main': "#00ff00"
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
