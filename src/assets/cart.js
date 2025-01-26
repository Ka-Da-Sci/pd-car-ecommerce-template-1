// Fetch cart modal and insert across the relevant pages.
document.addEventListener("DOMContentLoaded", function () {
  fetch("cart-modal.html")
    .then((response) => response.text())
    .then((data) => {
        const modalSuperContainer = document.createElement('div');

        modalSuperContainer.classList.add("bg-white", "relative");
        modalSuperContainer.setAttribute('id', 'modal');
        modalSuperContainer.innerHTML = data;
        document.body.appendChild(modalSuperContainer);
        cartModalProtocol();
    });
});

import { defaultInventoryData, cartItemContainer, getClickedProductId, targetItem } from "./utilities-js.js";

const openCartBtn = document.getElementById("cart-trolley");
const lagoonProtocol = () => {
  const countrySelect = document.getElementById("country");
  const regionSelect = document.getElementById("region");
  const citySelect = document.getElementById("city");
//   const checkoutModal = document.getElementById("checkout-modal");
  const checkoutForm = document.querySelector(".modal-content");
  const orderPlacedModal = document.getElementById("orderPlacedModal");
  const viewReceiptModal = document.getElementById("viewReceiptModal");
  const contactVendorModal = document.getElementById("contactVendorModal");
  const closeOrderPlaced = document.getElementById("closeOrderPlaced");
  const closeViewReceipt = document.getElementById("closeViewReceipt");
  const closeContactVendor = document.getElementById("closeContactVendor");
  const contactVendorBtn = document.getElementById("contactVendorBtn");
  const viewReceiptBtn = document.getElementById("viewReceiptBtn");
  const totalAmount = document.getElementById("total-price").textContent;
  const receiptAmount = document.getElementById("receiptTotalPrice");
  const cartCheckOutModal = document.getElementById("checkout-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const continueShoppingBtn = document.getElementById("back");
  const apiKey = "b1hsd211cnlZek1YZ1piNlBVa3VWM001R2p1WWpEWkd2bnRueWkxTQ==";
  const headers = {
    "X-CSCAPI-KEY": apiKey,
  };
  let auxParam = {};
  let countries = {};

  const createRequest = async (url, headersParam, searchEntity) => {
    try {
      const response = await fetch(url, { headers: { ...headersParam } });
      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();

      switch (searchEntity) {
        case "countries":
          data.forEach((entity) => {
            countries[entity.name] = {
              name: entity.name,
              abbr: (entity.iso2 && entity.iso2) || null,
            };
          });
          break;
        case "states":
          countries[auxParam.country]["states"] = {};
          data.forEach((entity) => {
            countries[auxParam.country]["states"][entity.name] = {
              name: entity.name,
              abbr: (entity.iso2 && entity.iso2) || null,
            };
          });
          break;
        case "cities":
          countries[auxParam.country]["states"][auxParam.state]["cities"] = [];
          data.forEach((entity) => {
            countries[auxParam.country]["states"][auxParam.state]["cities"][
              entity.name
            ] = entity;
          });
          break;
        default:
          console.log("May Day! May Day! Anormally Detected!");
      }
      return countries;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const abortFunc = () => {
    countrySelect.innerHTML =
      '<option value="" selected disabled>Country</option>';
    regionSelect.innerHTML =
      '<option value="" selected disabled>Region/State</option>';
    citySelect.innerHTML = '<option value="" selected disabled>City</option>';
  };

  const populateSelect = (selectElement, options) => {
    selectElement.innerHTML =
      '<option value="" selected disabled>Select</option>';
    options.length !== 0 &&
      options.sort().forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
      });

    const zeroData = () => {
      selectElement.innerHTML =
        '<option value="No State" selected disabled>No State</option>';
      citySelect.innerHTML =
        '<option value="No City" selected disabled>No City</option>';
    };
    options.length === 0 && zeroData();
  };

  const allCountriesUrl = "https://api.countrystatecity.in/v1/countries";
  createRequest(allCountriesUrl, headers, "countries").then((geoData) => {
    if (geoData) {
      // Populate countries
      populateSelect(countrySelect, Object.keys(geoData));
    } else {
      console.log("Failed To Fetch Data!");
    }
  });

  countrySelect.addEventListener("change", () => {
    const selectedCountry = countrySelect.value;

    auxParam.country = selectedCountry;
    const targetCountryCode = countries[selectedCountry]["abbr"];
    let countriesStatesUrl = `https://api.countrystatecity.in/v1/countries/${targetCountryCode}/states`;
    createRequest(countriesStatesUrl, headers, "states").then((geoData) => {
      if (geoData) {
        citySelect.innerHTML =
          '<option value="" selected disabled>City</option>'; // Reset cities
        // Populate States/Regions
        populateSelect(
          regionSelect,
          Object.keys(geoData[auxParam.country]["states"])
        );
      } else {
        console.log("Failed To Fetch Data!");
        abortFunc();
      }
    });
  });

  regionSelect.addEventListener("change", () => {
    const selectedState = regionSelect.value;
    auxParam.state = selectedState;
    const bulkFunc = () => {
      const targetStateCode =
        countries[auxParam.country]["states"][auxParam.state]["abbr"];
      const targetCountryCode = countries[auxParam.country]["abbr"];
      let countriesStatesCitiesUrl = `https://api.countrystatecity.in/v1/countries/${targetCountryCode}/states/${targetStateCode}/cities`;
      createRequest(countriesStatesCitiesUrl, headers, "cities").then(
        (geoData) => {
          if (geoData) {
            // Populate Cities
            populateSelect(
              citySelect,
              Object.keys(
                geoData[auxParam.country]["states"][auxParam.state]["cities"]
              )
            );
          } else {
            console.log("Failed To Fetch Data!");
            abortFunc();
          }
        }
      );
    };
    countries[auxParam.country]["states"][auxParam.state] && bulkFunc();
  });

  document.querySelectorAll(".select img").forEach((img) => {
    img.addEventListener("click", () => {
      const radio = img.previousElementSibling;
      if (radio) {
        radio.checked = true;
      }
    });
  });

  openCartBtn &&
    openCartBtn.addEventListener("click", () => {
        cartCheckOutModal.classList.add("flex");
        cartCheckOutModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });

  // Close the cart modal when the close button is clicked
  closeModalBtn.addEventListener("click", () => {
    cartCheckOutModal.classList.remove("flex");
    cartCheckOutModal.classList.add("hidden");
    document.body.style.overflow = "auto";
  });
  continueShoppingBtn.addEventListener("click", () => {
    cartCheckOutModal.classList.remove("flex");
    cartCheckOutModal.classList.add("hidden");
    document.body.style.overflow = "auto";
  });

  checkoutForm.addEventListener("submit", (event) => {
    // Prevent default form submission
    event.preventDefault();

    // Show the order placed modal
    orderPlacedModal.style.display = "flex"; // Assuming modal is initially hidden via CSS
    cartCheckOutModal.style.display = "none";
    receiptAmount.textContent = totalAmount;
    document.body.style.overflow = "auto";
  });
  closeOrderPlaced.addEventListener("click", () => {
    orderPlacedModal.style.display = "none";
  });

  viewReceiptBtn.addEventListener("click", (event) => {
    event.preventDefault();
    viewReceiptModal.style.display = "flex";
    orderPlacedModal.style.display = "none";
  });

  closeViewReceipt.addEventListener("click", () => {
    viewReceiptModal.style.display = "none";
    orderPlacedModal.style.display = "flex";
  });

  contactVendorBtn.addEventListener("click", (event) => {
    event.preventDefault();
    contactVendorModal.style.display = "flex";
    orderPlacedModal.style.display = "none";
  });
  closeContactVendor &&
    closeContactVendor.addEventListener("click", () => {
      contactVendorModal.style.display = "none";
      orderPlacedModal.style.display = "flex";
    });

};

const cartModalProtocol = () => {
  // Get references to key elements
  // const openCartBtn = document.getElementById("cart-trolley");
  const cartCheckOutModal = document.getElementById("checkout-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const continueShoppingBtn = document.querySelector(".cart-empty-state a");
  const addToCartBtn = document.querySelector(".add-to-cart");
  const cartItemsCounter = document.getElementById("num-of-items");
  const cartItemsContainer = document.getElementById("cart-items");
  const clearCartBtn = document.getElementById("empty-cart");
  const subtotalPriceElem = document.getElementById("subtotal-price");
  const deliveryFeeElem = document.getElementById("delivery-fee");
  const totalPriceElem = document.getElementById("total-price");
  const continueToCheckout = document.querySelector(".go-to-cart");
  const applyDiscountBtn = document.getElementById("apply-discount");
  const deliveryFee = parseFloat(deliveryFeeElem.textContent.replace("$", ""));
  let cartItems =  JSON.parse(localStorage.getItem("cartItems")) || {};
  // let cartItems =  {rtfj6kk: 'Lovrerttt',
  //   ujjkofjr5: 'ogkllfmfjjjg'
  // };
  let shopItemQty = document.querySelector('#quantity');


  lagoonProtocol();

  // Open the cart modal when the cart button is clicked
  openCartBtn &&
    openCartBtn.addEventListener("click", () => {
        console.log("Cart Ought To Open Now!");
      loadCartState();
      cartCheckOutModal.classList.add("flex");
    });

  continueToCheckout &&
    continueToCheckout.addEventListener("click", (event) => {
      event.preventDefault();
      loadCartState();
      cartCheckOutModal.classList.add("flex");
      cartCheckOutModal.classList.remove("hidden");
    });

  // Close the cart modal when the close button is clicked
  closeModalBtn.addEventListener("click", () => {
    cartCheckOutModal.classList.remove("flex");
    cartCheckOutModal.classList.add("hidden");
  });

  continueShoppingBtn.addEventListener("click", () => {
    cartCheckOutModal.classList.remove("flex");
    cartCheckOutModal.classList.add("hidden");
    location.reload();
  });

  // Add event listeners to all "Add to Cart" buttons
  if (addToCartBtn) {
    addToCartBtn.onclick = (event) => {
        // event.preventDefault();
        console.log(shopItemQty.value)

      // const currentCartItemsIds =
      //   JSON.parse(localStorage.getItem("cartItemsIds")) || [];
      const newCartItem = targetItem();
      console.log(newCartItem);

      // Prevent default link behavior
      event.preventDefault();
      // event.stopPropagation();

      // Get the product details from the clicked item
      // const name = newCartItem.name;
      const collectionType = newCartItem.collectionType;
      // const price = parseFloat(newCartItem.price);
      // const imageSrc = newCartItem.image;

      console.log(Object.keys(cartItems));

      if (Object.keys(cartItems).includes(newCartItem.id)) {
        alert("Item already in cart!\nNeed to modify your order?\nGo to cart!");
        return;
      }

      // Create a new list item for the cart
      const li = document.createElement("li");
      li.classList.add("item", "w-full", "flex", "items-center", "md:justify-normal", "justify-between", "gap-4", "pb-1", "transition-all", "duration-300", "ease-in-out",);
      // li.classList.add("item", "w-full", "flex", "items-center", "md:justify-normal", "justify-between", "gap-8", "pb-1", "border-b", "border-solid", "border-[#3333333b]", "transition-all", "duration-300", "ease-in-out", "hover:[box-shadow:0px_2px_6px_4px_#00000018]");
      li.setAttribute("id", newCartItem.id);
      // li.style.overflow = "auto";
      console.log(newCartItem.price);
      console.log(shopItemQty.value);
      const cartHtml = cartItemContainer(newCartItem, shopItemQty.value, collectionType);


      // Set the inner HTML of the new list item
      li.innerHTML = cartHtml;


      cartItems[newCartItem.id] = shopItemQty.value;
      // currentCartItemsIds.push(newCartItem.productId);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      // localStorage.setItem("cartItemsIds", JSON.stringify(currentCartItemsIds));

      // Append the new list item to the cart
      cartItemsContainer.appendChild(li);

      // Get references to the increment and decrement buttons in the cart item and the actual item
      const incrementCart = li.querySelector(".increment");
      const decrementCart = li.querySelector(".decrement");
      const quantityCart = li.querySelector("#quantity");
      const quantityItem = document.getElementById("quantity");
      const incrementItem = document.querySelector("#minus");
      const decrementItem = document.querySelector("#plus");
      const itemTotalPriceElem = li.querySelector(".item-total-price");
      quantityCart.value = shopItemQty.value;

      // Function to synchronize quantity between item and cart
      const syncQuantity = () => {
        quantityCart.value = quantityItem.textContent;
        updateItemTotalPrice();
        updateCartPrices();
        saveCartState();
      };

      // Function to update item total price based on quantity
      const updateItemTotalPrice = () => {
        const quantity = parseInt(quantityCart.value);
        const newTotalPrice = quantity * newCartItem.price;
        console.log(newTotalPrice);
        itemTotalPriceElem.textContent = newTotalPrice.toFixed(2);
        updateCartPrices(); // Update cart subtotal and total prices after changing item price
      };

      // Add event listeners for increment and decrement buttons in the cart item
      incrementCart.addEventListener("click", (event) => {
        event.preventDefault();
        quantityCart.value = parseInt(quantityCart.value) + 1;
        syncQuantity();
        saveCartState();
      });

      decrementCart.addEventListener("click", (event) => {
        event.preventDefault();
        if (parseInt(quantityCart.value) > 1) {
          quantityCart.value = parseInt(quantityCart.value) - 1;
          syncQuantity();
          saveCartState();
        }
      });

      incrementItem.addEventListener("click", (event) => {
        event.preventDefault();
        quantityCart.value = parseInt(quantityCart.value) + 1;
        syncQuantity();
        saveCartState();
      });

      decrementItem.addEventListener("click", (event) => {
        event.preventDefault();
        if (parseInt(quantityCart.value) > 1) {
          quantityCart.value = parseInt(quantityCart.value) - 1;
          syncQuantity();
          saveCartState();
        }
      });

      // Synchronize quantity when changed in the original item
      quantityItem.addEventListener("input", () => {
        quantityCart.value = quantityItem.value;
        syncQuantity();
      });

      // Add event listener for the remove button in the cart item
      li.querySelector(".remove").addEventListener("click", () => {
        li.remove();
        // let cartItemsIds = JSON.parse(localStorage.getItem(''));
        updateCartCounter();
        updateCartPrices();
        displayEmptyState();
        saveCartState();
        addToCartBtn.style.display = "block";
        quantityItem.value = 1; // Reset the quantity in the original item
      });

      // Update cart counter and show/hide appropriate elements
      updateCartCounter();
      updateCartPrices();
      displayEmptyState();
      saveCartState();
    //   addToCartBtn.style.display = "none";
    };
  }

  clearCartBtn.addEventListener("click", () => {
    localStorage.clear();
    emptyCart();
    addToCartBtn.style.display = "block";
  });

  // Function to empty cart
  const emptyCart = () => {
    // Remove all items from the cart container
    while (cartItemsContainer.firstChild) {
      cartItemsContainer.removeChild(cartItemsContainer.firstChild);
    }

    // Update cart counter, prices, and empty state
    updateCartCounter();
    updateCartPrices();
    displayEmptyState();
    saveCartState();

    // Show "Add to Cart" buttons and hide item incrementors outside the cart container
    if (addToCartBtn) {
      addToCartBtn.style.display = "block";
    }
  };

  //save cart state
  const saveCartState = () => {
    // let updatedCartItemsIds = [];
    // const cartItemsQty = {};
    cartItems = {};
    cartItemsContainer.querySelectorAll(".item").forEach((item) => {
      // const prodImg = `./assets${
      //   item.querySelector(".item-image img").src.split("assets")[1]
      // }`.toString();

      // cartItems.push({
      //   image: prodImg,
      //   name: item.querySelector(".product-name .name").textContent,
      //   id: item.id,
      //   collectionType: item.querySelector(".product-name .vendor") ? item.querySelector(".product-name .vendor").textContent : '',
      //   price: +`${item
      //     .querySelector(".unit-price")
      //     .textContent.replace("$", "")}`,
      // });

      cartItems[item.id] = item.querySelector("#quantity").value;
      console.log(item.querySelector("#quantity").value);
      // updatedCartItemsIds.push(item.id);
      // cartItemsQty[item.id] = item.querySelector("#quantity").value;
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // localStorage.setItem("cartItemsIds", JSON.stringify(updatedCartItemsIds));
    // localStorage.setItem("cartItemsQty", JSON.stringify(cartItemsQty));
  };

  //function to load cart
  const loadCartState = () => {
    // Retrieve cartItems and cartItemsQty from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    // const cartItemsQty = JSON.parse(localStorage.getItem("cartItemsQty"));

    // Check if there are any stored items
    if (Object.keys(storedCartItems).length > 0) {
      const cartItems = {...storedCartItems};
      console.log(cartItems);

      // Clear current cart items from the UI
      cartItemsContainer.innerHTML = "";

      // Rebuild the cart UI based on stored data
      Object.keys(cartItems).forEach((key) => {
        let cartItem = targetItem(key);
        console.log(cartItem);
        const li = document.createElement("li");
        const collectionType =  cartItem.collectionType;
        li.classList.add("item", "w-full", "flex", "items-center", "md:justify-normal", "justify-between", "gap-4", "pb-1", "transition-all", "duration-300", "ease-in-out",);
        // li.classList.add("item", "w-full", "flex", "items-center", "md:justify-normal", "justify-between", "gap-8", "pb-1", "border-b", "border-solid", "border-[#3333333b]", "transition-all", "duration-300", "ease-in-out", "hover:[box-shadow:0px_2px_6px_4px_#00000018]");
        li.setAttribute("id", key);
        const cartHtml = cartItemContainer(cartItem, cartItems[key], collectionType);


        // Construct the HTML for each cart item
        li.innerHTML = cartHtml;

        // Append the new list item to the cart
        cartItemsContainer.appendChild(li);

        // Get references to the increment and decrement buttons in the cart item and the actual item
        const incrementCart = li.querySelector(".increment");
        const decrementCart = li.querySelector(".decrement");
        const quantityCart = li.querySelector("#quantity");
        const itemTotalPriceElem = li.querySelector(".item-total-price");
        // Function to update item total price based on quantity
        const updateItemTotalPrice = () => {
          const quantity = parseInt(quantityCart.value);
          const newTotalPrice = quantity * parseFloat(cartItem.price);
          itemTotalPriceElem.textContent = newTotalPrice.toFixed(2);
          saveCartState();
          updateCartPrices(); // Update cart subtotal and total prices after changing item price
        };

        // Add event listeners for increment and decrement buttons in the cart item
        incrementCart.addEventListener("click", (event) => {
          event.preventDefault();
          quantityCart.value = parseInt(quantityCart.value) + 1;
          updateItemTotalPrice();
        });

        // Add event listeners for input elements in the cart item
        quantityCart.addEventListener("change", (event) => {
          event.preventDefault();
          updateItemTotalPrice();
        });

        decrementCart.addEventListener("click", (event) => {
          event.preventDefault();
          if (parseInt(quantityCart.value) > 1) {
            quantityCart.value = parseInt(quantityCart.value) - 1;
            updateItemTotalPrice();
          }
        });

        // Ensure initial item total price is calculated correctly on page load
        updateItemTotalPrice();

        // Add event listener for the remove button in the cart item
        li.querySelector(".remove").addEventListener("click", () => {
          li.remove();
          updateCartCounter();
          updateCartPrices();
          displayEmptyState();
          saveCartState();
        });
      });

      // Ensure the cart counters and prices are updated after loading
      updateCartCounter();
      updateCartPrices();
      saveCartState();
    }
  };
  // Function to update the cart items counter
  const updateCartCounter = () => {
    const numberOfItems = cartItemsContainer.children.length;
    cartItemsCounter.textContent = numberOfItems;
  };

  // Function to update cart prices
  const updateCartPrices = () => {
    let subtotal = 0;
    const cartItems = cartItemsContainer.querySelectorAll(".item");
    cartItems.forEach((item) => {
      const itemTotalPrice = parseFloat(
        item.querySelector(".item-total-price").textContent
      );
      subtotal += itemTotalPrice;
    });
    subtotalPriceElem.textContent = `$${subtotal.toFixed(2)}`;
    const total = subtotal + deliveryFee;
    totalPriceElem.textContent = `$${total.toFixed(2)}`;
  };

  const displayEmptyState = () => {
    const cartEmptyState = document.querySelector(".cart-empty-state");
    const checkoutForm = document.querySelector(".modal-content");
    // console.log(JSON.parse(localStorage.getItem("cartItems")));
    if (
      !JSON.parse(localStorage.getItem("cartItems")) ||
      Object.keys(JSON.parse(localStorage.getItem("cartItems"))).length == 0
    ) {
      cartEmptyState.style.display = "flex";
      Array.from(checkoutForm.children).forEach((child) => {
        if (child !== cartEmptyState) {
          child.style.display = "none";
        }
      });
    } else {
      // console.log(JSON.parse(localStorage.getItem("cartItems")));
      cartEmptyState.style.display = "none";
      Array.from(checkoutForm.children).forEach((child) => {
        if (child !== cartEmptyState) {
          child.style.display = "flex";
        }
      });
    }
  };

  applyDiscountBtn.onclick = () => {
    // Fetch the entered discount code
    const discountCodeElem = document.querySelector(".coupon-code");
    const discountCode = discountCodeElem.value.trim();

    // Define valid discount codes and their corresponding discount amounts
    const discountCodes = {
      SAVE10: 10, // $10 off
      SAVE20: 20, // $20 off
      PERCENT10: "10%", // 10% off
    };

    // Fetch the current total price from the DOM
    let orderTotalElement = document.getElementById("subtotal-price");
    let totalPriceElement = document.getElementById("total-price");

    // Convert price strings to numbers
    let orderTotal = parseFloat(orderTotalElement.textContent.replace("$", ""));
    let totalPrice = parseFloat(totalPriceElement.textContent.replace("$", ""));

    // Validate and apply the discount
    if (discountCodes.hasOwnProperty(discountCode)) {
      let discountValue = discountCodes[discountCode];

      if (typeof discountValue === "string" && discountValue.endsWith("%")) {
        // Percentage discount
        let percent = parseFloat(discountValue.replace("%", "")) / 100;
        let discountAmount = totalPrice * percent;
        orderTotal -= discountAmount;
        totalPrice -= discountAmount;
      } else {
        // Fixed amount discount
        orderTotal -= discountValue;
        totalPrice -= discountValue;
      }

      // Update the DOM with the new prices
      orderTotalElement.textContent = `$${orderTotal.toFixed(2)}`;
      totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;

      alert("Discount applied successfully!");
      discountCodeElem.disabled = true;
      applyDiscountBtn.onclick = null;
    } else {
      alert("Invalid discount code");
    }
  };

  displayEmptyState();
  loadCartState();
};
