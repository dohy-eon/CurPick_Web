/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'main': ['Ttangsbudaejjigae', 'sans-serif'],
        'logo': ['GiazaStencil', 'serif'],
        'luxgom': ['THELuxGoM', 'sans-serif'],
      },
      colors: {
        'curpick-brown': '#7C4D25', // 로고 관련 색상
        'text-gray': '#636363', // 로그인/회원가입 텍스트 색상
      },
    },
  },
  plugins: [],
}