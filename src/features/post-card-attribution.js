/**
 * Post Card Attribution
 *
 * Conditionally shows/hides author metadata separators based on
 * what data is actually present in the post card.
 *
 * Rules:
 * - Name: Always visible
 * - Comma + Position: Only show if position has content
 * - "of" + Company: Only show if company has content
 */

export function initPostCardAttribution() {
  console.log("🎴 Post Card Attribution: Starting...");

  // Find all post card attribution containers
  const attributionContainers = document.querySelectorAll(
    ".post-card-attribution"
  );

  if (attributionContainers.length === 0) {
    console.log("ℹ️ Post Card Attribution: No attribution containers found");
    return;
  }

  console.log(
    `📝 Post Card Attribution: Found ${attributionContainers.length} container(s)`
  );

  attributionContainers.forEach((container, index) => {
    // Get all the elements
    const positionElement = container.querySelector("[post-card-author-pos]");
    const companyElement = container.querySelector(
      "[post-card-author-company]"
    );
    const commaSeparator = container.querySelector("[post-card-author-sep]");
    const ofSeparator = container.querySelector("[post-card-author-of]");

    // Check if position has content (trim whitespace)
    const hasPosition =
      positionElement && positionElement.textContent.trim() !== "";
    // Check if company has content (trim whitespace)
    const hasCompany =
      companyElement && companyElement.textContent.trim() !== "";

    // Hide comma and position if position is empty
    if (!hasPosition) {
      if (commaSeparator) commaSeparator.style.display = "none";
      if (positionElement) positionElement.style.display = "none";
    }

    // Hide "of" separator and company if company is empty
    if (!hasCompany) {
      if (ofSeparator) ofSeparator.style.display = "none";
      if (companyElement) companyElement.style.display = "none";
    }

    console.log(
      `  ${index + 1}. Position: ${hasPosition ? "✓" : "✗"}, Company: ${hasCompany ? "✓" : "✗"}`
    );
  });

  console.log("✅ Post Card Attribution: Complete");
}

export default initPostCardAttribution;
