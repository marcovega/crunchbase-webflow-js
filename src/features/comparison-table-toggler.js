/*
 * Comparison Table Toggler
 * Toggles between first column and last column views in comparison tables
 * First column is enabled by default
 */

export function initComparisonTableToggler() {
  class ComparisonTableToggler {
    constructor() {
      this.init();
    }

    init() {
      console.log(
        `🔀 Comparison Table Toggler: Initialized and listening for clicks`
      );
      this.bindEvents();
    }

    bindEvents() {
      // Bind click events to all triggers
      document.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-cmp-table-trigger]");
        if (!trigger) return;

        const triggerType = trigger.getAttribute("data-cmp-table-trigger");
        const container = trigger.closest(".comparison-table-container");

        if (!container) return;

        if (triggerType === "first-column") {
          this.activateFirstColumn(container);
        } else if (triggerType === "last-column") {
          this.activateLastColumn(container);
        }
      });
    }

    activateFirstColumn(container) {
      // Update trigger states
      const firstTrigger = container.querySelector(
        '[data-cmp-table-trigger="first-column"]'
      );
      const lastTrigger = container.querySelector(
        '[data-cmp-table-trigger="last-column"]'
      );

      if (firstTrigger) {
        firstTrigger.classList.add("comparison-table-link-active");
      }

      if (lastTrigger) {
        lastTrigger.classList.remove("comparison-table-link-active");
      }

      // Show first column rows, hide last column rows
      this.showFirstColumn(container);
    }

    activateLastColumn(container) {
      // Update trigger states
      const firstTrigger = container.querySelector(
        '[data-cmp-table-trigger="first-column"]'
      );
      const lastTrigger = container.querySelector(
        '[data-cmp-table-trigger="last-column"]'
      );

      if (firstTrigger) {
        firstTrigger.classList.remove("comparison-table-link-active");
      }

      if (lastTrigger) {
        lastTrigger.classList.add("comparison-table-link-active");
      }

      // Show last column rows, hide first column rows
      this.showLastColumn(container);
    }

    showFirstColumn(container) {
      // Show first column rows
      const firstRows = container.querySelectorAll(
        ".cmp-table-row.cmp-table-row-first"
      );
      firstRows.forEach((row) => {
        row.style.display = "flex";
      });

      // Hide last column rows
      const lastRows = container.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      );
      lastRows.forEach((row) => {
        row.style.display = "none";
      });
    }

    showLastColumn(container) {
      // Show last column rows
      const lastRows = container.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      );
      lastRows.forEach((row) => {
        row.style.display = "flex";
      });

      // Hide first column rows
      const firstRows = container.querySelectorAll(
        ".cmp-table-row.cmp-table-row-first"
      );
      firstRows.forEach((row) => {
        row.style.display = "none";
      });
    }
  }

  // Initialize comparison table toggler
  new ComparisonTableToggler();
}

export default initComparisonTableToggler;
