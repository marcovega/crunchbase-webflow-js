/**
 * Case Study Filter Feature
 *
 * Dynamically filters case study cards based on select dropdown values.
 * - Populates dropdown options from card data attributes
 * - Supports multiple filter controls working together (AND logic)
 * - Shows/hides cards based on selected filters
 * - Implements custom pagination
 */

export function initCaseStudyFilter() {
  console.log("🔍 Case Study Filter: Starting...");

  // Configuration
  const CARDS_CONTAINER_SELECTOR = ".case-study-cards-grid";
  const CARD_SELECTOR = ".case-study-card";
  const FILTER_CONTROL_ATTRIBUTE = "data-filter-control";
  const ITEMS_ATTRIBUTE = "case-study-items";
  const PAGINATION_CLASS = "posts-pagination";

  // Find the container
  const container = document.querySelector(CARDS_CONTAINER_SELECTOR);
  if (!container) {
    console.warn(
      `⚠️ Case Study Filter: Container "${CARDS_CONTAINER_SELECTOR}" not found`
    );
    return;
  }

  // Find all cards and their parent w-dyn-item elements
  const cards = Array.from(container.querySelectorAll(CARD_SELECTOR)).map(
    (card) => {
      const parent = card.closest(".w-dyn-item");
      return { card, parent };
    }
  );
  if (cards.length === 0) {
    console.warn(
      `⚠️ Case Study Filter: No cards found with selector "${CARD_SELECTOR}"`
    );
    return;
  }

  console.log(`📊 Case Study Filter: Found ${cards.length} cards`);

  // Find the scroll container (element with case-study-items attribute)
  const scrollContainer = document.querySelector(`[${ITEMS_ATTRIBUTE}]`);

  if (!scrollContainer) {
    console.warn(
      `⚠️ Case Study Filter: Scroll container with attribute "${ITEMS_ATTRIBUTE}" not found. Using default.`
    );
  }

  // Get items per page from attribute
  const itemsPerPageAttr = scrollContainer
    ? scrollContainer.getAttribute(ITEMS_ATTRIBUTE)
    : null;

  const itemsPerPage = itemsPerPageAttr ? parseInt(itemsPerPageAttr, 10) : 12; // Default to 12 if not specified
  console.log(`📄 Case Study Filter: Items per page: ${itemsPerPage}`);

  // Pagination state
  let currentPage = 1;

  // Find or create pagination container
  let paginationContainer = container.parentElement?.querySelector(
    `.${PAGINATION_CLASS}`
  );
  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.className = `w-pagination-wrapper ${PAGINATION_CLASS}`;
    paginationContainer.setAttribute("role", "navigation");
    paginationContainer.setAttribute("aria-label", "List");
    container.parentElement?.insertBefore(
      paginationContainer,
      container.nextSibling
    );
    console.log("📄 Case Study Filter: Created pagination container");
  }

  // Store current filter state (initialize early)
  const activeFilters = {};

  // Find all filter controls
  const filterControls = Array.from(
    document.querySelectorAll(`[${FILTER_CONTROL_ATTRIBUTE}]`)
  );

  if (filterControls.length === 0) {
    console.warn(
      `⚠️ Case Study Filter: No filter controls found with attribute "${FILTER_CONTROL_ATTRIBUTE}"`
    );
    // Still apply pagination even without filters
    applyFilters();
    console.log("✅ Case Study Filter: Complete (pagination only, no filters)");
    return;
  }

  console.log(
    `🎛️ Case Study Filter: Found ${filterControls.length} filter control(s)`
  );

  // Pre-initialize all filter types to empty strings
  filterControls.forEach((select) => {
    const filterType = select.getAttribute(FILTER_CONTROL_ATTRIBUTE);
    if (filterType) {
      activeFilters[filterType] = "";
    }
  });

  // Initialize each filter control
  filterControls.forEach((select) => {
    const filterType = select.getAttribute(FILTER_CONTROL_ATTRIBUTE);
    if (!filterType) return;

    initializeFilter(select, filterType);
  });

  // Inject CSS to hide items beyond first page initially (prevents flicker)
  const initialHideStyleId = "case-study-initial-hide";
  const styleTag = document.createElement("style");
  styleTag.id = initialHideStyleId;
  styleTag.textContent = `
    .case-study-cards-grid .w-dyn-item:nth-child(n+${itemsPerPage + 1}) {
      display: none !important;
    }
  `;
  document.head.appendChild(styleTag);
  console.log(`🎨 Applied initial CSS hide for items beyond ${itemsPerPage}`);

  // Function to remove the initial CSS hide rule
  function removeInitialHide() {
    const existingStyle = document.getElementById(initialHideStyleId);
    if (existingStyle) {
      existingStyle.remove();
      console.log(
        "🗑️ Removed initial CSS hide rule, JS pagination taking over"
      );
    }
  }

  // Function to reapply the initial CSS hide rule
  function reapplyInitialHide() {
    // First remove it if it exists
    removeInitialHide();

    // Then add it back
    const styleTag = document.createElement("style");
    styleTag.id = initialHideStyleId;
    styleTag.textContent = `
      .case-study-cards-grid .w-dyn-item:nth-child(n+${itemsPerPage + 1}) {
        display: none !important;
      }
    `;
    document.head.appendChild(styleTag);
    console.log("🎨 Reapplied initial CSS hide rule");
  }

  // Function to check if all filters are at their initial state (all empty)
  function areAllFiltersEmpty() {
    return Object.values(activeFilters).every((value) => value === "");
  }

  // Show pagination controls initially
  updatePagination(Math.ceil(cards.length / itemsPerPage));

  function initializeFilter(select, filterType) {
    const dataAttribute = `data-filter-${filterType}`;
    console.log(`🔧 Setting up filter: ${filterType} (${dataAttribute})`);

    // Collect unique values from cards
    const uniqueValues = new Set();
    cards.forEach(({ card }) => {
      // Special handling for Use Cases which are in a nested list structure
      if (filterType === "use-case") {
        const nestTarget = card.querySelector('[fs-list-nest="use-cases"]');
        if (nestTarget) {
          const useCaseItems = nestTarget.querySelectorAll(
            '[role="listitem"].w-dyn-item'
          );
          useCaseItems.forEach((item) => {
            const text = item.textContent.trim();
            if (text) {
              uniqueValues.add(text);
            }
          });
        }
      } else {
        // Standard handling for other filter types
        const value = card.getAttribute(dataAttribute);
        if (value && value.trim()) {
          uniqueValues.add(value.trim());
        }
      }
    });

    // Sort values alphabetically
    const sortedValues = Array.from(uniqueValues).sort((a, b) =>
      a.localeCompare(b)
    );

    console.log(`   Found ${sortedValues.length} unique values:`, sortedValues);

    // Keep existing first option (usually a label like "Use Case", "Product", etc.)
    // Remove all other options except the first one with empty value
    const options = Array.from(select.options);
    for (let i = options.length - 1; i >= 0; i--) {
      // Keep the first option if it has no value (acts as label/placeholder)
      if (i === 0 && (!options[i].value || options[i].value === "")) {
        continue;
      }
      // Remove all other options
      select.remove(i);
    }

    // Add options for each unique value
    sortedValues.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });

    // Filter state already initialized in pre-init loop

    // Add change event listener
    select.addEventListener("change", function () {
      activeFilters[filterType] = this.value;
      console.log(`🔄 Filter changed: ${filterType} = "${this.value}"`);

      // Add color styling when a value is selected, remove when empty
      if (this.value) {
        this.style.color = "var(--_colors---primary--dark-blue)";
      } else {
        this.style.color = "";
      }

      // Reset to page 1 when filter changes
      currentPage = 1;

      // Check if all filters are now empty (back to initial state)
      if (areAllFiltersEmpty()) {
        console.log("🔄 All filters reset, reapplying CSS pagination");
        reapplyInitialHide();
        // Show all items initially (remove inline styles)
        cards.forEach(({ card, parent }) => {
          const element = parent || card;
          element.style.display = "";
        });
        // Update pagination UI
        updatePagination(Math.ceil(cards.length / itemsPerPage));
      } else {
        // Remove initial CSS hide rule (JS takes over)
        removeInitialHide();
        applyFilters();
      }
    });
  }

  /**
   * Apply all active filters to cards and handle pagination
   */
  function applyFilters() {
    console.log("🎯 Applying filters:", activeFilters);

    // First pass: determine which cards match filters
    const filteredCards = [];

    cards.forEach(({ card, parent }) => {
      let shouldShow = true;

      // Check each active filter
      for (const [filterType, filterValue] of Object.entries(activeFilters)) {
        // Skip if filter is set to "All" (empty string)
        if (!filterValue) continue;

        let isMatch = false;

        // Special handling for Use Cases
        if (filterType === "use-case") {
          const nestTarget = card.querySelector('[fs-list-nest="use-cases"]');
          if (nestTarget) {
            const useCaseItems = nestTarget.querySelectorAll(
              '[role="listitem"].w-dyn-item'
            );
            for (const item of useCaseItems) {
              const text = item.textContent.trim();
              if (text === filterValue) {
                isMatch = true;
                break;
              }
            }
          }
        } else {
          // Standard handling for other filter types
          const dataAttribute = `data-filter-${filterType}`;
          const cardValue = card.getAttribute(dataAttribute);
          isMatch = cardValue === filterValue;
        }

        // Hide card if it doesn't match this filter
        if (!isMatch) {
          shouldShow = false;
          break;
        }
      }

      if (shouldShow) {
        filteredCards.push({ card, parent });
      }
    });

    // Calculate pagination
    const totalFilteredItems = filteredCards.length;
    const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);

    // Ensure current page is within bounds
    if (currentPage > totalPages && totalPages > 0) {
      currentPage = totalPages;
    }
    if (currentPage < 1) {
      currentPage = 1;
    }

    // Calculate which items to show on current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    console.log(
      `📄 Pagination: Page ${currentPage}/${totalPages}, showing items ${startIndex + 1}-${Math.min(endIndex, totalFilteredItems)} of ${totalFilteredItems}`
    );

    // Second pass: show/hide all cards based on filter + pagination
    let visibleCount = 0;
    let hiddenCount = 0;

    cards.forEach(({ card, parent }) => {
      const filteredIndex = filteredCards.findIndex((fc) => fc.card === card);
      const shouldShow =
        filteredIndex >= 0 &&
        filteredIndex >= startIndex &&
        filteredIndex < endIndex;

      // Show or hide the parent w-dyn-item
      const element = parent || card;

      if (shouldShow) {
        element.style.display = "";
        visibleCount++;
      } else {
        element.style.display = "none";
        hiddenCount++;
      }
    });

    console.log(
      `✅ Filter applied: ${visibleCount} visible, ${hiddenCount} hidden`
    );

    // Update pagination UI
    updatePagination(totalPages);

    // Optional: Dispatch custom event for other scripts to listen to
    const event = new CustomEvent("caseStudyFiltersApplied", {
      detail: {
        activeFilters,
        visibleCount,
        hiddenCount,
        totalCount: cards.length,
        currentPage,
        totalPages,
        totalFilteredItems,
      },
    });
    document.dispatchEvent(event);
  }

  /**
   * Update pagination UI
   */
  function updatePagination(totalPages) {
    // Hide pagination if only 1 page or no pages
    if (totalPages <= 1) {
      paginationContainer.style.display = "none";
      return;
    }

    paginationContainer.style.display = "";

    // Build pagination HTML
    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages;

    let paginationHTML = `
      <a 
        aria-label="Pagination Left arrow" 
        href="#" 
        class="w-pagination-previous pagination-item pagination-left ${prevDisabled ? "is-list-pagination-disabled" : ""}" 
        aria-disabled="${prevDisabled}" 
        tabindex="${prevDisabled ? "-1" : "0"}"
        data-pagination-prev
      >
        <svg class="w-pagination-previous-icon pagination-icon" height="12px" width="12px"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" transform="translate(0, 1)">
          <path fill="none" stroke="currentColor" fill-rule="evenodd" d="M8 10L4 6l4-4"></path>
        </svg>
      </a>
      <div class="pagination-pages-list">
    `;

    // Add page number buttons
    for (let page = 1; page <= totalPages; page++) {
      const isCurrent = page === currentPage;
      paginationHTML += `
        <a 
          href="#" 
          class="pagination-item pagination-page ${isCurrent ? "w--current" : ""}" 
          ${isCurrent ? 'aria-current="page"' : ""}
          data-pagination-page="${page}"
        >${page}</a>
      `;
    }

    paginationHTML += `
      </div>
      <a 
        aria-label="Pagination Right arrow" 
        href="#" 
        class="w-pagination-next pagination-item pagination-right ${nextDisabled ? "is-list-pagination-disabled" : ""}" 
        aria-disabled="${nextDisabled}" 
        tabindex="${nextDisabled ? "-1" : "0"}"
        data-pagination-next
      >
        <svg class="w-pagination-next-icon pagination-icon" height="12px" width="12px"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" transform="translate(0, 1)">
          <path fill="none" stroke="currentColor" fill-rule="evenodd" d="M4 2l4 4-4 4"></path>
        </svg>
      </a>
    `;

    paginationContainer.innerHTML = paginationHTML;

    // Attach event listeners to pagination controls
    attachPaginationListeners();
  }

  /**
   * Attach event listeners to pagination controls
   */
  function attachPaginationListeners() {
    // Previous button
    const prevButton = paginationContainer.querySelector(
      "[data-pagination-prev]"
    );
    if (prevButton) {
      prevButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage > 1) {
          // Remove initial CSS hide rule (JS takes over)
          removeInitialHide();
          currentPage--;
          applyFilters();
          scrollToTop();
        }
      });
    }

    // Next button
    const nextButton = paginationContainer.querySelector(
      "[data-pagination-next]"
    );
    if (nextButton) {
      nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        // Remove initial CSS hide rule (JS takes over)
        removeInitialHide();
        const totalFilteredItems = cards.filter(({ card }) => {
          // Check if card matches current filters
          for (const [filterType, filterValue] of Object.entries(
            activeFilters
          )) {
            if (!filterValue) continue;
            let isMatch = false;
            if (filterType === "use-case") {
              const nestTarget = card.querySelector(
                '[fs-list-nest="use-cases"]'
              );
              if (nestTarget) {
                const useCaseItems = nestTarget.querySelectorAll(
                  '[role="listitem"].w-dyn-item'
                );
                for (const item of useCaseItems) {
                  if (item.textContent.trim() === filterValue) {
                    isMatch = true;
                    break;
                  }
                }
              }
            } else {
              const dataAttribute = `data-filter-${filterType}`;
              const cardValue = card.getAttribute(dataAttribute);
              isMatch = cardValue === filterValue;
            }
            if (!isMatch) return false;
          }
          return true;
        }).length;
        const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);

        if (currentPage < totalPages) {
          currentPage++;
          applyFilters();
          scrollToTop();
        }
      });
    }

    // Page number buttons
    const pageButtons = paginationContainer.querySelectorAll(
      "[data-pagination-page]"
    );
    pageButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        // Remove initial CSS hide rule (JS takes over)
        removeInitialHide();
        const page = parseInt(button.getAttribute("data-pagination-page"), 10);
        if (page !== currentPage) {
          currentPage = page;
          applyFilters();
          scrollToTop();
        }
      });
    });
  }

  /**
   * Scroll to the top of the case study items container
   */
  function scrollToTop() {
    if (scrollContainer) {
      scrollContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  console.log("✅ Case Study Filter: Complete");
}

export default initCaseStudyFilter;
