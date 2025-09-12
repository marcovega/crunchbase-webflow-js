/*
 * Related Articles Slider
 * Responsive slider for blog post related articles
 * - Desktop: No slider (grid layout)
 * - Tablet: 2 items visible, navigation arrows
 * - Mobile: 1 item visible, navigation arrows
 * Based on quotes-slider.js functionality
 */

export function initRelatedArticlesSlider() {
  class RelatedArticlesSlider {
    constructor(wrapper) {
      this.wrapper = wrapper;
      this.itemsContainer = wrapper.querySelector(
        ".related-item-collection-list"
      );
      this.items = Array.from(wrapper.querySelectorAll(".collection-item"));

      this.currentIndex = 0;
      this.totalItems = this.items.length;
      this.gap = 20; // Gap between items
      this.isAnimating = false;
      this.resizeTimeout = null;

      // Get CSS variables for customization
      this.animationDuration = this.getCSSVariable(
        "--related-articles-slider-duration",
        "400ms"
      );
      this.animationEasing = this.getCSSVariable(
        "--related-articles-slider-easing",
        "ease-out"
      );

      // TEMPORARY: Force enable for testing (remove this in production)
      this.forceEnable =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      this.init();
    }

    getCSSVariable(property, fallback) {
      return (
        getComputedStyle(document.documentElement)
          .getPropertyValue(property)
          .trim() || fallback
      );
    }

    init() {
      if (!this.wrapper || !this.itemsContainer || this.totalItems === 0) {
        console.warn("Related Articles Slider: Required elements not found");
        return;
      }

      this.isEnabled = this.shouldEnable();
      if (this.isEnabled) {
        this.setupSlider();
      }

      // Handle resize events
      window.addEventListener("resize", () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => this.handleResize(), 150);
      });
    }

    shouldEnable() {
      return (
        window.matchMedia("(max-width: 991px)").matches || this.forceEnable
      );
    }

    setupSlider() {
      // Calculate dimensions first to know items per view
      this.updateDimensions();

      // Set overflow hidden on the wrapper container
      this.wrapper.style.overflow = "hidden";

      // Enable slider - override all grid styles
      this.itemsContainer.style.cssText = `
        display: flex !important;
        scroll-behavior: smooth;
        gap: ${this.gap}px !important;
        transition: transform ${this.animationDuration} ${this.animationEasing};
        grid-template-columns: none !important;
        grid-template-rows: none !important;
        grid-auto-flow: none !important;
      `;

      // Apply item styles
      this.applyItemStyles();

      // Create navigation if it doesn't exist
      if (!this.navContainer) {
        this.createNavigation();
        this.attachEventListeners();
      }

      this.updateNavigationState();
    }

    updateDimensions() {
      this.containerWidth = this.itemsContainer.offsetWidth;
      this.itemsPerView = 1; // Always 1 item per view for tablet/mobile
      this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
    }

    applyItemStyles() {
      const itemWidth = this.containerWidth; // Full width for single item view

      this.items.forEach((item) => {
        item.style.cssText = `
          flex-shrink: 0;
          width: ${itemWidth}px !important;
          min-width: ${itemWidth}px !important;
          max-width: ${itemWidth}px !important;
          grid-column: unset !important;
          grid-row: unset !important;
          grid-area: unset !important;
          place-self: unset !important;
          align-self: unset !important;
          justify-self: unset !important;
        `;
      });
    }

    createNavigation() {
      // Create navigation container
      this.navContainer = document.createElement("div");
      this.navContainer.className = "related-articles-slider-nav";
      this.navContainer.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 30px;
        justify-content: center;
      `;

      // Button styles
      const buttonStyle = `
        width: 34px;
        height: 34px;
        border-radius: 22px;
        border: 1.5px solid #146AFF;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        padding: 0;
      `;

      // Create previous button
      this.prevBtn = document.createElement("button");
      this.prevBtn.className = "related-articles-slider-prev";
      this.prevBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
          <path d="M6 0.999999L1 6L6 11.3333" stroke="#146AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      this.prevBtn.style.cssText = buttonStyle;

      // Create next button
      this.nextBtn = document.createElement("button");
      this.nextBtn.className = "related-articles-slider-next";
      this.nextBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none" style="transform: rotate(180deg);">
          <path d="M6 0.999999L1 6L6 11.3333" stroke="#146AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      this.nextBtn.style.cssText = buttonStyle;

      // Add buttons to navigation container
      this.navContainer.appendChild(this.prevBtn);
      this.navContainer.appendChild(this.nextBtn);

      // Insert navigation after the wrapper
      this.wrapper.parentNode.insertBefore(
        this.navContainer,
        this.wrapper.nextSibling
      );
    }

    attachEventListeners() {
      if (this.prevBtn) {
        this.prevBtn.addEventListener("click", () => this.goToPrevious());
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener("click", () => this.goToNext());
      }
    }

    goToNext() {
      if (this.isAnimating || this.currentIndex >= this.maxIndex) return;
      this.navigateTo(this.currentIndex + 1);
    }

    goToPrevious() {
      if (this.isAnimating || this.currentIndex <= 0) return;
      this.navigateTo(this.currentIndex - 1);
    }

    navigateTo(index) {
      this.isAnimating = true;
      this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));

      const translateX = -(
        this.currentIndex *
        (this.containerWidth + this.gap)
      );
      this.itemsContainer.style.transform = `translateX(${translateX}px)`;

      this.updateNavigationState();

      setTimeout(() => {
        this.isAnimating = false;
      }, parseInt(this.animationDuration));
    }

    updateNavigationState() {
      if (!this.prevBtn || !this.nextBtn) return;

      // Update previous button state
      if (this.currentIndex <= 0) {
        this.prevBtn.style.opacity = "0.3";
        this.prevBtn.style.cursor = "not-allowed";
      } else {
        this.prevBtn.style.opacity = "1";
        this.prevBtn.style.cursor = "pointer";
      }

      // Update next button state
      if (this.currentIndex >= this.maxIndex) {
        this.nextBtn.style.opacity = "0.3";
        this.nextBtn.style.cursor = "not-allowed";
      } else {
        this.nextBtn.style.opacity = "1";
        this.nextBtn.style.cursor = "pointer";
      }
    }

    handleResize() {
      const shouldBeEnabled = this.shouldEnable();

      if (shouldBeEnabled && !this.isEnabled) {
        // Enable slider
        this.isEnabled = true;
        this.setupSlider();
      } else if (!shouldBeEnabled && this.isEnabled) {
        // Disable slider
        this.isEnabled = false;
        this.restoreOriginalLayout();
      } else if (this.isEnabled) {
        // Update dimensions and layout
        this.updateDimensions();
        this.applyItemStyles();

        // Reset to valid index if current index is out of bounds
        if (this.currentIndex > this.maxIndex) {
          this.currentIndex = this.maxIndex;
        }

        this.navigateTo(this.currentIndex);
      }
    }

    restoreOriginalLayout() {
      // Remove overflow hidden from wrapper
      this.wrapper.style.overflow = "";

      // Remove all inline styles to restore original CSS
      this.itemsContainer.removeAttribute("style");
      this.items.forEach((item) => item.removeAttribute("style"));

      // Remove navigation
      if (this.navContainer && this.navContainer.parentNode) {
        this.navContainer.parentNode.removeChild(this.navContainer);
        this.navContainer = null;
        this.prevBtn = null;
        this.nextBtn = null;
      }
    }
  }

  // Find all related articles containers and initialize them
  const containers = document.querySelectorAll(
    ".related-item-collection-list-wrapper"
  );
  const sliders = [];

  console.log(
    `📰 Related Articles Slider: Found ${containers.length} containers`
  );

  containers.forEach((container) => {
    // Look for the container that has the proper structure
    const wrapper = container;
    const itemsContainer = container.querySelector(
      ".related-item-collection-list"
    );
    const items = container.querySelectorAll(".collection-item");

    if (wrapper && itemsContainer && items.length > 0) {
      const slider = new RelatedArticlesSlider(wrapper);
      sliders.push(slider);
    }
  });

  // Expose sliders globally for debugging/manual control
  window.relatedArticlesSliders = sliders;

  return sliders;
}

export default initRelatedArticlesSlider;
