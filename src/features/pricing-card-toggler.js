/**
 * Pricing Card Toggler Feature
 *
 * Toggles between annual and monthly pricing options with full accessibility support.
 * Each pricing card operates independently with proper ARIA attributes and keyboard navigation.
 */

export function initPricingCardToggler() {
  const pricingCardDetails = document.querySelectorAll(".pricing-card-details");

  if (pricingCardDetails.length === 0) {
    return;
  }

  console.log(
    `📊 Pricing Card Toggler: Found ${pricingCardDetails.length} pricing card(s)`
  );

  pricingCardDetails.forEach((cardDetails, index) => {
    new PricingCard(cardDetails, index);
  });
}

class PricingCard {
  constructor(cardDetails, index) {
    this.cardDetails = cardDetails;
    this.index = index;
    this.cardId = `pricing-card-${index}`;

    // Cache DOM elements
    this.elements = this.getElements();
    if (!this.elements) return;

    this.setupAccessibility();
    this.setupEventListeners();
    this.setActiveState("annual"); // Default to annual
  }

  getElements() {
    const elements = {
      toggle: this.cardDetails.querySelector(".pricing-card-toggle"),
      annualToggle: this.cardDetails.querySelector(".pricing-card-toggle-dark"),
      monthlyToggle: this.cardDetails.querySelector(
        ".pricing-card-toggle-light"
      ),
      annualLink: this.cardDetails.querySelector(
        ".pricing-card-toggle-dark-text"
      ),
      monthlyLink: this.cardDetails.querySelector(
        ".pricing-card-toggle-light-text"
      ),
      pricingOptions: this.cardDetails.querySelectorAll(".pricing-card-option"),
    };

    // Extract specific options
    elements.annualOption = elements.pricingOptions[0];
    elements.monthlyOption = elements.pricingOptions[1];

    // Validate required elements
    const required = [
      "toggle",
      "annualToggle",
      "monthlyToggle",
      "annualLink",
      "monthlyLink",
    ];
    const missing = required.filter((key) => !elements[key]);

    if (missing.length > 0) {
      console.warn(
        `⚠️ Pricing Card Toggler: Missing elements in card ${this.index + 1}:`,
        missing
      );
      return null;
    }

    return elements;
  }

  setupAccessibility() {
    const {
      toggle,
      annualToggle,
      monthlyToggle,
      annualLink,
      monthlyLink,
      annualOption,
      monthlyOption,
    } = this.elements;
    const ids = this.generateIds();

    // Main toggle container
    toggle.setAttribute("role", "tablist");
    toggle.setAttribute("aria-label", "Pricing period selection");
    toggle.id = ids.toggle;

    // Annual toggle
    annualToggle.setAttribute("role", "tab");
    annualToggle.id = ids.annual;
    annualToggle.setAttribute("aria-selected", "true");
    annualToggle.setAttribute("aria-controls", ids.annualOption);
    annualToggle.setAttribute("tabindex", "0");

    // Monthly toggle
    monthlyToggle.setAttribute("role", "tab");
    monthlyToggle.id = ids.monthly;
    monthlyToggle.setAttribute("aria-selected", "false");
    monthlyToggle.setAttribute("aria-controls", ids.monthlyOption);
    monthlyToggle.setAttribute("tabindex", "-1");

    // Links - remove from tab order since parent handles it
    annualLink.setAttribute("tabindex", "-1");
    monthlyLink.setAttribute("tabindex", "-1");
    annualLink.setAttribute("aria-hidden", "true");
    monthlyLink.setAttribute("aria-hidden", "true");

    // Pricing options (if they exist)
    if (annualOption) {
      annualOption.setAttribute("role", "tabpanel");
      annualOption.id = ids.annualOption;
      annualOption.setAttribute("aria-labelledby", ids.annual);
      annualOption.setAttribute("aria-hidden", "false");
    }

    if (monthlyOption) {
      monthlyOption.setAttribute("role", "tabpanel");
      monthlyOption.id = ids.monthlyOption;
      monthlyOption.setAttribute("aria-labelledby", ids.monthly);
      monthlyOption.setAttribute("aria-hidden", "true");
    }
  }

  generateIds() {
    return {
      toggle: `${this.cardId}-toggle`,
      annual: `${this.cardId}-annual`,
      monthly: `${this.cardId}-monthly`,
      annualOption: `${this.cardId}-annual-option`,
      monthlyOption: `${this.cardId}-monthly-option`,
    };
  }

  setupEventListeners() {
    const { annualLink, monthlyLink, annualToggle, monthlyToggle } =
      this.elements;

    // Click handlers with bound methods
    annualToggle.addEventListener("click", (e) => {
      e.preventDefault();
      this.setActiveState("annual");
    });

    monthlyToggle.addEventListener("click", (e) => {
      e.preventDefault();
      this.setActiveState("monthly");
    });

    // Keyboard navigation with bound method
    const keyHandler = (e) => this.handleKeyNavigation(e);
    annualToggle.addEventListener("keydown", keyHandler);
    monthlyToggle.addEventListener("keydown", keyHandler);

    // Prevent default link behavior
    annualLink.addEventListener("click", (e) => e.preventDefault());
    monthlyLink.addEventListener("click", (e) => e.preventDefault());
  }

  handleKeyNavigation(event) {
    const { key, target } = event;
    const { annualToggle, monthlyToggle } = this.elements;

    switch (key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        if (target === monthlyToggle) {
          annualToggle.focus();
          this.setActiveState("annual");
        }
        break;

      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        if (target === annualToggle) {
          monthlyToggle.focus();
          this.setActiveState("monthly");
        }
        break;

      case "Enter":
      case " ":
        event.preventDefault();
        {
          const isAnnual = target === annualToggle;
          this.setActiveState(isAnnual ? "annual" : "monthly");
        }
        break;

      case "Home":
        event.preventDefault();
        annualToggle.focus();
        this.setActiveState("annual");
        break;

      case "End":
        event.preventDefault();
        monthlyToggle.focus();
        this.setActiveState("monthly");
        break;
    }
  }

  setActiveState(activeType) {
    const isAnnual = activeType === "annual";
    const { annualToggle, monthlyToggle } = this.elements;

    // Update ARIA states
    annualToggle.setAttribute("aria-selected", isAnnual.toString());
    monthlyToggle.setAttribute("aria-selected", (!isAnnual).toString());

    // Update tabindex for keyboard navigation
    annualToggle.setAttribute("tabindex", isAnnual ? "0" : "-1");
    monthlyToggle.setAttribute("tabindex", isAnnual ? "-1" : "0");

    // Update visual classes using classList
    this.updateToggleClasses(isAnnual);

    // Update text colors
    this.updateTextColors(isAnnual);

    // Update pricing options visibility
    this.updateOptionVisibility(isAnnual);

    // Announce change to screen readers
    announceToScreenReader(
      `${isAnnual ? "Annual" : "Monthly"} pricing selected`
    );
  }

  updateToggleClasses(isAnnual) {
    const { annualToggle, monthlyToggle } = this.elements;

    annualToggle.classList.toggle("pricing-card-toggle-dark", isAnnual);
    annualToggle.classList.toggle("pricing-card-toggle-light", !isAnnual);
    monthlyToggle.classList.toggle("pricing-card-toggle-dark", !isAnnual);
    monthlyToggle.classList.toggle("pricing-card-toggle-light", isAnnual);
  }

  updateTextColors(isAnnual) {
    const { annualLink, monthlyLink } = this.elements;
    const activeColor = "white";
    const inactiveColor = "var(--_colors---primary--dark-blue)";

    annualLink.style.color = isAnnual ? activeColor : inactiveColor;
    monthlyLink.style.color = isAnnual ? inactiveColor : activeColor;
  }

  updateOptionVisibility(isAnnual) {
    const { annualOption, monthlyOption } = this.elements;

    if (annualOption) {
      annualOption.setAttribute("aria-hidden", (!isAnnual).toString());
      annualOption.style.display = isAnnual ? "flex" : "none";
    }

    if (monthlyOption) {
      monthlyOption.setAttribute("aria-hidden", isAnnual.toString());
      monthlyOption.style.display = isAnnual ? "none" : "flex";
    }
  }
}

/**
 * Announce changes to screen readers
 */
function announceToScreenReader(message) {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.style.position = "absolute";
  announcement.style.left = "-10000px";
  announcement.style.width = "1px";
  announcement.style.height = "1px";
  announcement.style.overflow = "hidden";

  document.body.appendChild(announcement);
  announcement.textContent = message;

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

export default initPricingCardToggler;
