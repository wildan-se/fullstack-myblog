// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  content: [
    // PASTIKAN INI MENCakup SEMUA FILE VUE ANDA
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // <-- BARIS INI SANGAT PENTING
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography, // Pastikan ini juga ada jika Anda menggunakannya
  ],
}
