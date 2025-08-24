import { WebSocketServer } from "ws";
import react from "@vitejs/plugin-react";

export default {
  server: {
    host: "127.0.0.1",
    cors: true,
    origin: "http://127.0.0.1:5173",
    strictPort: true,
  },
  build: {
    lib: {
      entry: {
        main: "src/main.js",
        "roi-calculator": "src/react/roi-calculator-entry.js",
      },
      formats: ["iife"],
      name: {
        main: "CrunchbaseWebflow",
        "roi-calculator": "ROICalculator",
      },
      fileName: (format, entryName) => {
        if (entryName === "main") return "crunchbase-webflow.js";
        if (entryName === "roi-calculator") return "roi-calculator.js";
        return `${entryName}.js`;
      },
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
  plugins: [
    react(),
    {
      name: "webflow-snippet",
      configureServer(server) {
        // WebSocket server for live reload
        const wss = new WebSocketServer({ port: 5174, host: "127.0.0.1" });
        const clients = new Set();

        wss.on("connection", (ws) => {
          clients.add(ws);
          console.log("📱 Webflow client connected for live reload");

          ws.on("close", () => {
            clients.delete(ws);
          });
        });

        // Watch for file changes and broadcast reload signal
        server.ws.on("vite:beforeUpdate", () => {
          clients.forEach((client) => {
            if (client.readyState === 1) {
              // WebSocket.OPEN
              client.send(JSON.stringify({ type: "reload" }));
            }
          });
        });

        server.httpServer?.once("listening", () => {
          const address = server.config.server.host || "127.0.0.1";
          const port = server.config.server.port;
          const mainScript = `<script type="module" src="http://${address}:${port}/src/main.js"></script>`;
          const roiScript = `<script type="module" src="http://${address}:${port}/src/react/roi-calculator-entry.js"></script>`;
          console.log(
            "\n👾 Webflow embed scripts:\n\n📦 Vanilla JS Features:\n" +
              mainScript +
              "\n\n⚛️  ROI Calculator (React):\n" +
              roiScript +
              "\n"
          );
          console.log("🔄 Live reload enabled on ws://127.0.0.1:5174\n");
        });
      },
    },
  ],
};
