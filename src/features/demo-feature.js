/**
 * Demo Feature - Black Border
 *
 * This is an example feature that demonstrates how to structure
 * functionality for Webflow development.
 *
 * Features should be:
 * - Self-contained
 * - Easy to enable/disable
 * - Well documented
 */

export function initDemoFeature() {
  // Add a black 5px border to the body element
  document.body.style.border = "5px solid navy";

  // Optional: Add some additional styling for demo purposes
  document.body.style.margin = "0";
  document.body.style.boxSizing = "border-box";
}

// Export default for easy importing
export default initDemoFeature;
