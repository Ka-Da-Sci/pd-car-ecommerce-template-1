import { getClickedProductId, targetItem } from "./utilities-js.js";

const shareProduct = () => {
  const productName = document.querySelector(".item-name").textContent;
  const productPrice = document.querySelector(".item-price").textContent;
  const productDescription = document.querySelector("h1").textContent;
  const shareData = {
    title: productName,
    text: `${productDescription} - ${productPrice}`,
    url: window.location.href,
  };

  if (navigator.share) {
    navigator
      .share(shareData)
      // .then(() => console.log('Product shared successfully'))
      .catch((error) => console.error("Error sharing product:", error));
  } else {
    alert("Web Share API is not supported in your browser.");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const descriptionBtn = document.getElementById("description");
  const reviewBtn = document.getElementById("review");
  const descriptionText = document.getElementById("description-text");
  const reviewForm = document.getElementById("review-form");
  const quantityInput = document.getElementById("quantity");
  const decreaseButton = document.querySelector(".decrease");
  const increaseButton = document.querySelector(".increase");
  const productDetailsContainer = document.querySelector(
    ".products-details-container"
  );
  const itemImage = document.querySelector(".item-image");
  const itemName = document.querySelector(".item-name");
  const itemPrice = document.querySelector(".item-price-num");
  const itemPriceSymb = document.querySelector(".item-price-symb");
  const itemRating = document.querySelector(".item-rating");
  const itemReviews = document.querySelector(".item-reviews");
  const itemSeatNum = document.querySelector(".seat-num");
  const itemTransmissionType = document.querySelector(".transmission-type");
  const itemFuelType = document.querySelector(".fuel-type");

  if (productDetailsContainer) {
    const targetProduct = targetItem();
    itemImage.src = targetProduct.image;
    itemName.textContent = targetProduct.name;
    itemPrice.textContent = targetProduct.price;
    itemPriceSymb.textContent = targetProduct.currencySymb;
    itemRating.textContent = targetProduct.rating;
    itemSeatNum.textContent = targetProduct.seatCount;
    itemTransmissionType.textContent = targetProduct.transmissionType;
    itemFuelType.textContent = targetProduct.fuel;
    itemReviews.textContent = `(${targetProduct.reviewsNum} Reviews)`;
  }

  const showDescription = () => {
    descriptionBtn.classList.add("border-[#ff4500]");
    descriptionBtn.classList.remove("border-[#ffffff]");
    reviewBtn.classList.add("border-[#ffffff]");
    descriptionText.classList.remove("hidden");
    reviewForm.classList.add("hidden");
    reviewForm.classList.remove("flex");
  };

  const showReview = () => {
    reviewBtn.classList.add("border-[#ff4500]");
    reviewBtn.classList.remove("border-[#ffffff]");
    descriptionBtn.classList.add("border-[#ffffff]");
    reviewForm.classList.add("flex");
    reviewForm.classList.remove("hidden");
    descriptionText.classList.add("hidden");
  };

  descriptionBtn.addEventListener("click", showDescription);
  reviewBtn.addEventListener("click", showReview);

  // Initial state
  showDescription();

  // JavaScript functions for quantity update
  function updateQuantity(action) {
    const currentQuantity = parseInt(quantityInput.value);

    if (action === "increase") {
      quantityInput.value = currentQuantity + 1;
    } else if (action === "decrease") {
      if (currentQuantity > 1) {
        quantityInput.value = currentQuantity - 1;
      }
    }
  }

  decreaseButton.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default button behavior if any
    updateQuantity("decrease");
  });

  increaseButton.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default button behavior if any
    updateQuantity("increase");
  });
});
