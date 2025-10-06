/**
 * Table of Contents Feature
 *
 * Automatically generates a table of contents from h2 headings in blog content.
 * Includes smooth scrolling and active link highlighting based on scroll position.
 *
 * Features:
 * - Dynamically creates TOC from h2 headings with IDs
 * - Smooth scrolling to sections on click
 * - Active link highlighting based on scroll position
 * - Optimized scroll handling with requestAnimationFrame
 */

export function initTableOfContents() {
  // Wait for DOM to be ready
  const initializeFeature = () => {
    // Find all elements with data-toc-content attribute
    const contentElements = document.querySelectorAll("[data-toc-content]");

    if (contentElements.length === 0) {
      return;
    }

    console.log(
      `📚 Table of Contents: Found ${contentElements.length} content element(s)`
    );

    // Initialize TOC for each content element
    contentElements.forEach((contentElement) => {
      const tocId = contentElement.getAttribute("data-toc-content");
      const tocContainer = document.querySelector(
        `[data-toc-target="${tocId}"]`
      );

      if (!tocContainer) {
        console.warn(`📚 Table of Contents: No target found for "${tocId}"`);
        return;
      }

      // Selector for all h2 headings
      const headingSelector = "h2";
      const headings = contentElement.querySelectorAll(headingSelector);

      if (headings.length === 0) {
        return;
      }

      let currentActiveElement = null;
      let isUpdating = false;

      // Create TOC markup dynamically
      function createTableOfContents() {
        const ul = document.createElement("ul");

        headings.forEach((heading, index) => {
          const li = document.createElement("li");
          const a = document.createElement("a");

          const headingText = heading.textContent.trim();
          let headingId = heading.getAttribute("id");

          // Auto-generate ID if heading doesn't have one
          if (!headingId) {
            headingId = headingText
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")
              .replace(/-+/g, "-")
              .trim();
            heading.setAttribute("id", headingId);
          }

          a.href = `#${headingId}`;
          a.textContent = headingText;
          a.classList.add("toc-link");
          a.dataset.tocId = tocId;

          if (index === 0) {
            a.classList.add("active");
            currentActiveElement = a;
          }

          li.appendChild(a);
          ul.appendChild(li);
        });

        tocContainer.innerHTML = "";
        tocContainer.appendChild(ul);
      }

      createTableOfContents();
      const tocLinks = tocContainer.querySelectorAll(".toc-link");

      function updateActiveLink(newActiveElement) {
        if (isUpdating || currentActiveElement === newActiveElement) {
          return;
        }

        isUpdating = true;

        requestAnimationFrame(() => {
          if (currentActiveElement) {
            currentActiveElement.classList.remove("active");
          }

          if (newActiveElement) {
            newActiveElement.classList.add("active");
          }

          currentActiveElement = newActiveElement;
          isUpdating = false;
        });
      }

      // Click handlers
      tocLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      // Custom scroll handler that better handles reverse scrolling
      let ticking = false;
      function handleScroll() {
        if (ticking) return;

        ticking = true;
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          let activeHeading = null;

          // Check each heading from bottom to top (for reverse scroll behavior)
          for (let i = headings.length - 1; i >= 0; i--) {
            const heading = headings[i];
            const headingTop = heading.offsetTop;

            // If we're past the top of this heading, it should be active
            if (scrollY >= headingTop - 100) {
              activeHeading = heading;
              break;
            }
          }

          // If no heading is active and we're above the first heading, activate first
          if (!activeHeading && headings.length > 0) {
            const firstHeading = headings[0];
            if (scrollY < firstHeading.offsetTop - 100) {
              activeHeading = firstHeading;
            }
          }

          if (activeHeading) {
            const activeLink = tocContainer.querySelector(
              `.toc-link[href="#${activeHeading.getAttribute("id")}"]`
            );
            updateActiveLink(activeLink);
          }

          ticking = false;
        });
      }

      window.addEventListener("scroll", handleScroll, { passive: true });
    });
  };

  // Check if DOM is already loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeFeature);
  } else {
    // DOM is already loaded, run immediately
    initializeFeature();
  }
}

// Export default for easy importing
export default initTableOfContents;
