/**
 * Search Popup Feature
 *
 * Creates a full-screen search popup that:
 * - Opens when clicking navigation search icons
 * - Shows the footer search form in the center
 * - Closes with ESC key or X button
 */

export function initSearchPopup() {
  console.log("🔍 Search Popup: Initializing...");

  // Find the original search form in the footer
  const originalSearch = document.querySelector("footer .search");
  if (!originalSearch) {
    console.warn("⚠️ Search Popup: Footer search form not found");
    return;
  }

  // Create the modal overlay
  const modal = document.createElement("div");
  modal.id = "search-popup-modal";
  modal.className = "search-popup-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Search");

  // Create the close button
  const closeButton = document.createElement("button");
  closeButton.className = "search-popup-close";
  closeButton.innerHTML = "×";
  closeButton.setAttribute("aria-label", "Close search");

  // Create the content wrapper
  const contentWrapper = document.createElement("div");
  contentWrapper.className = "search-popup-content";

  // Clone the search form (we'll move it in/out instead of cloning to preserve form state)
  // We need to preserve the original form's parent so we can move it back
  const originalParent = originalSearch.parentElement;
  const originalNextSibling = originalSearch.nextSibling;

  // Intercept form submission to redirect to Crunchbase textsearch
  originalSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = originalSearch.querySelector('input[type="search"]');
    const query = searchInput ? searchInput.value.trim() : "";
    
    if (query) {
      const searchUrl = `https://www.crunchbase.com/textsearch?q=${encodeURIComponent(query)}`;
      window.location.href = searchUrl;
    }
  });

  // Append elements to modal
  modal.appendChild(closeButton);
  contentWrapper.appendChild(originalSearch);
  modal.appendChild(contentWrapper);
  document.body.appendChild(modal);

  // Function to open modal
  function openModal() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    
    // Focus on search input after a brief delay
    setTimeout(() => {
      const searchInput = modal.querySelector('input[type="search"]');
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);

    console.log("🔍 Search Popup: Opened");
  }

  // Function to close modal
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
    
    // Move search form back to original location
    if (originalNextSibling) {
      originalParent.insertBefore(originalSearch, originalNextSibling);
    } else {
      originalParent.appendChild(originalSearch);
    }
    
    // Move it back to modal for next time
    setTimeout(() => {
      contentWrapper.appendChild(originalSearch);
    }, 50);

    console.log("🔍 Search Popup: Closed");
  }

  // Add click handler to close button
  closeButton.addEventListener("click", closeModal);

  // Close when clicking outside the content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeModal();
    }
  });

  // Find all search icon triggers (desktop and mobile)
  const searchTriggers = document.querySelectorAll(
    ".navigation-cta .icon-search"
  );

  if (searchTriggers.length === 0) {
    console.warn(
      "⚠️ Search Popup: No search triggers found (.navigation-cta .icon-search)"
    );
  } else {
    console.log(
      `🔍 Search Popup: Found ${searchTriggers.length} search trigger(s)`
    );
  }

  // Add click handlers to all search triggers
  searchTriggers.forEach((trigger) => {
    trigger.style.cursor = "pointer";
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });

  console.log("✅ Search Popup: Complete");
}

export default initSearchPopup;

