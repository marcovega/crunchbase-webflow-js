/**
 * Reading Time Estimate Feature
 *
 * Calculates and displays reading time estimate for blog content.
 * Also adds YouTube iframe styling classes.
 *
 * Features:
 * - Calculates word count from rich text content
 * - Estimates reading time based on average reading speed (200 WPM)
 * - Displays reading time in specified element
 * - Adds CSS class to YouTube iframes for styling
 */

export function initReadingTimeEstimate() {
  // Wait for DOM to be ready
  const initializeFeature = () => {
    // Select the rich text element
    const richTextElement = document.querySelector(".blog-content-richtext");

    if (!richTextElement) {
      return;
    }

    console.log("📖 Reading Time Estimate: Found rich text element");

    const text = richTextElement.textContent || richTextElement.innerText;

    // Calculate word count. Regular expression to split by whitespace.
    const wordCount = text.trim().split(/\s+/).length;

    // Set an average reading speed (e.g., 200 words per minute)
    const wordsPerMinute = 200;

    // Calculate the time to read in minutes
    const timeToRead = Math.ceil(wordCount / wordsPerMinute);

    const displayElement = document.querySelector(".read-time-estimate");

    if (displayElement) {
      displayElement.textContent = `${timeToRead} min read`;
    }

    // Add class to YouTube iframes
    const iframes = richTextElement.querySelectorAll("iframe");

    iframes.forEach((iframe) => {
      const src = iframe.getAttribute("src") || "";
      if (src.includes("youtube.com") || src.includes("youtu.be")) {
        iframe.classList.add("youtube-iframe");
      }
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
export default initReadingTimeEstimate;
