import React from "react";
import { createRoot } from "react-dom/client";
import ROICalculator from "./components/ROICalculator.jsx";

// Live reload functionality for development
if (import.meta.env.DEV) {
  // Create development indicator for React
  const indicator = document.createElement("div");
  indicator.id = "react-dev-indicator";
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
      <div>⚛️ React Dev</div>
      <div id="react-ws-status" style="margin-top: 4px; opacity: 0.8;">🔄 Connecting...</div>
    </div>
  `;

  document.body.appendChild(indicator);

  // WebSocket connection with status updates
  const wsStatus = document.getElementById("react-ws-status");

  const connectWebSocket = () => {
    const ws = new WebSocket("ws://127.0.0.1:5174");

    ws.onopen = () => {
      console.log("🔄 React: Connected to live reload server");
      wsStatus.innerHTML = "🟢 Live Reload";
      wsStatus.style.color = "#20232a";
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "reload") {
        console.log("📦 React: Files changed, reloading page...");
        wsStatus.innerHTML = "📦 Reloading...";
        wsStatus.style.color = "#f39c12";
        setTimeout(() => window.location.reload(), 100);
      }
    };

    ws.onclose = () => {
      console.log(
        "❌ React: Live reload disconnected, attempting to reconnect..."
      );
      wsStatus.innerHTML = "🔄 Reconnecting...";
      wsStatus.style.color = "#f39c12";
      // Attempt to reconnect after 2 seconds
      setTimeout(connectWebSocket, 2000);
    };

    ws.onerror = (error) => {
      console.log("⚠️ React: WebSocket error:", error);
      wsStatus.innerHTML = "❌ Disconnected";
      wsStatus.style.color = "#e74c3c";
    };
  };

  connectWebSocket();
}

// ROI Calculator initialization function
function initROICalculator(targetSelector = "#roi-calculator") {
  console.log("🚀 ROI Calculator: Starting initialization...");

  try {
    // Find the target container
    const container = document.querySelector(targetSelector);

    if (!container) {
      console.error(
        `❌ ROI Calculator: Container "${targetSelector}" not found`
      );
      return;
    }

    console.log(`✅ ROI Calculator: Found container "${targetSelector}"`);

    // Create React root and render the component
    const root = createRoot(container);
    root.render(React.createElement(ROICalculator));

    console.log("✅ ROI Calculator: Component rendered successfully");

    return root;
  } catch (error) {
    console.error("❌ ROI Calculator: Error during initialization:", error);
  }
}

// Auto-initialize if container exists
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#roi-calculator");
  if (container) {
    initROICalculator();
  } else {
    console.log(
      "💡 ROI Calculator: No #roi-calculator container found. Use initROICalculator('#your-selector') to initialize manually."
    );
  }
});

// Make it available globally for manual initialization
window.initROICalculator = initROICalculator;

// Export for potential use as module
export { initROICalculator };
export default initROICalculator;
