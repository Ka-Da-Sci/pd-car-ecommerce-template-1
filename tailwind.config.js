module.exports = {
  content: [
    "./index.html", // Adjust based on your file structure
    "./src/**/*.{js,jsx,ts,tsx}", // Include paths to your project files
  ],
  safelist: [
    "animate-marquee-container",
    "animation-marquee",
    "animate-image1",
    "animation-image",
  ],
  theme: {
    extend: {
      animation: {
        scaleUpOne: "scaleUpOne infinite ease-in-out",
        scaleUpTwo: "scaleUpTwo infinite ease-in-out",
        scaleUpThree: "scaleUpThree infinite ease-in-out",
        imageFade: "imageAnimation 9s infinite",
        marquee: "marquee 20s linear infinite",
        slideDownUp: "slideDownUp 2s linear infinite",
        slideUpDown: "slideUpDown 2s linear infinite",
        "fall-bounce": "fall-bounce 1.5s ease-in-out infinite",
        "zoom-rev": "zoom-rev 1.2s ease-in-out infinite",
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
          "0%, 100%": { transform: "translateY(-100%)", width: "500px" },
          // '25%': { transform: 'translateY(-25%) translateX(-12.5%)', opacity: '0.5',},
          "50%, 75%": { transform: "translateY(0)", width: "400px" },
        },
        slideDownUp: {
          "0%, 100%": { transform: "translateY(100%)", width: "500px" },
          // '25%': { transform: 'translateY(25%)', opacity: '0.5',},
          "50%, 75%": { transform: "translateY(0)", width: "500px" },
        },
        "fall-bounce": {
          "0%": { transform: "translateY(-10000px)" },
          "50%": { transform: "translateY(0)" },
          "60%": { transform: "translateY(-30px)" },
          "70%": { transform: "translateY(0)" },
          "80%": { transform: "translateY(-15px)" },
          "90%": { transform: "translateY(0)" },
        },
        "zoom-rev": {
          "0%": {
            transform: "translate3d(20%, 0, 0) scale(0.8)", // Start far bottom-right, smaller scale
          },
          "20%": {
            transform: "translate3d(-50%, 0, 0) scale(1.1)", // Zooms to near bottom-left corner
          },
          "30%": {
            transform: "translate3d(4%, 0, 0) scale(1)", // Slight rev forward
          },
          "80%": {
            transform: "translate3d(-2%, 0, 0) scale(1)", // Rev backward
          },
          "90%": {
            transform: "translate3d(4%, 0, 0) scale(1)", // Settle at the near bottom-left corner
          },
          "100%": {
            transform: "translate3d(-2%, 0, 0) scale(1)", // Settle at the near bottom-left corner
          },
        },
      },
    },
  },
  plugins: [],
};


        // rebounce: {
        //   '0%, 100%': { transform: 'translateY(0)' }, 
        //   '30%': { transform: 'translateY(-30px)' }, 
        //   '50%': { transform: 'translateY(0)' }, 
        //   '70%': { transform: 'translateY(-15px)' }, 
        //   '90%': { transform: 'translateY(0)' }, 
        // },