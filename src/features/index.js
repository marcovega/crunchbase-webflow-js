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
import initRelatedArticlesSlider from "./related-articles-slider.js";
import initReadingTimeEstimate from "./reading-time-estimate.js";
import initTableOfContents from "./table-of-contents.js";
import initHeroTabs from "./hero-tabs.js";
import initCaseStudyFilter from "./case-study-filter.js";
import initPostCardAttribution from "./post-card-attribution.js";
import initTopicsNavigation from "./topics-navigation.js";
import initSearchPopup from "./search-popup.js";
import initNavHeight from "./nav-height.js";

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
  initRelatedArticlesSlider,
  initReadingTimeEstimate,
  initTableOfContents,
  initHeroTabs,
  initCaseStudyFilter,
  initPostCardAttribution,
  initTopicsNavigation,
  initSearchPopup,
  initNavHeight,
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
  relatedArticlesSlider: initRelatedArticlesSlider,
  readingTimeEstimate: initReadingTimeEstimate,
  tableOfContents: initTableOfContents,
  heroTabs: initHeroTabs,
  caseStudyFilter: initCaseStudyFilter,
  postCardAttribution: initPostCardAttribution,
  topicsNavigation: initTopicsNavigation,
  searchPopup: initSearchPopup,
  navHeight: initNavHeight,
  // Add more features here as you create them
  // myFeature: initMyFeature,
};

/**
 * Initialize all enabled features
 * @param {string[]} enabledFeatures - Array of feature names to enable
 */
export function initFeatures(enabledFeatures = ["demo"]) {
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
