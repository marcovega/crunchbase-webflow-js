// Import your features
import { initFeatures } from "./features/index.js";

// Production build check - only run if wrapper allows it or in dev mode
if (
  typeof window !== "undefined" &&
  !import.meta.env.DEV &&
  !window.__CRUNCHBASE_SHOULD_RUN_PROD__
) {
  // In production build, wait for wrapper to set the flag
  const checkInterval = setInterval(() => {
    if (window.__CRUNCHBASE_SHOULD_RUN_PROD__) {
      clearInterval(checkInterval);
      runCrunchbaseCode();
    }
  }, 50);

  // Timeout after 5 seconds and run anyway
  setTimeout(() => {
    clearInterval(checkInterval);
    if (!window.__CRUNCHBASE_SHOULD_RUN_PROD__) {
      console.log(
        "⏰ Timeout waiting for wrapper, running production code anyway..."
      );
      runCrunchbaseCode();
    }
  }, 5000);
} else {
  // In development mode or wrapper already approved, run immediately
  runCrunchbaseCode();
}

function runCrunchbaseCode() {
  // Your app code goes here
  console.log("🚀 Crunchbase Webflow script loaded");

  // Initialize features (you can control which ones to load)
  initFeatures([
    "navHeight", // Navbar height CSS variable
    "logoSlider",
    "quotesSlider",
    "starRating",
    "comparisonTableToggler",
    "tabsSelect",
    "tabbedCards", // RE-ENABLED with safer implementation
    "marketoForms", // Marketo forms integration
    // "pricingCardToggler", // Pricing card annual/monthly toggler
    "relatedArticlesSlider", // Related articles slider for blog posts
    "readingTimeEstimate", // Reading time estimate for blog posts
    "tableOfContents", // Table of contents for blog posts
    "heroTabs", // Hero tabs with accessibility features
    "caseStudyFilter", // Case study filtering system
    "postCardAttribution", // Post card author metadata visibility
    "topicsNavigation", // Topics navigation dropdown from collection lists
    "searchPopup", // Full-screen search popup modal
  ]); // Can add "demo" to enable demo feature.

  // Development indicator and live reload
  if (import.meta.env.DEV) {
    // Create development indicator
    const indicator = document.createElement("div");
    indicator.id = "dev-indicator";

    // Check if we can extract CSS URL from current page
    const isWebflowDomain = window.location.hostname.includes("webflow.io");
    const cssButton = isWebflowDomain
      ? `
    <button id="copy-css-url" style="
      background: #3498db;
      border: none;
      color: white;
      padding: 4px 8px;
      border-radius: 3px;
      font-size: 10px;
      cursor: pointer;
      margin-top: 4px;
      width: 100%;
    ">📋 Copy CSS URL</button>
  `
      : "";

    indicator.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #2c3e50;
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 999999;
      min-width: 120px;
    ">
      <div>⚡ Fueled Dev</div>
      <div id="ws-status" style="margin-top: 4px; opacity: 0.8;">🔄 Connecting...</div>
      ${cssButton}
    </div>
  `;

    document.body.appendChild(indicator);

    // CSS URL copy functionality
    if (isWebflowDomain) {
      const copyButton = document.getElementById("copy-css-url");
      if (copyButton) {
        copyButton.addEventListener("click", function () {
          // Find Webflow CSS link in current page
          const webflowCssLink = document.querySelector(
            'link[href*="website-files.com"][href*=".css"]'
          );

          if (webflowCssLink) {
            const cssUrl = webflowCssLink.href;

            // Copy to clipboard
            navigator.clipboard
              .writeText(cssUrl)
              .then(() => {
                // Visual feedback
                const originalText = copyButton.textContent;
                copyButton.textContent = "✅ Copied!";
                copyButton.style.background = "#27ae60";

                setTimeout(() => {
                  copyButton.textContent = originalText;
                  copyButton.style.background = "#3498db";
                }, 2000);

                console.log("📋 CSS URL copied to clipboard:", cssUrl);
              })
              .catch((err) => {
                console.error("Failed to copy CSS URL:", err);
                copyButton.textContent = "❌ Failed";
                copyButton.style.background = "#e74c3c";

                setTimeout(() => {
                  copyButton.textContent = "📋 Copy CSS URL";
                  copyButton.style.background = "#3498db";
                }, 2000);
              });
          } else {
            console.warn("No Webflow CSS link found on this page");
            copyButton.textContent = "🔍 No CSS Found";
            copyButton.style.background = "#f39c12";

            setTimeout(() => {
              copyButton.textContent = "📋 Copy CSS URL";
              copyButton.style.background = "#3498db";
            }, 2000);
          }
        });
      }
    }

    // WebSocket connection with status updates
    const wsStatus = document.getElementById("ws-status");

    const connectWebSocket = () => {
      const ws = new WebSocket("ws://127.0.0.1:5174");

      ws.onopen = () => {
        console.log("🔄 Connected to live reload server");
        wsStatus.innerHTML = "🟢 Live Reload";
        wsStatus.style.color = "#2ecc71";
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "reload") {
          console.log("📦 Files changed, reloading page...");
          wsStatus.innerHTML = "📦 Reloading...";
          wsStatus.style.color = "#f39c12";
          setTimeout(() => window.location.reload(), 100);
        }
      };

      ws.onclose = () => {
        console.log("❌ Live reload disconnected, attempting to reconnect...");
        wsStatus.innerHTML = "🔄 Reconnecting...";
        wsStatus.style.color = "#f39c12";
        // Attempt to reconnect after 2 seconds
        setTimeout(connectWebSocket, 2000);
      };

      ws.onerror = (error) => {
        console.log("⚠️ WebSocket error:", error);
        wsStatus.innerHTML = "❌ Disconnected";
        wsStatus.style.color = "#e74c3c";
      };
    };

    connectWebSocket();
  }

  // End of runCrunchbaseCode function
}
