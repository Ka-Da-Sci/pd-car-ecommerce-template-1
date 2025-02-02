import {
  cartModalProtocol,
  productItemContainerElemHandler,
} from "./utilities-js.js";


// Fetch cart modal and insert across the relevant pages.
document.addEventListener("DOMContentLoaded", () => {
  fetch("cart-modal.html")
    .then((response) => response.text())
    .then((data) => {
      const modalSuperContainer = document.createElement("div");

      modalSuperContainer.classList.add("bg-white", "relative", "px-2", "sm:px-4");
      modalSuperContainer.setAttribute("id", "modal");
      modalSuperContainer.innerHTML = data;
      document.body.appendChild(modalSuperContainer);
      cartModalProtocol();
    });
});


productItemContainerElemHandler();
