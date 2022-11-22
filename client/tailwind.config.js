/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      icon: "18rem",
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2rem",
      "4hxl": "2.5rem",
      "5xl": "3rem",
      "5hxl": "3.5rem",
      "6xl": "4rem",
      "6hxl": "4.5rem",
      "7xl": "5rem",
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1024px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 768px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      flex: {
        2: "2 2 0%",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(300px, 500px))",
        "auto-fill": "repeat(auto-fill, minmax(300px, 500px))",
      },
      gridTemplateRows: {
        "auto-fit": "repeat(auto-fit, minmax(300px, 600px))",
        "auto-fill": "repeat(auto-fill, minmax(300px, 600px))",
      },
      transitionProperty: {
        "input-label": "top,left,font-size",
      },
      translate: {
        "1/5": "20%",
      },
      inset: {
        "1/5": "20%",
      },
      width: {
        88: "22rem",
        "2/5": "40%",
      },
    },
  },
  plugins: [],
};
