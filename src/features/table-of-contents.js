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
    const tocContainer = document.querySelector(".table-of-content");
    const blogContent = document.querySelector(".blog-content");

    if (!blogContent) {
      return;
    }

    console.log("📚 Table of Contents: Found blog content element");

    const headings = blogContent.querySelectorAll("h2");

    let currentActiveElement = null;
    let isUpdating = false;

    // Create TOC markup dynamically
    function createTableOfContents() {
      if (headings.length === 0) return;

      const ul = document.createElement("ul");

      headings.forEach((heading, index) => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        const headingText = heading.textContent.trim();
        const headingId = heading.getAttribute("id");

        if (headingId) {
          a.href = `#${headingId}`;
          a.textContent = headingText;
          a.classList.add("toc-link");

          if (index === 0) {
            a.classList.add("active");
            currentActiveElement = a;
          }

          li.appendChild(a);
          ul.appendChild(li);
        }
      });

      if (tocContainer) {
        tocContainer.innerHTML = "";
        tocContainer.appendChild(ul);
      }
    }

    createTableOfContents();
    const tocLinks = document.querySelectorAll(".toc-link");

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
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
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
          const activeLink = document.querySelector(
            `.toc-link[href="#${activeHeading.getAttribute("id")}"]`
          );
          updateActiveLink(activeLink);
        }

        ticking = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
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
