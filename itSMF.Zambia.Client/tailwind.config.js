/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#001b3d',
        'primary-navy-dark': '#000e24',
        'secondary-teal': '#006a6a',
        'surface-soft': '#f9f9fc',
      },
      backgroundImage: {
        'zambia-pattern': "linear-gradient(30deg, #00234b 12%, transparent 12.5%, transparent 87%, #00234b 87.5%, #00234b), linear-gradient(150deg, #00234b 12%, transparent 12.5%, transparent 87%, #00234b 87.5%, #00234b), linear-gradient(30deg, #00234b 12%, transparent 12.5%, transparent 87%, #00234b 87.5%, #00234b), linear-gradient(150deg, #00234b 12%, transparent 12.5%, transparent 87%, #00234b 87.5%, #00234b), linear-gradient(60deg, #00234b77 25%, transparent 25.5%, transparent 75%, #00234b77 75%, #00234b77), linear-gradient(60deg, #00234b77 25%, transparent 25.5%, transparent 75%, #00234b77 75%, #00234b77)"
      },
      backgroundSize: {
        'zambia-pattern': '20px 35px'
      },
      backgroundPosition: {
        'zambia-pattern': '0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px'
      }
    },
  },
  plugins: [],
}
