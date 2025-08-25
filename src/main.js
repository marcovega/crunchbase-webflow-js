// Import your features
import { initFeatures } from "./features/index.js";

// Your app code goes here
console.log("🚀 Crunchbase Webflow script loaded");

// Initialize features (you can control which ones to load)
initFeatures([
  "logoSlider",
  "quotesSlider",
  "starRating",
  "comparisonTableToggler",
]); // Can add "demo" to enable demo feature.

// Development indicator and live reload
if (import.meta.env.DEV) {
  // Create development indicator
  const indicator = document.createElement("div");
  indicator.id = "dev-indicator";
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
    ">
      <div>⚡ Fueled Dev</div>
      <div id="ws-status" style="margin-top: 4px; opacity: 0.8;">🔄 Connecting...</div>
    </div>
  `;

  document.body.appendChild(indicator);

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
