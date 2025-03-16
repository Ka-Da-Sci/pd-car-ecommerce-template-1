module.exports = {
  content: [
    "./index.html", // Adjust based on your file structure
    "./src/**/*.{js,jsx,ts,tsx,html}", // Include paths to your project files
  ],
  safelist: [
    "animate-marquee-container",
    "animation-marquee",
    "animate-image1",
    "animation-image",
    "dynamic-hr",
    "dynamic-hr::before",
    "dynamic-hr::after",
    "scrolling-ads-0",
    "scrolling-ads-1",
    "scrolling-ads-2",
    "scrolling-ads-3",
    "scrolling-ads-4",
    "item-container",
    "item-name",
    "item-price",
    "xsm",
    "leaflet-popup-content",
    "modal-content-wrapper",
    "modal-content",
    "cart-pop",
  ],
  theme: {
    extend: {
      animation: {
        scaleUpOne: "scaleUpOne 7s 2s infinite ease-in-out backwards",
        scaleUpTwo: "scaleUpTwo 7s 2s infinite ease-in-out backwards",
        scaleUpThreeZero: "scaleUpThreeZero 15s infinite ease-in-out",
        scaleUpThreeOne: "scaleUpThreeOne 15s infinite ease-in-out",
        scaleUpThreeTwo: "scaleUpThreeTwo 15s infinite ease-in-out",
        scaleUpThreeThree: "scaleUpThreeThree 15s infinite ease-in-out",
        scaleUpThreeFour: "scaleUpThreeFour 15s infinite ease-in-out",
        imageFade: "imageAnimation 9s infinite",
        marquee: "marquee 50s linear infinite",
        slideDownUp: "slideDownUp 2s linear infinite",
        slideUpDown: "slideUpDown 2s linear infinite",
        "fall-bounce": "fall-bounce 1.0s ease-in-out infinite",
        "zoom-rev": "zoom-rev 1.2s ease-in-out infinite",
        popEffect: "popEffect 0.3s ease-out",
      },
      keyframes: {
        scaleUpOne: {
          "0%": { transform: "translateX(-98%)",  opacity: "1" },
          "25%": { transform: "translateX(-60%)" },
          "50%": { transform: "translateX(-30%)" },
          "75%": { transform: "translateX(-15%)"},
          "75%, 90%, 99%": { transform: "translateX(0%)",  opacity: "1"},
          "100%": { transform: "translateX(0%)",  opacity: "0" },
        },
        
        scaleUpTwo: {
          "0%": { transform: "translateX(98%)",  opacity: "1" },
          "25%": { transform: "translateX(60%)" },
          "50%": { transform: "translateX(20%)" },
          "90%, 99%": { transform: "translateX(0%)",  opacity: "1"},
          "100%": { transform: "translateX(100%)",  opacity: "0" },
        },
        // scaleUpThree: {
        //   "0%, 20%": { display: "flex" },
        //   "20%, 100%": { display: "none" },
        // },
        scaleUpThreeZero: {
          "0%, 14%": { transform: "translateX(0)", opacity: "1", },
          "16%, 30%": { transform: "translateX(-110%)", opacity: "1", },
          "35%, 100%": { transform: "translateX(-200%)", opacity: "1" },
        },
        scaleUpThreeOne: {
          "0%, 14%": { transform: "translateX(110%)", opacity: "1", },
          "16%, 30%": { transform: "translateX(0%)", opacity: "1", },
          "35%, 50%": { transform: "translateX(-110%)", opacity: "1" },
          "52%, 100%": { transform: "translateX(-200%)", opacity: "1" },
        },
        scaleUpThreeTwo: {
          "0%, 14%": { transform: "translateX(110%)", opacity: "1", },
          "16%, 30%": { transform: "translateX(110%)", opacity: "1", },
          "35%, 50%": { transform: "translateX(0%)", opacity: "1" },
          "52%, 68%": { transform: "translateX(-110%)", opacity: "1" },
          "70%, 100%": { transform: "translateX(-200%)", opacity: "1" },
        },
        scaleUpThreeThree: {
          "0%, 14%": { transform: "translateX(110%)", opacity: "1", },
          "16%, 30%": { transform: "translateX(110%)", opacity: "1", },
          "35%, 50%": { transform: "translateX(110%)", opacity: "1" },
          "52%, 68%": { transform: "translateX(0%)", opacity: "1" },
          "70%, 100%": { transform: "translateX(-110%)", opacity: "1" },
        },
        scaleUpThreeFour: {
          "0%, 14%": { transform: "translateX(110%)", opacity: "1", },
          "16%, 30%": { transform: "translateX(110%)", opacity: "1", },
          "35%, 50%": { transform: "translateX(110%)", opacity: "1" },
          "52%, 68%": { transform: "translateX(110%)", opacity: "1" },
          "70%, 100%": { transform: "translateX(0%)", opacity: "1" },
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
        popEffect: {
          "0%": {
            transform: "scale(1)"
          },
          "50%": {
            transform: "scale(1.5)"
          },
          "100%": {
            transform: "scale(1)"
          }
        },
        
      },
      // screens: {
      //   "xsm": "400px",
      // },
    },
  },
  plugins: [],
};