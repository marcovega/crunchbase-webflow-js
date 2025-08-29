/**
 * Tabbed Cards Feature
 *
 * Manages tabbed card interactions with image display.
 * Only one card open at a time, displays active card's image.
 */

export function initTabbedCards() {
  // Wait for DOM to be fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTabbedCardsAfterLoad);
  } else {
    initTabbedCardsAfterLoad();
  }
}

function initTabbedCardsAfterLoad() {
  const tabbedCardsContainers = document.querySelectorAll(".tabbed-cards");

  if (tabbedCardsContainers.length === 0) return;

  console.log(
    `🎴 Tabbed Cards: Found ${tabbedCardsContainers.length} containers`
  );

  tabbedCardsContainers.forEach((container) => {
    initTabbedCardsContainer(container);
  });

  console.log("✅ Tabbed Cards: All containers initialized");
}

function initTabbedCardsContainer(container) {
  const imageContainer = container.querySelector(".tabbed-cards-image");
  const tabbedCards = container.querySelectorAll(".tabbed-card.w-dropdown");

  if (!imageContainer || tabbedCards.length === 0) return;

  // Move images to be siblings and create mobile versions
  moveImagesToSiblings(tabbedCards);
  createPreloadedImages(tabbedCards, imageContainer);

  tabbedCards.forEach((card, cardIndex) => {
    setupCardEventListeners(card, cardIndex, container, imageContainer);
  });

  ensureFirstCardOpen(tabbedCards, imageContainer);
  addMobileImageCSS();
}

function moveImagesToSiblings(tabbedCards) {
  tabbedCards.forEach((card, cardIndex) => {
    const imageWrapper = card.querySelector(".tabbed-card-image-wrapper");
    const img = imageWrapper?.querySelector("img");

    if (!img) return;

    // Create mobile image container as sibling
    const mobileImageContainer = document.createElement("div");
    mobileImageContainer.className = "tabbed-card-mobile-image";
    mobileImageContainer.dataset.cardIndex = cardIndex;

    // Clone the image for mobile display
    const mobileImg = img.cloneNode(true);
    mobileImageContainer.appendChild(mobileImg);

    // Insert mobile image container after the card
    card.parentNode.insertBefore(mobileImageContainer, card.nextSibling);

    // Original image will be controlled by CSS media queries
  });
}

function createPreloadedImages(tabbedCards, imageContainer) {
  imageContainer.innerHTML = "";

  const displayImg = document.createElement("img");
  displayImg.style.width = "100%";
  displayImg.style.height = "auto";
  displayImg.style.display = "block";
  displayImg.style.transition = "opacity 0.2s ease";
  displayImg.className = "tabbed-card-main-image";
  imageContainer.appendChild(displayImg);

  // Preload all images for faster switching
  tabbedCards.forEach((card) => {
    const img = card.querySelector(".tabbed-card-image-wrapper img");
    if (img?.src) {
      const preloadImg = new Image();
      preloadImg.src = img.src;
    }
  });
}

function setupCardEventListeners(card, cardIndex, container, imageContainer) {
  const toggler = card.querySelector(".tabbed-card-toggler");
  if (!toggler) return;

  toggler.addEventListener("click", () => {
    const isCurrentlyExpanded =
      toggler.getAttribute("aria-expanded") === "true";

    if (!isCurrentlyExpanded) {
      closeOtherCards(card, container);
      setTimeout(() => {
        showCardImage(cardIndex, imageContainer);
        showMobileImage(cardIndex, container);
      }, 100);
    }
  });

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "aria-expanded") {
        const newValue = toggler.getAttribute("aria-expanded");
        if (newValue === "true") {
          showCardImage(cardIndex, imageContainer);
          showMobileImage(cardIndex, container);
        }
      }
    });
  });

  observer.observe(toggler, {
    attributes: true,
    attributeFilter: ["aria-expanded"],
  });
}

function closeOtherCards(activeCard, container) {
  const allCards = container.querySelectorAll(".tabbed-card.w-dropdown");

  allCards.forEach((card) => {
    if (card !== activeCard) {
      const toggler = card.querySelector(".tabbed-card-toggler");

      if (toggler && toggler.getAttribute("aria-expanded") === "true") {
        toggler.click();

        // Fallback if click doesn't work
        setTimeout(() => {
          if (toggler.getAttribute("aria-expanded") === "true") {
            toggler.setAttribute("aria-expanded", "false");
            const dropdown = card.querySelector(".w-dropdown");
            const dropdownList = card.querySelector(".w-dropdown-list");
            const dropdownToggle = card.querySelector(".w-dropdown-toggle");

            dropdown?.classList.remove("w--open");
            dropdownList?.classList.remove("w--open");
            dropdownToggle?.classList.remove("w--open");
          }
        }, 50);
      }
    }
  });
}

function showCardImage(cardIndex, imageContainer) {
  const displayImg = imageContainer.querySelector(".tabbed-card-main-image");
  if (!displayImg) return;

  const cards = imageContainer
    .closest(".tabbed-cards")
    .querySelectorAll(".tabbed-card.w-dropdown");
  const sourceCard = cards[cardIndex];
  if (!sourceCard) return;

  const sourceImg = sourceCard.querySelector(".tabbed-card-image-wrapper img");
  if (!sourceImg) return;

  if (displayImg.src !== sourceImg.src) {
    displayImg.style.opacity = "0.5";
    displayImg.src = sourceImg.src;
    displayImg.alt = sourceImg.alt || "";
    displayImg.onload = () => {
      displayImg.style.opacity = "1";
    };
  }
}

function showMobileImage(cardIndex, container) {
  // Hide all mobile images
  const allMobileImages = container.querySelectorAll(
    ".tabbed-card-mobile-image"
  );
  allMobileImages.forEach((img) => {
    img.style.display = "none";
  });

  // Show the mobile image for the active card
  const activeMobileImage = container.querySelector(
    `[data-card-index="${cardIndex}"]`
  );
  if (activeMobileImage) {
    activeMobileImage.style.display = "block";
  }
}

function addMobileImageCSS() {
  if (document.getElementById("tabbed-cards-mobile-styles")) return;

  const style = document.createElement("style");
  style.id = "tabbed-cards-mobile-styles";
  style.textContent = `
    /* Desktop: Show original images in content, hide mobile siblings */
    @media (min-width: 992px) {
      .tabbed-card-image-wrapper {
        display: block !important;
      }
      .tabbed-card-mobile-image {
        display: none !important;
      }
    }

    /* Mobile/Tablet: Hide original images, show mobile siblings when active */
    @media (max-width: 991px) {
      .tabbed-card-image-wrapper {
        display: none !important;
      }
      .tabbed-card-mobile-image {
        display: none;
        margin-top: 16px;
        width: 100%;
      }
      .tabbed-card-mobile-image img {
        width: 100%;
        height: auto;
        border-radius: 8px;
      }
    }
  `;

  document.head.appendChild(style);
}

function ensureFirstCardOpen(tabbedCards, imageContainer) {
  if (tabbedCards.length === 0) return;

  const firstCard = tabbedCards[0];
  const firstToggler = firstCard.querySelector(".tabbed-card-toggler");
  if (!firstToggler) return;

  // Close all other cards first
  tabbedCards.forEach((card, index) => {
    if (index !== 0) {
      const toggler = card.querySelector(".tabbed-card-toggler");
      if (toggler?.getAttribute("aria-expanded") === "true") {
        toggler.click();
      }
    }
  });

  // Ensure first card is open
  setTimeout(() => {
    const isFirstCardOpen =
      firstToggler.getAttribute("aria-expanded") === "true";

    if (!isFirstCardOpen) {
      firstToggler.click();

      // Force open if click didn't work
      setTimeout(() => {
        if (firstToggler.getAttribute("aria-expanded") !== "true") {
          firstToggler.setAttribute("aria-expanded", "true");
          const dropdown = firstCard.querySelector(".w-dropdown");
          const dropdownList = firstCard.querySelector(".w-dropdown-list");
          const dropdownToggle = firstCard.querySelector(".w-dropdown-toggle");

          dropdown?.classList.add("w--open");
          dropdownList?.classList.add("w--open");
          dropdownToggle?.classList.add("w--open");
        }
      }, 100);
    }

    showCardImage(0, imageContainer);
    showMobileImage(0, firstCard.closest(".tabbed-cards"));
  }, 200);
}

// Export default for easy importing
export default initTabbedCards;
