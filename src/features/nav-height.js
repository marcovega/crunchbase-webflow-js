/**
 * Navbar Height CSS Variable Feature
 *
 * Sets a CSS variable --nav-height on the body element
 * with the height of the navbar, updated responsively on resize.
 */

export function initNavHeight() {
  console.log("🚀 Nav Height: Starting...");

  const navbar = document.querySelector(".navbar.w-nav");

  if (!navbar) {
    console.warn("⚠️ Nav Height: .navbar.w-nav not found");
    return;
  }

  // Function to update the CSS variable
  function updateNavHeight() {
    const height = navbar.clientHeight;
    document.body.style.setProperty("--nav-height", `${height}px`);
  }

  // Set initial height
  updateNavHeight();

  // Update on resize
  window.addEventListener("resize", updateNavHeight);

  console.log("✅ Nav Height: Complete");
}

export default initNavHeight;
