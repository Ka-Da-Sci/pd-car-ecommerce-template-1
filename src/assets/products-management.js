import {
  defaultInventoryData,
  cartModalProtocol,
  renderCards,
  productItemContainerElemHandler,
} from "./utilities-js.js";

// const uniqueInventoryData = Array.from(new Set(defaultInventoryData.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
// console.log(defaultInventoryData);

let inventoryData = [...defaultInventoryData];
const cardsPerPage = 8; // Number of cards per page
const maxVisiblePages = 5; // Maximum pagination buttons visible
let currentPage = 1;

const cardContainer = document.getElementById("card-container");
const paginationContainer = document.getElementById("pagination");
const pageInfo = document.getElementById("page-info");
const resultsInfo = document.getElementById("results-info");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Function to scroll to the top of the container
const scrollToTop = () => {
  const topElement = document.getElementById("card-container"); // Cards container
  topElement.classList.remove("grid");
  topElement.classList.add("hidden");
  // topElement.scrollIntoView({ behavior: "smooth", block: "start" });

  setTimeout(() => {
    window.scrollBy({
      top: -10000,
      behavior: "smooth",
    }),
      5;
  });
  setTimeout(() => {
    topElement.classList.remove("hidden");
    topElement.classList.add("grid");
  }, 100);
};

// Function to render pagination buttons
const renderPagination = (data) => {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(data.length / cardsPerPage);
  const half = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage - half, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  // Previous Button
  prevBtn.disabled = currentPage === 1;
  prevBtn.className = `px-3 py-2 rounded-md ${
    currentPage === 1
      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
      : "bg-gray-300 text-gray-900 hover:bg-gray-300"
  }`;

  // Next Button
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.className = `px-3 py-2 rounded-md ${
    currentPage === totalPages
      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
      : "bg-gray-300 text-gray-900 hover:bg-gray-300"
  }`;

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = `px-3 py-2 rounded-md ${
      i === currentPage
        ? "bg-orange-500 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

    button.addEventListener("click", () => {
      currentPage = i;
      renderCards({
        dataToRender: data,
        currentPageNum: currentPage,
        cardsPerPageNum: cardsPerPage,
      });
      renderPagination(data);
      scrollToTop();
    });

    productItemContainerElemHandler();

    paginationContainer.appendChild(button);
  }


  if (currentPage > 1){
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
  }
};

const sortedShopItemsData = () => {
  // Helper function to clean number strings by removing commas and converting to integers
  function cleanNumber(str) {
    return parseInt(str.replace(/,/g, ""), 10);
  }

  // Sorting functions for better modularity
  function sortByPriceLowToHigh(a, b) {
    return cleanNumber(a.price) - cleanNumber(b.price);
  }

  function sortByPriceHighToLow(a, b) {
    return cleanNumber(b.price) - cleanNumber(a.price);
  }

  function sortByRatingHighToLow(a, b) {
    return (Number(b.rating) || 0) - (Number(a.rating) || 0);
  }

  function sortByReviewsHighToLow(a, b) {
    return cleanNumber(b.reviewsNum) - cleanNumber(a.reviewsNum);
  }

  function sortByNewest(a, b) {
    return (
      (new Date(b.listingDate).getTime() || 0) -
      (new Date(a.listingDate).getTime() || 0)
    );
  }

  // Main sorting function
  const sortInventory = (rawData, tentativeData, sortValue) => {
    switch (sortValue) {
      case "price: low to high":
        return tentativeData.sort(sortByPriceLowToHigh);
      case "price: high to low":
        console.log(tentativeData.sort(sortByPriceHighToLow));
        return tentativeData.sort(sortByPriceHighToLow);
      case "average rating":
        return tentativeData.sort(sortByRatingHighToLow);
      case "popularity":
        return tentativeData.sort(sortByReviewsHighToLow);
      case "latest":
        return tentativeData.sort(sortByNewest);
      default:
        return rawData; // Return unchanged if no match
    }
  };

  // Event listener setup
  if (shopSortSelect) {
    if (!categoriesList.classList.contains("hidden")) {
      categoriesList.classList.add("hidden");
    }
    shopSearchTextInput.value = "";
    shopPaginationElems.classList.remove("hidden");
    currentPage = 1;
    const sortValue = shopSortSelect.value.trim().toLowerCase();
    console.log(sortValue);
    inventoryData = [...defaultInventoryData];
    inventoryData = sortInventory(
      defaultInventoryData,
      inventoryData,
      sortValue
    );
    return inventoryData;
  } else {
    console.error('Element with class "shop-sort-select" not found');
  }
};

// Navigation buttons
const nextBtnFunction = (data = inventoryData) => {
  const totalPages = Math.ceil(data.length / cardsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderCards({
      dataToRender: data,
      currentPageNum: currentPage,
      cardsPerPageNum: cardsPerPage,
    });
    renderPagination(data);
    scrollToTop();
  }
};

const prevBtnFunction = (data = inventoryData) => {
  if (currentPage > 1) {
    currentPage--;
    renderCards({
      dataToRender: data,
      currentPageNum: currentPage,
      cardsPerPageNum: cardsPerPage,
    });
    renderPagination(data);
    scrollToTop();
  }
};

prevBtn && prevBtn.addEventListener("click", () => prevBtnFunction());
nextBtn && nextBtn.addEventListener("click", () => nextBtnFunction());

// Initial Render
renderCards({
  dataToRender: inventoryData,
  currentPageNum: currentPage,
  cardsPerPageNum: cardsPerPage,
});
renderPagination(inventoryData);
window.addEventListener("resize", () => renderPagination(inventoryData));

// const categoryBtn = document.querySelector(".category-btn");
const toggleCategoryBtn = document.querySelector(".toggle-cat-btn");
const categoriesList = document.querySelector(".categories-list");
const categoryButtons = document.querySelectorAll(".category-btn");
let shopSearchTextInput = document.getElementById('shop-search-input');

const resetCategoryButtonsTextColor = (btns) => {
  btns.forEach((btn) => {
    btn.classList.remove("text-[#1E1E1E]");
    btn.classList.remove("text-[#FF4500]");

    if (btn.classList.contains("text-[#FF4500]")) {
      btn.classList.remove("text-[#FF4500]");
      btn.classList.add("text-[#1E1E1E]");
    }
  });
};

toggleCategoryBtn.addEventListener("click", () => {
  resetCategoryButtonsTextColor(categoryButtons);
  categoriesList.classList.toggle("hidden");
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    categoryButtons.forEach((btn) => {
      btn.classList.remove("text-[#1E1E1E]");
      btn.classList.remove("text-[#FF4500]");

      if (btn == event.target) {
        btn.classList.add("text-[#FF4500]");
      } else {
        console.log("Not Target");
        btn.classList.add("text-[#1E1E1E]");
      }
    });

    currentPage = 1;
    shopSearchTextInput.value = "";
    const sortedItemsData = sortedShopItemsData();
    const category = event.target.textContent.trim().toLowerCase();
    inventoryData = sortedItemsData.filter(
      (item) => item.itemCategory === category
    );
    shopPaginationElems.classList.add("hidden");
    if (inventoryData.length === 0) {
      cardContainer.innerHTML =
        "<p class='font-bold font-['poppins'] text-sm md:text-lg text-center sm:text-left capitalize text-[#767676]'>No data found for this category.</p>";
      resultsInfo.textContent = "Showing 0 results";
      pageInfo.textContent = "";
      paginationContainer.innerHTML = "";
    } else {
      if (shopPaginationElems.classList.contains("hidden")) {
        shopPaginationElems.classList.remove("hidden");
      }
      nextBtnFunction(inventoryData);
      prevBtnFunction(inventoryData);
      renderCards({
        dataToRender: inventoryData,
        currentPageNum: currentPage,
        cardsPerPageNum: cardsPerPage,
      });
      renderPagination(inventoryData);
    }
  });
});

const shopSearchButtons = document.querySelectorAll(".shop-search-btn");
const shopNavSearchTrigger = document.querySelector(".shop-nav-search-trigger");
const shopNavSearch = document.querySelector(".shop-nav-search");
const shopPaginationElems = document.getElementById("shop-pagination");
const shopSortSelect = document.querySelector(".shop-sort-select");

shopSearchButtons.forEach(button => button.addEventListener("click", (event) => {
  currentPage = 1;
  shopSortSelect.value = "Default";
  if (!categoriesList.classList.contains("hidden")) {
    categoriesList.classList.add("hidden");
  }
  shopSearchTextInput = event.target.closest('div').querySelector('input');
  const itemName = shopSearchTextInput.value.trim().toLowerCase();

  document.querySelectorAll('.shop-search-input').forEach(input => {
    if (input !== shopSearchTextInput) {
      input.value = "";
    }
  })
  itemName &&
    (inventoryData = defaultInventoryData.filter(
      (item) => item.name.toLowerCase() === itemName
    ));
  itemName == '' && (inventoryData = defaultInventoryData);
  nextBtnFunction(inventoryData);
  prevBtnFunction(inventoryData);
  renderCards({
    dataToRender: inventoryData,
    currentPageNum: currentPage,
    cardsPerPageNum: cardsPerPage,
  });
  renderPagination(inventoryData);
  shopPaginationElems.classList.add("hidden");
  shopNavSearch.classList.add("hidden");
  cartModalProtocol();

}));

const hideShopNavSearch = () => {
  document.addEventListener('click', (event) => {
    if (event.target.closest('.search-cart') && !event.target.closest('.search-cart').querySelector('input').contains(event.target) && !shopNavSearchTrigger.contains(event.target)){
      shopNavSearch.classList.add("hidden");
      console.log("Idiot");
    }
  });
};

shopNavSearchTrigger.addEventListener("click", (event) => {
  event.preventDefault();
  shopNavSearch.classList.remove("hidden");

  document.addEventListener('click', hideShopNavSearch);

})

const renderBasedOnSortedData = () => {
  const sortedData = sortedShopItemsData();

  // Assuming these functions exist and handled the data sorting
  nextBtnFunction(sortedData);
  prevBtnFunction(sortedData);
  renderCards({
    dataToRender: sortedData,
    currentPageNum: currentPage,
    cardsPerPageNum: cardsPerPage,
  });
  renderPagination(sortedData);
};

shopSortSelect.addEventListener("change", renderBasedOnSortedData);

