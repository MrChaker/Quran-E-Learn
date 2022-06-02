module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './FrontEnd/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['arabic', 'Noto Sans Arabic', 'tajawal', 'Open Sans'],
        quran: ['Quran'],
      },
      colors: {
        darkColor: '#022930',
        semiColor: '#325970',
        lightColor: 'rgb(203 213 225)',
        lighterColor: 'rgb(226 232 240)',
        themeColor: '#022930',
      },
      boxShadow: {
        '3xl': '0 10px 50px -12px rgb(0 0 0 / 0.25)',
        light: '0 10px 20px -12px rgb(255 255 255 / 0.25)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
