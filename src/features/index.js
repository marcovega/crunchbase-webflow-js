/**
 * Features Index
 *
 * Central place to manage all features.
 * Import and export your features here for easier management.
 */

import initDemoFeature from "./demo-feature.js";

// Export all features
export { initDemoFeature };

// Feature registry for easy enable/disable
export const features = {
  demo: initDemoFeature,
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
