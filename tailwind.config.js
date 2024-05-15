/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          10: "#01FB34",
        },
        blue: {
          10: "#0138FB",
          20: "#292e44",
          30: "#252437",
          40: "#131226",
        },
        gray: {
          10: "#ADB0B6",
          40: "#30333C",
        },
        white: {
          10: "#ffff",
          20: "#F8F8FF",
        },
        black: {
          10: "#000000",
        },
      },
    },
  },
  plugins: [],
};
