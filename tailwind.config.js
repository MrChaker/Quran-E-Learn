module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./FrontEnd/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'main': ["arabic", "Noto Sans Arabic", "tajawal", "Open Sans"],
        'quran': ["Quran"]
      },
      colors: {
        'darkColor': "#022930",
        'semiColor': "#325970",
        'lightColor': "rgb(203 213 225)",
        'lighterColor': "rgb(226 232 240)",
        'themeColor': "#022930"
      }
    }
    
  },
  plugins: [],
  darkMode: 'class',
}
