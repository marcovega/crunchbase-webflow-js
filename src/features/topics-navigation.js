/**
 * Topics Navigation Feature
 *
 * Populates dropdown selects from Webflow collection lists
 * and enables navigation to selected topics.
 *
 * Usage:
 * - Add a <select> element with class "topics-bar-select"
 * - Place a Webflow collection list (.w-dyn-list) nearby with topic links
 * - The feature will populate the select and enable navigation
 */

export function initTopicsNavigation() {
  console.log("🚀 Topics Navigation: Starting...");

  // Find all topic selects
  const topicSelects = document.querySelectorAll(".topics-bar-select");

  if (topicSelects.length === 0) {
    console.log("ℹ️ Topics Navigation: No .topics-bar-select elements found");
    return;
  }

  topicSelects.forEach((select) => {
    try {
      // Find the closest .w-dyn-list relative to this select
      const dynList = select
        .closest("*")
        ?.parentElement?.querySelector(".w-dyn-list") ||
        document.querySelector(".w-dyn-list");

      if (!dynList) {
        console.warn("⚠️ Topics Navigation: No .w-dyn-list found near select");
        return;
      }

      // Get all topic links from the collection list
      const topicLinks = dynList.querySelectorAll(".w-dyn-item a[href]");

      if (topicLinks.length === 0) {
        console.warn("⚠️ Topics Navigation: No topic links found in collection list");
        return;
      }

      // Add a default placeholder option
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select a topic...";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      select.appendChild(defaultOption);

      // Populate the select with options from the collection list
      topicLinks.forEach((link) => {
        const option = document.createElement("option");
        option.value = link.getAttribute("href");
        option.textContent = link.textContent.trim();
        select.appendChild(option);
      });

      console.log(`✅ Topics Navigation: Populated select with ${topicLinks.length} topics`);

      // Add change event listener for navigation
      select.addEventListener("change", (e) => {
        const selectedUrl = e.target.value;
        if (selectedUrl) {
          console.log(`🔗 Topics Navigation: Navigating to ${selectedUrl}`);
          window.location.href = selectedUrl;
        }
      });

      // Remove the collection list after populating
      dynList.remove();
      console.log("🗑️ Topics Navigation: Removed source collection list");

    } catch (error) {
      console.error("❌ Topics Navigation: Error processing select", error);
    }
  });

  console.log("✅ Topics Navigation: Complete");
}

export default initTopicsNavigation;

