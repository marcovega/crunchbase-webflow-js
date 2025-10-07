import { render, h } from "preact";
import QuoteCardBuilder from "./components/QuoteCardBuilder.jsx";

// Live reload functionality for development
if (import.meta.env.DEV) {
  // Create development indicator
  const indicator = document.createElement("div");
  indicator.id = "quote-builder-dev-indicator";
  indicator.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: #61dafb;
      color: #20232a;
      padding: 8px 12px;
      border-radius: 6px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      z-index: 999999;
    ">
      <div>💬 Quote Builder Dev</div>
      <div id="quote-builder-ws-status" style="margin-top: 4px; opacity: 0.8;">🔄 Connecting...</div>
    </div>
  `;

  document.body.appendChild(indicator);

  // WebSocket connection with status updates
  const wsStatus = document.getElementById("quote-builder-ws-status");

  const connectWebSocket = () => {
    const ws = new WebSocket("ws://127.0.0.1:5174");

    ws.onopen = () => {
      console.log("🔄 Quote Builder: Connected to live reload server");
      wsStatus.innerHTML = "🟢 Live Reload";
      wsStatus.style.color = "#20232a";
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "reload") {
        console.log("📦 Quote Builder: Files changed, reloading page...");
        wsStatus.innerHTML = "📦 Reloading...";
        wsStatus.style.color = "#f39c12";
        setTimeout(() => window.location.reload(), 100);
      }
    };

    ws.onclose = () => {
      console.log(
        "❌ Quote Builder: Live reload disconnected, attempting to reconnect..."
      );
      wsStatus.innerHTML = "🔄 Reconnecting...";
      wsStatus.style.color = "#f39c12";
      // Attempt to reconnect after 2 seconds
      setTimeout(connectWebSocket, 2000);
    };

    ws.onerror = (error) => {
      console.log("⚠️ Quote Builder: WebSocket error:", error);
      wsStatus.innerHTML = "❌ Disconnected";
      wsStatus.style.color = "#e74c3c";
    };
  };

  connectWebSocket();
}

// Quote Card Builder initialization function
function initQuoteCardBuilder(targetSelector = "#quote-card-builder") {
  console.log("🚀 Quote Card Builder: Starting initialization...");

  try {
    // Find the target container
    const container = document.querySelector(targetSelector);

    if (!container) {
      console.error(
        `❌ Quote Card Builder: Container "${targetSelector}" not found`
      );
      return;
    }

    console.log(`✅ Quote Card Builder: Found container "${targetSelector}"`);

    // Render the Preact component
    render(h(QuoteCardBuilder), container);

    console.log("✅ Quote Card Builder: Component rendered successfully");

    return container;
  } catch (error) {
    console.error("❌ Quote Card Builder: Error during initialization:", error);
  }
}

// Auto-initialize if container exists
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#quote-card-builder");
  if (container) {
    initQuoteCardBuilder();
  } else {
    console.log(
      "💡 Quote Card Builder: No #quote-card-builder container found. Use initQuoteCardBuilder('#your-selector') to initialize manually."
    );
  }
});

// Make it available globally for manual initialization
window.initQuoteCardBuilder = initQuoteCardBuilder;

// Export for potential use as module
export { initQuoteCardBuilder };
export default initQuoteCardBuilder;
