module.exports = {
  content: [
    "./index.html", // Adjust based on your file structure
    "./src/**/*.{js,jsx,ts,tsx}", // Include paths to your project files
  ],
  theme: {
    extend: {
      animation: {
        scaleUpOne: 'scaleUpOne infinite ease-in-out',
        scaleUpTwo: 'scaleUpTwo infinite ease-in-out',
        scaleUpThree: 'scaleUpThree infinite ease-in-out',
        imageFade: "imageAnimation 9s infinite",
        marquee: "marquee 20s linear infinite",
        slideDownUp: 'slideDownUp 2s linear infinite',
        slideUpDown: 'slideUpDown 2s linear infinite',
      },
      keyframes: {
        scaleUpOne: {
          "0%, 100%": { transform: "scale(1) translateY(-12.5%)" },
          "25%": { transform: "scale(2) translateY(-12.5%)" },
          "50%": { transform: "scale(2) translateY(-6.25%)" },
          "75%": { transform: "scale(2) translateY(-6.25%)" },
          "90%": { transform: "scale(2) translateY(-6.25%)" },
        },
        scaleUpTwo: {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1) translateY(-12.5%)" },
          "50%": { transform: "scale(2) translateY(-12.5%)" },
          "75%": { transform: "scale(2) translateY(-6.25%)" },
          "90%": { transform: "scale(2) translateY(-6.25%)" },
        },
        scaleUpThree: {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1)" },
          "50%": { transform: "scale(1) translateY(-12.5%)" },
          "75%": { transform: "scale(2) translateY(-12.5%)" },
          "90%": { transform: "scale(2) translateY(-6.25%)" },
        },
        marquee: {
          "0%": { transform: "translateX(27%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        slideUpDown: {
          '0%, 100%': { transform: 'translateY(-100%)',},
          // '25%': { transform: 'translateY(-25%) translateX(-12.5%)', opacity: '0.5',}, 
          '50%, 75%': { transform: 'translateY(0)',}, 
        },
        slideDownUp: {
          '0%, 100%': { transform: 'translateY(100%)',},
          // '25%': { transform: 'translateY(25%)', opacity: '0.5',},
          '50%, 75%': { transform: 'translateY(0)',},
        },
      },
    },
  },
  plugins: [],
};
