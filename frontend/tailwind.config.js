/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bg-image": "url('https://static.videezy.com/system/resources/thumbnails/000/041/206/original/12.Audio_Visualizer.jpg')",
      },
      backgroundSize: {
        '80': '80%',
      }
    },
  },
  plugins: [
    'postcss-import',
    'tailwindcss/nesting',
  ],
} 