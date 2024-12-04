
const mobileMenuToggle = document.querySelector(".mobile-toggle");
const navElementChildren = document.querySelectorAll("nav a");
// Manages Mobile Menu Toggles
mobileMenuToggle.addEventListener("click", function () {
  document.querySelector("nav").classList.toggle("opacity-100");
  document.querySelector("nav").classList.toggle("opacity-0");
  document.querySelector("nav").classList.toggle("-translate-x-[100px]");
  document.querySelector(".icon-menu").classList.toggle("hidden");
  document.querySelector(".icon-menu").classList.toggle("block");
  document.querySelector(".icon-close-menu").classList.toggle("block");
  document.querySelector(".icon-close-menu").classList.toggle("hidden");
});

// Manages Mobile Menu Toggles
for (let num = 0; num < navElementChildren.length; num++) {
  navElementChildren[num].addEventListener("mouseup", () => {
    document.querySelector("nav").classList.toggle("opacity-100");
    document.querySelector("nav").classList.toggle("opacity-0");
    document.querySelector("nav").classList.toggle("-translate-x-[100px]");
    document.querySelector(".icon-menu").classList.toggle("hidden");
    document.querySelector(".icon-menu").classList.toggle("block");
    document.querySelector(".icon-close-menu").classList.toggle("block");
    document.querySelector(".icon-close-menu").classList.toggle("hidden");
  });
}

// Manages Mobile Menu Toggles
document.addEventListener("click", (event) => {
  const mobileMenu = document.querySelector("nav");
  const innerMobileMenu = document.querySelector(".nav-ul");
  const mobileMenuToggle = document.querySelector(".mobile-toggle");
  const faq = document.querySelectorAll(".question");

  if (
    !mobileMenu.contains(event.target) &&
    !innerMobileMenu.contains(event.target) &&
    mobileMenu.classList.contains("opacity-100", "-translate-x-[100px]") &&
    !mobileMenuToggle.contains(event.target)
  ) {
    mobileMenu.classList.remove("opacity-100", "-translate-x-[100px]");
    document.querySelector(".icon-menu").classList.toggle("hidden");
    document.querySelector(".icon-menu").classList.toggle("block");
    document.querySelector(".icon-close-menu").classList.toggle("block");
    document.querySelector(".icon-close-menu").classList.toggle("hidden");
  }

  for (let num = 0; num < faq.length; num++) {
    if (faq[num].contains(event.target)) {
      var targetAns = document.querySelector("#answer" + num);
      var plusMinusSign = document.querySelector("#sign" + num);
      if (targetAns.classList.contains("ans-active")) {
        targetAns.classList.remove("ans-active");
        plusMinusSign.innerHTML = "+";
      } else {
        targetAns.classList.add("ans-active");
        plusMinusSign.innerHTML = "-";
        plusMinusSign.classList.add("bolder-sign");
      }
    }
  }
});

const adjustScreen = (event) => {
  // event.preventDefault();
  if (event.target.href !== window.location.href) {
    sessionStorage.setItem('scrollAfterLoad', 'true');
  }

  setTimeout(() => {
    window.scrollBy(
      {
        top: -76,
        behavior: 'smooth'
      }
    ), 5})
}

// Check on page load whether to scroll
window.addEventListener('load', ()=> {
  if (sessionStorage.getItem('scrollAfterLoad') === 'true') {
    window.scrollBy({
      top: -76,
      behavior: 'smooth'
    });
    sessionStorage.removeItem('scrollAfterLoad'); // Clean up
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const animatedTextOne = document.querySelector(".animated-text-one");
  const animatedTextTwo = document.querySelector(".animated-text-two");
  const animatedHeroImageOne = document.querySelector(".animated-hero-one");
  const animatedHeroImageTwo = document.querySelector(".animated-hero-two");
  const animatedHeroImageThree = document.querySelector(".animated-hero-three");
  const scrollingAds = document.querySelectorAll(".scrolling-ads > div");

  const animateTextTwo = () => {
    animatedTextOne.classList.remove("hidden");
    animatedTextOne.classList.add("inline-block");
    animatedTextTwo.classList.remove('inline-block');
    animatedTextTwo.classList.add('hidden');
    setTimeout(() => {
      animatedTextTwo.classList.remove("hidden");
      animatedTextTwo.classList.add("inline-block");
      animatedTextOne.classList.remove("inline-block");
      animatedTextOne.classList.add("hidden");
    }, 2000);
  }
  setInterval(animateTextTwo, 4000);
  animateTextTwo(); 

  const animateHeroImages = () => {
    animatedHeroImageOne.classList.remove("hidden");
    animatedHeroImageOne.classList.add("flex");
    animatedHeroImageTwo.classList.remove('flex');
    animatedHeroImageTwo.classList.add('hidden');
    animatedHeroImageThree.classList.remove('flex');
    animatedHeroImageThree.classList.add('hidden');
    setTimeout(() => {
      animatedHeroImageTwo.classList.remove("hidden");
      animatedHeroImageTwo.classList.add("flex");
      animatedHeroImageOne.classList.remove("flex");
      animatedHeroImageOne.classList.add("hidden");
      animatedHeroImageThree.classList.remove("flex");
      animatedHeroImageThree.classList.add("hidden");
    }, 1500);
    setTimeout(() => {
      animatedHeroImageThree.classList.remove("hidden");
      animatedHeroImageThree.classList.add("flex");
      animatedHeroImageOne.classList.remove("flex");
      animatedHeroImageOne.classList.add("hidden");
      animatedHeroImageTwo.classList.remove("flex");
      animatedHeroImageTwo.classList.add("hidden");
    }, 2700);
  }
  setInterval(animateHeroImages, 3900);
  animateHeroImages(); 
  
  // const animatedCarousel = () => {
  //   console.log("One In");
  //   scrollingAds.forEach((ads, index) => {
  //     ads.classList.add(`scrolling-ads-${index}`);
  //   })
  //   setTimeout(() => {
  //     console.log("Two In");
  //     scrollingAds.forEach((ads, index) => {
  //       ads.classList.remove(`scrolling-ads-${index}`);
  //       ads.classList.add('flex');
  //     })
  //   }, 15000);
  // }
  // setInterval(animatedCarousel, 15100);
  // animatedCarousel(); 
});
