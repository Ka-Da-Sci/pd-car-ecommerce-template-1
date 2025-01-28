// Fetch cart modal and insert across the relevant pages.
document.addEventListener("DOMContentLoaded", function () {
  fetch("cart-modal.html")
    .then((response) => response.text())
    .then((data) => {
      const modalSuperContainer = document.createElement("div");

      modalSuperContainer.classList.add("bg-white", "relative");
      modalSuperContainer.setAttribute("id", "modal");
      modalSuperContainer.innerHTML = data;
      document.body.appendChild(modalSuperContainer);
      cartModalProtocol();
    });
});

import {
  cartModalProtocol,
  updateQuantityHandler,
  cartItemContainer,
  getClickedProductId,
  targetItem,
  addToCartElemHandler,
} from "./utilities-js.js";



addToCartElemHandler();
