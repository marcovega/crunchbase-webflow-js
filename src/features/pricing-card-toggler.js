/**
 * Pricing Card Toggler Feature
 *
 * Toggles between annual and monthly pricing options with full accessibility support.
 * Each pricing card operates independently with proper ARIA attributes and keyboard navigation.
 */

export function initPricingCardToggler() {
  console.log("🚀 Pricing Card Toggler: Starting...");

  // Find all pricing card details (the actual containers with toggles)
  const pricingCardDetails = document.querySelectorAll(".pricing-card-details");

  if (pricingCardDetails.length === 0) {
    console.log("ℹ️ Pricing Card Toggler: No pricing card details found");
    return;
  }

  console.log(
    `📊 Pricing Card Toggler: Found ${pricingCardDetails.length} pricing card(s)`
  );

  // Initialize each pricing card independently
  pricingCardDetails.forEach((cardDetails, index) => {
    initSinglePricingCard(cardDetails, index);
  });

  console.log("✅ Pricing Card Toggler: Complete");
}

/**
 * Initialize a single pricing card with accessibility features
 * @param {HTMLElement} cardDetails - The pricing card details element
 * @param {number} index - Card index for unique IDs
 */
function initSinglePricingCard(cardDetails, index) {
  const toggle = cardDetails.querySelector(".pricing-card-toggle");
  const annualToggle = cardDetails.querySelector(".pricing-card-toggle-dark");
  const monthlyToggle = cardDetails.querySelector(".pricing-card-toggle-light");
  const annualLink = cardDetails.querySelector(
    ".pricing-card-toggle-dark-text"
  );
  const monthlyLink = cardDetails.querySelector(
    ".pricing-card-toggle-light-text"
  );
  const pricingOptions = cardDetails.querySelectorAll(".pricing-card-option");
  const annualOption = pricingOptions[0]; // First option is annual
  const monthlyOption = pricingOptions[1]; // Second option is monthly

  if (
    !toggle ||
    !annualToggle ||
    !monthlyToggle ||
    !annualLink ||
    !monthlyLink
  ) {
    console.warn(
      `⚠️ Pricing Card Toggler: Missing toggle elements in card ${index + 1}`
    );
    return;
  }

  // Generate unique IDs for this card
  const cardId = `pricing-card-${index}`;
  const toggleId = `${cardId}-toggle`;
  const annualId = `${cardId}-annual`;
  const monthlyId = `${cardId}-monthly`;
  const annualOptionId = `${cardId}-annual-option`;
  const monthlyOptionId = `${cardId}-monthly-option`;

  // Set up ARIA attributes and roles
  setupAccessibility(
    toggle,
    annualToggle,
    monthlyToggle,
    annualLink,
    monthlyLink,
    annualOption,
    monthlyOption,
    toggleId,
    annualId,
    monthlyId,
    annualOptionId,
    monthlyOptionId
  );

  // Set initial state (annual active by default)
  setActiveState(
    annualToggle,
    monthlyToggle,
    annualLink,
    monthlyLink,
    annualOption,
    monthlyOption,
    "annual"
  );

  // Add event listeners
  setupEventListeners(
    annualLink,
    monthlyLink,
    annualToggle,
    monthlyToggle,
    annualOption,
    monthlyOption
  );
}

/**
 * Set up accessibility attributes and roles
 */
function setupAccessibility(
  toggle,
  annualToggle,
  monthlyToggle,
  annualLink,
  monthlyLink,
  annualOption,
  monthlyOption,
  toggleId,
  annualId,
  monthlyId,
  annualOptionId,
  monthlyOptionId
) {
  // Main toggle container
  toggle.setAttribute("role", "tablist");
  toggle.setAttribute("aria-label", "Pricing period selection");
  toggle.id = toggleId;

  // Annual toggle
  annualToggle.setAttribute("role", "tab");
  annualToggle.id = annualId;
  annualToggle.setAttribute("aria-selected", "true");
  annualToggle.setAttribute("aria-controls", annualOptionId);
  annualToggle.setAttribute("tabindex", "0");

  // Monthly toggle
  monthlyToggle.setAttribute("role", "tab");
  monthlyToggle.id = monthlyId;
  monthlyToggle.setAttribute("aria-selected", "false");
  monthlyToggle.setAttribute("aria-controls", monthlyOptionId);
  monthlyToggle.setAttribute("tabindex", "-1");

  // Links - remove from tab order since parent handles it
  annualLink.setAttribute("tabindex", "-1");
  monthlyLink.setAttribute("tabindex", "-1");
  annualLink.setAttribute("aria-hidden", "true");
  monthlyLink.setAttribute("aria-hidden", "true");

  // Pricing options (if they exist)
  if (annualOption) {
    annualOption.setAttribute("role", "tabpanel");
    annualOption.id = annualOptionId;
    annualOption.setAttribute("aria-labelledby", annualId);
    annualOption.setAttribute("aria-hidden", "false");
  }

  if (monthlyOption) {
    monthlyOption.setAttribute("role", "tabpanel");
    monthlyOption.id = monthlyOptionId;
    monthlyOption.setAttribute("aria-labelledby", monthlyId);
    monthlyOption.setAttribute("aria-hidden", "true");
  }
}

/**
 * Set up event listeners for toggle functionality
 */
function setupEventListeners(
  annualLink,
  monthlyLink,
  annualToggle,
  monthlyToggle,
  annualOption,
  monthlyOption
) {
  // Click handlers
  annualToggle.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveState(
      annualToggle,
      monthlyToggle,
      annualLink,
      monthlyLink,
      annualOption,
      monthlyOption,
      "annual"
    );
  });

  monthlyToggle.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveState(
      annualToggle,
      monthlyToggle,
      annualLink,
      monthlyLink,
      annualOption,
      monthlyOption,
      "monthly"
    );
  });

  // Keyboard navigation
  annualToggle.addEventListener("keydown", (e) => {
    handleKeyNavigation(
      e,
      annualToggle,
      monthlyToggle,
      annualLink,
      monthlyLink,
      annualOption,
      monthlyOption
    );
  });

  monthlyToggle.addEventListener("keydown", (e) => {
    handleKeyNavigation(
      e,
      annualToggle,
      monthlyToggle,
      annualLink,
      monthlyLink,
      annualOption,
      monthlyOption
    );
  });

  // Prevent default link behavior
  annualLink.addEventListener("click", (e) => e.preventDefault());
  monthlyLink.addEventListener("click", (e) => e.preventDefault());
}

/**
 * Handle keyboard navigation for accessibility
 */
function handleKeyNavigation(
  event,
  annualToggle,
  monthlyToggle,
  annualLink,
  monthlyLink,
  annualOption,
  monthlyOption
) {
  const { key, target } = event;

  switch (key) {
    case "ArrowLeft":
    case "ArrowUp":
      event.preventDefault();
      if (target === monthlyToggle) {
        annualToggle.focus();
        setActiveState(
          annualToggle,
          monthlyToggle,
          annualLink,
          monthlyLink,
          annualOption,
          monthlyOption,
          "annual"
        );
      }
      break;

    case "ArrowRight":
    case "ArrowDown":
      event.preventDefault();
      if (target === annualToggle) {
        monthlyToggle.focus();
        setActiveState(
          annualToggle,
          monthlyToggle,
          annualLink,
          monthlyLink,
          annualOption,
          monthlyOption,
          "monthly"
        );
      }
      break;

    case "Enter":
    case " ":
      event.preventDefault();
      if (target === annualToggle) {
        setActiveState(
          annualToggle,
          monthlyToggle,
          annualLink,
          monthlyLink,
          annualOption,
          monthlyOption,
          "annual"
        );
      } else if (target === monthlyToggle) {
        setActiveState(
          annualToggle,
          monthlyToggle,
          annualLink,
          monthlyLink,
          annualOption,
          monthlyOption,
          "monthly"
        );
      }
      break;

    case "Home":
      event.preventDefault();
      annualToggle.focus();
      setActiveState(
        annualToggle,
        monthlyToggle,
        annualLink,
        monthlyLink,
        annualOption,
        monthlyOption,
        "annual"
      );
      break;

    case "End":
      event.preventDefault();
      monthlyToggle.focus();
      setActiveState(
        annualToggle,
        monthlyToggle,
        annualLink,
        monthlyLink,
        annualOption,
        monthlyOption,
        "monthly"
      );
      break;
  }
}

/**
 * Set the active state for annual or monthly pricing
 */
function setActiveState(
  annualToggle,
  monthlyToggle,
  annualLink,
  monthlyLink,
  annualOption,
  monthlyOption,
  activeType
) {
  const isAnnual = activeType === "annual";

  // Update toggle states
  annualToggle.setAttribute("aria-selected", isAnnual ? "true" : "false");
  monthlyToggle.setAttribute("aria-selected", isAnnual ? "false" : "true");

  // Update tabindex for keyboard navigation
  annualToggle.setAttribute("tabindex", isAnnual ? "0" : "-1");
  monthlyToggle.setAttribute("tabindex", isAnnual ? "-1" : "0");

  // Update visual classes (dark = active, light = inactive)
  // Note: The classes are already in the HTML, we need to swap them
  if (isAnnual) {
    // Annual is active - ensure annual has dark class, monthly has light class
    if (!annualToggle.classList.contains("pricing-card-toggle-dark")) {
      annualToggle.className = annualToggle.className.replace(
        "pricing-card-toggle-light",
        "pricing-card-toggle-dark"
      );
    }
    if (!monthlyToggle.classList.contains("pricing-card-toggle-light")) {
      monthlyToggle.className = monthlyToggle.className.replace(
        "pricing-card-toggle-dark",
        "pricing-card-toggle-light"
      );
    }
  } else {
    // Monthly is active - ensure monthly has dark class, annual has light class
    if (!monthlyToggle.classList.contains("pricing-card-toggle-dark")) {
      monthlyToggle.className = monthlyToggle.className.replace(
        "pricing-card-toggle-light",
        "pricing-card-toggle-dark"
      );
    }
    if (!annualToggle.classList.contains("pricing-card-toggle-light")) {
      annualToggle.className = annualToggle.className.replace(
        "pricing-card-toggle-dark",
        "pricing-card-toggle-light"
      );
    }
  }

  // Update text colors for readability
  if (isAnnual) {
    // Annual is active (dark background) - white text
    annualLink.style.color = "white";
    // Monthly is inactive (light background) - dark blue text
    monthlyLink.style.color = "var(--_colors---primary--dark-blue)";
  } else {
    // Monthly is active (dark background) - white text
    monthlyLink.style.color = "white";
    // Annual is inactive (light background) - dark blue text
    annualLink.style.color = "var(--_colors---primary--dark-blue)";
  }

  // Update pricing options visibility
  if (annualOption) {
    annualOption.setAttribute("aria-hidden", isAnnual ? "false" : "true");
    annualOption.style.display = isAnnual ? "flex" : "none";
  }

  if (monthlyOption) {
    monthlyOption.setAttribute("aria-hidden", isAnnual ? "true" : "false");
    // Override the CSS rule that hides :last-of-type when showing monthly
    monthlyOption.style.display = isAnnual ? "none" : "flex";
  }

  // Announce change to screen readers
  const announcement = `${isAnnual ? "Annual" : "Monthly"} pricing selected`;
  announceToScreenReader(announcement);
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
