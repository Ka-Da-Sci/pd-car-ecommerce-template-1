import {
  defaultInventoryData,
  renderCards,
  productsSearchHandler,
} from "./utilities-js.js";

productsSearchHandler(defaultInventoryData.slice(0, 8));

const renderHomePageProducts = () => {
  const parentIndexCard = document.getElementById("index-card");
  if (parentIndexCard) {
    const itemsNumPerPage = 8;
    const currentPage = 1;
    renderCards({
      dataToRender: defaultInventoryData.slice(0, itemsNumPerPage),
      currentPageNum: currentPage,
      cardsPerPageNum: itemsNumPerPage,
    });
  }
};

renderHomePageProducts();

const productsSection = document.getElementById("card-container");
if (productsSection) {
  productsSection.addEventListener("click", async (event) => {
    event.preventDefault();
    const productsSectionLinks = Array.from(
      productsSection.getElementsByTagName("a")
    );
    const target = event.target;
    for (const link of productsSectionLinks) {
      if (link.contains(target)) {
        console.log(link.id);
        sessionStorage.setItem("clickedProductId", link.id);
        await new Promise((resolve) => setTimeout(resolve, 100)); // Delay to ensure sessionStorage is updated
        window.location.href = link.href; // Redirect to the clicked link
        break;
      }
    }
  });
}

productsSearchHandler(defaultInventoryData.slice(0, 8));

// Manages Mobile Menu Toggles
const mobileMenuToggle = () => {
  const mobileMenuToggle = document.querySelector(".mobile-toggle");
  const navElementChildren = document.querySelectorAll("nav a");
  mobileMenuToggle.addEventListener("click", () => {
    console.log("Chommy");
    document.querySelector("nav").classList.toggle("opacity-100");
    document.querySelector("nav").classList.toggle("opacity-0");
    document.querySelector("nav").classList.toggle("-translate-x-[100px]");
    document.querySelector(".icon-menu").classList.toggle("hidden");
    document.querySelector(".icon-menu").classList.toggle("block");
    document.querySelector(".icon-close-menu").classList.toggle("block");
    document.querySelector(".icon-close-menu").classList.toggle("hidden");
  });
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
  });
};

mobileMenuToggle();

const adjustScreen = (event) => {
  // event.preventDefault();
  if (event.target.href !== window.location.href) {
    sessionStorage.setItem("scrollAfterLoad", "true");
  }

  setTimeout(() => {
    window.scrollBy({
      top: -76,
      behavior: "smooth",
    }),
      5;
  });
};

// Check on page load whether to scroll
window.addEventListener("load", () => {
  if (sessionStorage.getItem("scrollAfterLoad") === "true") {
    window.scrollBy({
      top: -76,
      behavior: "smooth",
    });
    sessionStorage.removeItem("scrollAfterLoad"); // Clean up
  }
});

const homePageHeroAnimation = () => {
  const animatedTextOne = document.querySelector(".animated-text-one");
  const animatedTextTwo = document.querySelector(".animated-text-two");
  const animatedHeroImageOne = document.querySelector(".animated-hero-one");
  const animatedHeroImageOnePhrase = document.querySelector(
    ".animated-hero-one span"
  );
  const animatedHeroImageTwo = document.querySelector(".animated-hero-two");
  const animatedHeroImageThree = document.querySelector(".animated-hero-three");

  const animateTextTwo = () => {
    animatedTextOne && animatedTextOne.classList.remove("hidden");
    animatedTextOne && animatedTextOne.classList.add("inline-block");
    animatedTextTwo && animatedTextTwo.classList.remove("inline-block");
    animatedTextTwo && animatedTextTwo.classList.add("hidden");
    setTimeout(() => {
      animatedTextTwo && animatedTextTwo.classList.remove("hidden");
      animatedTextTwo && animatedTextTwo.classList.add("inline-block");
      animatedTextOne && animatedTextOne.classList.remove("inline-block");
      animatedTextOne && animatedTextOne.classList.add("hidden");
    }, 2000);
  };
  setInterval(animateTextTwo, 4000);
  animateTextTwo();

  const animateHeroImages = () => {
    animatedHeroImageOne && animatedHeroImageOne.classList.remove("hidden");
    animatedHeroImageOne && animatedHeroImageOne.classList.add("flex");
    animatedHeroImageTwo && animatedHeroImageTwo.classList.remove("flex");
    animatedHeroImageTwo && animatedHeroImageTwo.classList.add("hidden");
    animatedHeroImageThree && animatedHeroImageThree.classList.remove("flex");
    animatedHeroImageThree && animatedHeroImageThree.classList.add("hidden");
    setTimeout(() => {
      animatedHeroImageOnePhrase &&
        animatedHeroImageOnePhrase.classList.remove("hidden");
      animatedHeroImageOnePhrase &&
        animatedHeroImageOnePhrase.classList.add("flex");
    }, 500);

    setTimeout(() => {
      animatedHeroImageTwo && animatedHeroImageTwo.classList.remove("hidden");
      animatedHeroImageTwo && animatedHeroImageTwo.classList.add("flex");
      animatedHeroImageOne && animatedHeroImageOne.classList.remove("flex");
      animatedHeroImageOnePhrase &&
        animatedHeroImageOnePhrase.classList.add("hidden");
      animatedHeroImageOnePhrase &&
        animatedHeroImageOnePhrase.classList.remove("flex");
      animatedHeroImageOne && animatedHeroImageOne.classList.add("hidden");
      animatedHeroImageThree && animatedHeroImageThree.classList.remove("flex");
      animatedHeroImageThree && animatedHeroImageThree.classList.add("hidden");
    }, 1000);
    setTimeout(() => {
      animatedHeroImageThree &&
        animatedHeroImageThree.classList.remove("hidden");
      animatedHeroImageThree && animatedHeroImageThree.classList.add("flex");
      animatedHeroImageOne && animatedHeroImageOne.classList.remove("flex");
      animatedHeroImageOne && animatedHeroImageOne.classList.add("hidden");
      animatedHeroImageTwo && animatedHeroImageTwo.classList.remove("flex");
      animatedHeroImageTwo && animatedHeroImageTwo.classList.add("hidden");
    }, 2700);
  };
  setInterval(animateHeroImages, 3400);
  animateHeroImages();
};

document.addEventListener("DOMContentLoaded", homePageHeroAnimation);

// EMAIL FORM INPUTS VALIDATION FUNCTION
const miscEmailValidationForm = (parentEmailId, emailInputId, emailErrorMsgid) => {
  const miscEmailFormSubmitBtn = document.getElementById(parentEmailId);
  if (miscEmailFormSubmitBtn) {
    miscEmailFormSubmitBtn.addEventListener("click", (event) => {
      const emailInput = document.getElementById(emailInputId);
      const emailInputErrorMessage = document.getElementById(emailErrorMsgid);
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailPattern.test(emailInput.value)) {
        event.preventDefault();
        
        emailInputErrorMessage.style.display = "inline";
      } else {
        
        emailInputErrorMessage.style.display = "none";
      }
  
      document.getElementById("email").oninput = () => {
        emailInputErrorMessage.style.display = "none";
      };
    });
  }
}

miscEmailValidationForm('subscribe-btn', 'email', "email-error-message");
miscEmailValidationForm('discount-email-btn', 'discount-email', "discount-email-error-message");

// CONTACT FORM INPUTS VALIDATION FUNCTION
const miscFormValidation = (parentFormId) => {
  const miscForm = document.getElementById(parentFormId);
  if (miscForm) {
    const submitMiscBtn = miscForm.querySelector('button');
    console.log(submitMiscBtn);
    submitMiscBtn.addEventListener("click", (event) => {

      const emailInput = document.getElementById("client-email");
      const emailInputErrorMessage = document.getElementById("misc-form-email-error-message");
      const formMessage = miscForm.querySelector('textarea');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(emailInput.value)) {
        event.preventDefault();
        
        emailInputErrorMessage.style.display = "inline";
      } else {
        
        emailInputErrorMessage.style.display = "none";
      }

      document.getElementById("client-email").oninput = () => {
        emailInputErrorMessage.style.display = "none";
      };

      const messageErrorMessage = document.getElementById("misc-form-message-error-text");
      if (formMessage.value.trim() === "") {
        event.preventDefault();
        
        messageErrorMessage.style.display = "inline";
      } else {
        
        messageErrorMessage.style.display = "none";
      }

      formMessage.oninput = () => {
        console.log("Wale");
        messageErrorMessage.style.display = "none";
      };
    });
  }
};

miscFormValidation('contact-form');
miscFormValidation('review-form');

// Manages FAQ Toggles
document.addEventListener("click", (event) => {
  const faq = document.querySelectorAll(".question");

  for (let num = 0; num < faq.length; num++) {
    if (faq[num].contains(event.target)) {
      let targetAns = document.querySelector("#answer" + num);
      let plusMinusSign = document.querySelector("#sign" + num);
      if (targetAns.classList.contains("block")) {
        console.log(targetAns.classList);
        targetAns.classList.remove("block");
        targetAns.classList.add("hidden");
        plusMinusSign.innerHTML = `<svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.625 0.75L9.5 8.875L1.375 0.75" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
      } else {
        targetAns.classList.remove("hidden");
        targetAns.classList.add("block");
        plusMinusSign.innerHTML = `<svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.75 1.375L8.875 9.5L0.75 17.625" stroke="#767676" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
        plusMinusSign.classList.add("bolder-sign");
      }
    }
  }
});
