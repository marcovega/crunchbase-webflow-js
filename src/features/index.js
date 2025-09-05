/**
 * Features Index
 *
 * Central place to manage all features.
 * Import and export your features here for easier management.
 */

import initDemoFeature from "./demo-feature.js";
import logoSlider from "./logo-slider.js";
import initQuotesSlider from "./quotes-slider.js";
import initStarRating from "./star-rating.js";
import initComparisonTableToggler from "./comparison-table-toggler.js";
import initTabsSelect from "./tabs-select.js";
import initTabbedCards from "./tabbed-cards.js";
import initMarketoForms from "./marketo-forms.js";
import initPricingCardToggler from "./pricing-card-toggler.js";

// Export all features
export {
  initDemoFeature,
  logoSlider,
  initQuotesSlider,
  initStarRating,
  initComparisonTableToggler,
  initTabsSelect,
  initTabbedCards,
  initMarketoForms,
  initPricingCardToggler,
};

// Feature registry for easy enable/disable
export const features = {
  demo: initDemoFeature,
  logoSlider,
  quotesSlider: initQuotesSlider,
  starRating: initStarRating,
  comparisonTableToggler: initComparisonTableToggler,
  tabsSelect: initTabsSelect,
  tabbedCards: initTabbedCards,
  marketoForms: initMarketoForms,
  pricingCardToggler: initPricingCardToggler,
  // Add more features here as you create them
  // myFeature: initMyFeature,
};

/**
 * Initialize all enabled features
 * @param {string[]} enabledFeatures - Array of feature names to enable
 */
export function initFeatures(enabledFeatures = ["demo"]) {
  console.log("🎯 Initializing features:", enabledFeatures);

  enabledFeatures.forEach((featureName) => {
    if (features[featureName]) {
      try {
        features[featureName]();
      } catch (error) {
        console.error(`❌ Error initializing feature '${featureName}':`, error);
      }
    } else {
      console.warn(`⚠️ Feature '${featureName}' not found`);
    }
  });
}
