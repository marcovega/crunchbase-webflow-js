/*
 * Quotes Slider with Adaptive Alignment
 * Handles variable-width quote items with intelligent right-edge detection
 * Prevents empty whitespace by switching to right-alignment when needed
 */

export function initQuotesSlider() {
  class QuotesSlider {
    constructor(container) {
      this.container = container;
      this.currentIndex = 0;
      this.quotes = [];
      this.totalQuotes = 0;
      this.containerWidth = 0;
      this.isAnimating = false;
      this.resizeTimeout = null;

      // Get CSS variables for customization
      this.animationDuration = this.getCSSVariable(
        "--quotes-slider-duration",
        "400ms"
      );
      this.animationEasing = this.getCSSVariable(
        "--quotes-slider-easing",
        "ease-out"
      );

      this.init();
    }

    getCSSVariable(property, fallback) {
      const value = getComputedStyle(document.documentElement).getPropertyValue(
        property
      );
      return value.trim() || fallback;
    }

    init() {
      this.setupContainer();
      this.calculateDimensions();
      this.createNavigation();
      this.bindEvents();

      // Set initial current index based on scroll position
      this.updateCurrentIndexFromScroll();
      this.updateNavigationState();
    }

    setupContainer() {
      // Set up the container for horizontal scrolling
      this.container.style.display = "flex";
      this.container.style.overflowX = "auto";
      this.container.style.scrollBehavior = "smooth";
      this.container.style.scrollbarWidth = "none"; // Firefox
      this.container.style.msOverflowStyle = "none"; // IE/Edge

      // Hide scrollbar in webkit browsers
      const style = document.createElement("style");
      style.textContent = `
        .quotes-slider-container::-webkit-scrollbar {
          display: none;
        }
        .quotes-slider-container {
          scroll-snap-type: x mandatory;
        }
        .quotes-slider-container > * {
          flex-shrink: 0;
          scroll-snap-align: start;
        }
      `;
      document.head.appendChild(style);
    }

    calculateDimensions() {
      this.containerWidth = this.container.offsetWidth;
      this.quotes = Array.from(this.container.children);
      this.totalQuotes = this.quotes.length;

      // Calculate gap size from CSS
      const computedStyle = getComputedStyle(this.container);
      this.gap = parseInt(computedStyle.gap) || 0;

      // Calculate individual quote widths and positions
      let currentPosition = 0;
      this.quoteData = this.quotes.map((quote, index) => {
        // Determine width based on CSS classes
        let width;
        if (quote.classList.contains("quote-card-featured")) {
          width = 862;
          quote.style.width = "862px"; // Force the width
        } else if (quote.classList.contains("quote-card")) {
          width = 410;
          quote.style.width = "410px"; // Force the width
        } else {
          // Fallback to actual width if no class matches
          const rect = quote.getBoundingClientRect();
          width = rect.width;
        }

        const data = {
          element: quote,
          width: width,
          offsetLeft: currentPosition,
          index: index,
        };

        // Update position for next quote (width + gap)
        currentPosition +=
          width + (index < this.totalQuotes - 1 ? this.gap : 0);

        return data;
      });
    }

    createNavigation() {
      // Create navigation container
      this.navContainer = document.createElement("div");
      this.navContainer.className = "quotes-slider-nav";
      this.navContainer.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 30px;
        justify-content: flex-start;
      `;

      // Create previous button
      this.prevBtn = document.createElement("button");
      this.prevBtn.className = "quotes-slider-prev";
      this.prevBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
          <path d="M6 0.999999L1 6L6 11.3333" stroke="#146AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      this.prevBtn.style.cssText = `
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

      // Create next button
      this.nextBtn = document.createElement("button");
      this.nextBtn.className = "quotes-slider-next";
      this.nextBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none" style="transform: rotate(180deg);">
          <path d="M6 0.999999L1 6L6 11.3333" stroke="#146AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      this.nextBtn.style.cssText = this.prevBtn.style.cssText;

      // Create progress bar container
      this.progressContainer = document.createElement("div");
      this.progressContainer.className = "quotes-slider-progress";
      this.progressContainer.style.cssText = `
        flex: 1;
        height: 4px;
        background: #E4EAEF;
        border-radius: 1px;
        overflow: hidden;
        margin-left: 35px;
      `;

      // Create progress bar fill
      this.progressFill = document.createElement("div");
      this.progressFill.className = "quotes-slider-progress-fill";
      this.progressFill.style.cssText = `
        height: 100%;
        background: #146AFF;
        border-radius: 1px;
        transition: width ${this.animationDuration} ${this.animationEasing};
        width: 0%;
      `;

      this.progressContainer.appendChild(this.progressFill);
      this.navContainer.appendChild(this.prevBtn);
      this.navContainer.appendChild(this.nextBtn);
      this.navContainer.appendChild(this.progressContainer);

      // Insert navigation after the container
      this.container.parentNode.insertBefore(
        this.navContainer,
        this.container.nextSibling
      );
    }

    bindEvents() {
      // Navigation buttons with click animation
      this.prevBtn.addEventListener("click", () => {
        if (!this.prevBtn.disabled) {
          this.animateButtonClick(this.prevBtn);
          this.goToPrevious();
        }
      });

      this.nextBtn.addEventListener("click", () => {
        if (!this.nextBtn.disabled) {
          this.animateButtonClick(this.nextBtn);
          this.goToNext();
        }
      });

      // Window resize with debounce
      window.addEventListener("resize", () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
          this.handleResize();
        }, 1000);
      });

      // Scroll events for mobile gesture support
      this.container.addEventListener("scroll", () => {
        this.updateCurrentIndexFromScroll();
      });
    }

    handleResize() {
      this.calculateDimensions();
      this.updateNavigationState();
      this.updateProgress();
    }

    goToNext() {
      if (this.isAnimating) return;

      // Check if we're already at the end with adaptive alignment
      if (this.currentIndex === this.totalQuotes - 1 && this.isAtScrollEnd()) {
        return;
      }

      this.isAnimating = true;

      // Find the next quote that should be navigated to
      const nextIndex = this.findNextNavigationTarget();

      if (nextIndex === -1) {
        // We're at the end, try right alignment if not already there
        const isAtEnd = this.isAtScrollEnd();
        if (!isAtEnd) {
          this.scrollToRightAlignment();
        }
      } else {
        // Calculate if we should use adaptive alignment for this target
        const shouldUseAdaptiveAlignment =
          this.shouldUseAdaptiveAlignment(nextIndex);

        if (shouldUseAdaptiveAlignment) {
          this.scrollToRightAlignment();
        } else {
          this.scrollToQuote(nextIndex);
        }
      }

      setTimeout(() => {
        this.isAnimating = false;
      }, parseInt(this.animationDuration));
    }

    goToPrevious() {
      if (this.isAnimating || this.currentIndex <= 0) return;

      this.isAnimating = true;

      // Clear adaptive alignment flag to allow proper scroll tracking
      this.isAdaptiveAligning = false;

      // If we're currently at the last index (100% state), we need to go back to normal navigation
      if (this.currentIndex === this.totalQuotes - 1) {
        // Check if we're in adaptive alignment state
        const isAdaptiveState = this.isAtScrollEnd();
        if (isAdaptiveState) {
          // When in adaptive state, go back 2 steps to ensure visual movement
          // or to the second-to-last quote to guarantee a different scroll position
          const targetIndex = Math.max(0, this.currentIndex - 2);
          this.currentIndex = targetIndex;

          this.scrollToQuote(this.currentIndex);
        } else {
          // Just go back normally
          this.currentIndex--;
          this.scrollToQuote(this.currentIndex);
        }
      } else {
        // Normal previous navigation
        this.currentIndex--;
        this.scrollToQuote(this.currentIndex);
      }

      setTimeout(() => {
        this.isAnimating = false;
      }, parseInt(this.animationDuration));
    }

    shouldUseAdaptiveAlignment(targetIndex) {
      // Calculate total width from target quote to the end
      let totalRemainingWidth = 0;

      for (let i = targetIndex; i < this.totalQuotes; i++) {
        totalRemainingWidth += this.quoteData[i].width;
        if (i < this.totalQuotes - 1) {
          totalRemainingWidth += this.gap; // Add gap between items
        }
      }

      // If remaining content is less than container width + buffer, use right alignment
      // Buffer of 40px ensures we don't leave tiny gaps at the end
      const buffer = 40;
      const shouldAdapt = totalRemainingWidth <= this.containerWidth + buffer;

      return shouldAdapt;
    }

    scrollToQuote(index) {
      if (index < 0 || index >= this.totalQuotes) return;

      this.currentIndex = index;
      const targetQuote = this.quoteData[index];
      const scrollLeft = targetQuote.offsetLeft;

      this.container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });

      // Update UI immediately for responsive feel
      this.updateNavigationState();

      // Update progress after a slight delay to let scroll animation start
      setTimeout(() => {
        this.updateProgress();
      }, 50);
    }

    scrollToRightAlignment() {
      // Calculate the scroll position to align the last quote to the right edge
      const lastQuote = this.quoteData[this.totalQuotes - 1];
      const totalContentWidth = lastQuote.offsetLeft + lastQuote.width;
      const scrollLeft = totalContentWidth - this.containerWidth;

      // When using right alignment, we're always showing the last quote
      this.currentIndex = this.totalQuotes - 1;

      // Flag to prevent scroll events from overriding our index during adaptive alignment
      this.isAdaptiveAligning = true;

      this.container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });

      // Update UI immediately for responsive feel
      this.updateNavigationState();

      // Update progress after a slight delay to let scroll animation start
      setTimeout(() => {
        this.updateProgress();
        // Clear the flag after animation completes
        setTimeout(() => {
          this.isAdaptiveAligning = false;
        }, parseInt(this.animationDuration));
      }, 50);
    }

    findNextNavigationTarget() {
      // Start looking from the next quote after current index
      for (let i = this.currentIndex + 1; i < this.totalQuotes; i++) {
        // This is the next quote in sequence, so it's our target
        return i;
      }

      // If we're already at the last quote, check if we can scroll to right-align the last content
      return -1;
    }

    findLastVisibleQuoteIndex(scrollLeft) {
      // Find which quote index corresponds to this scroll position
      for (let i = this.totalQuotes - 1; i >= 0; i--) {
        if (this.quoteData[i].offsetLeft <= scrollLeft + 10) {
          // 10px tolerance
          return i;
        }
      }
      return this.totalQuotes - 1;
    }

    updateCurrentIndexFromScroll() {
      // Don't update index if we're in the middle of adaptive alignment
      if (this.isAdaptiveAligning) {
        return;
      }

      const scrollLeft = this.container.scrollLeft;

      // Find the leftmost quote that's prominently visible
      // (at least 50% visible or the first quote that starts within the viewport)
      for (let i = 0; i < this.totalQuotes; i++) {
        const quote = this.quoteData[i];
        const quoteStart = quote.offsetLeft;
        const quoteEnd = quote.offsetLeft + quote.width;
        const viewportEnd = scrollLeft + this.containerWidth;

        // Calculate how much of this quote is visible
        const visibleStart = Math.max(quoteStart, scrollLeft);
        const visibleEnd = Math.min(quoteEnd, viewportEnd);
        const visibleWidth = Math.max(0, visibleEnd - visibleStart);
        const visibilityPercent = visibleWidth / quote.width;

        // If this quote is at least 30% visible, or it's the first quote in viewport
        if (
          visibilityPercent >= 0.3 ||
          (quoteStart >= scrollLeft && quoteStart < viewportEnd)
        ) {
          if (this.currentIndex !== i) {
            this.currentIndex = i;
            this.updateNavigationState();
            this.updateProgress();
          }
          break;
        }
      }
    }

    animateButtonClick(button) {
      button.style.transform = "scale(0.95)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 200);
    }

    updateNavigationState() {
      // Update previous button state
      this.prevBtn.disabled = this.currentIndex <= 0;
      this.updateButtonStyle(this.prevBtn);

      // For next button, check if we're at the end (either by index or scroll position)
      const isAtEnd =
        this.currentIndex >= this.totalQuotes - 1 || this.isAtScrollEnd();
      this.nextBtn.disabled = isAtEnd;
      this.updateButtonStyle(this.nextBtn);
    }

    updateButtonStyle(button) {
      const svg = button.querySelector("path");

      if (button.disabled) {
        // Inactive state: transparent background, blue border and icon
        button.style.background = "transparent";
        button.style.cursor = "not-allowed";
        button.style.opacity = "0.5";
        if (svg) svg.setAttribute("stroke", "#146AFF");
      } else {
        // Active state: blue background, white icon
        button.style.background = "#146AFF";
        button.style.cursor = "pointer";
        button.style.opacity = "1";
        if (svg) svg.setAttribute("stroke", "white");
      }
    }

    isAtScrollEnd() {
      const scrollLeft = this.container.scrollLeft;
      const maxScroll = this.container.scrollWidth - this.container.clientWidth;
      return Math.abs(scrollLeft - maxScroll) < 5; // 5px tolerance
    }

    updateProgress() {
      // Calculate progress based on current quote index vs total quotes
      // This gives more predictable and smooth progress indication
      const progress =
        this.totalQuotes > 1
          ? (this.currentIndex / (this.totalQuotes - 1)) * 100
          : 0;

      this.progressFill.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }

    // Public method to check if slider should be enabled
    shouldEnable() {
      return this.container.scrollWidth > this.container.clientWidth;
    }

    // Public method to disable slider
    disable() {
      this.navContainer.style.display = "none";
      this.container.style.overflowX = "visible";
    }

    // Public method to enable slider
    enable() {
      this.navContainer.style.display = "flex";
      this.container.style.overflowX = "auto";
    }
  }

  // Find all quote slider containers and initialize them
  const containers = document.querySelectorAll(".quotes-slider-container");
  const sliders = [];

  containers.forEach((container) => {
    const slider = new QuotesSlider(container);

    // Check if slider should be enabled based on content width
    if (!slider.shouldEnable()) {
      slider.disable();
    }

    sliders.push(slider);
  });

  // Expose sliders globally for debugging/manual control
  window.quotesSliders = sliders;

  return sliders;
}

export default initQuotesSlider;
