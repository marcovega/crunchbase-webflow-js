/**
 * Case Study Filter Feature
 *
 * Dynamically filters case study cards based on select dropdown values.
 * - Populates dropdown options from card data attributes
 * - Supports multiple filter controls working together (AND logic)
 * - Shows/hides cards based on selected filters
 */

export function initCaseStudyFilter() {
  console.log("🔍 Case Study Filter: Starting...");

  // Configuration
  const CARDS_CONTAINER_SELECTOR = ".case-study-cards-grid";
  const CARD_SELECTOR = ".case-study-card";
  const FILTER_CONTROL_ATTRIBUTE = "data-filter-control";
  const DYNAMIC_CONTENT_LOAD_DELAY = 3000; // Wait 3 seconds for dynamic content

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

  // Find all filter controls
  const filterControls = Array.from(
    document.querySelectorAll(`[${FILTER_CONTROL_ATTRIBUTE}]`)
  );

  if (filterControls.length === 0) {
    console.warn(
      `⚠️ Case Study Filter: No filter controls found with attribute "${FILTER_CONTROL_ATTRIBUTE}"`
    );
    return;
  }

  console.log(
    `🎛️ Case Study Filter: Found ${filterControls.length} filter control(s)`
  );

  // Store current filter state
  const activeFilters = {};

  // Initialize each filter control
  filterControls.forEach((select) => {
    const filterType = select.getAttribute(FILTER_CONTROL_ATTRIBUTE);
    if (!filterType) return;

    // Special handling: delay use-case initialization for dynamic content
    if (filterType === "use-case") {
      console.log(
        `⏳ Use Case filter: Waiting ${DYNAMIC_CONTENT_LOAD_DELAY}ms for dynamic content to load...`
      );
      setTimeout(() => {
        console.log(
          "✨ Use Case filter: Dynamic content loaded, initializing..."
        );
        initializeFilter(select, filterType);
      }, DYNAMIC_CONTENT_LOAD_DELAY);
    } else {
      // Initialize other filters immediately (server-side rendered)
      initializeFilter(select, filterType);
    }
  });

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

    // Initialize filter state
    activeFilters[filterType] = "";

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

      applyFilters();
    });
  }

  /**
   * Apply all active filters to cards
   */
  function applyFilters() {
    console.log("🎯 Applying filters:", activeFilters);

    let visibleCount = 0;
    let hiddenCount = 0;

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

      // Show or hide the parent w-dyn-item
      if (parent) {
        if (shouldShow) {
          parent.style.display = "";
          visibleCount++;
        } else {
          parent.style.display = "none";
          hiddenCount++;
        }
      } else {
        // Fallback to card if parent not found
        if (shouldShow) {
          card.style.display = "";
          visibleCount++;
        } else {
          card.style.display = "none";
          hiddenCount++;
        }
      }
    });

    console.log(
      `✅ Filter applied: ${visibleCount} visible, ${hiddenCount} hidden`
    );

    // Optional: Dispatch custom event for other scripts to listen to
    const event = new CustomEvent("caseStudyFiltersApplied", {
      detail: {
        activeFilters,
        visibleCount,
        hiddenCount,
        totalCount: cards.length,
      },
    });
    document.dispatchEvent(event);
  }

  // Initial state - show all cards
  applyFilters();

  console.log("✅ Case Study Filter: Complete");
}

export default initCaseStudyFilter;
