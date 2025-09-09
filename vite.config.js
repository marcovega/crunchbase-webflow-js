import { WebSocketServer } from "ws";
import react from "@vitejs/plugin-react";
import fs from 'fs';
import path from 'path';

export default {
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
  server: {
    host: "127.0.0.1",
    cors: true,
    origin: "http://127.0.0.1:5173",
    strictPort: true,
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  build: {
    lib: {
      entry: {
        main: "src/main.js",
        "roi-calculator": "src/react/roi-calculator-entry.js",
      },
      formats: ["es"],
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
      name: "production-wrapper",
      generateBundle(options, bundle) {
        // Only apply to main entry point
        const mainBundle = bundle['crunchbase-webflow.js'];
        if (!mainBundle) return;

        // Read the wrapper and config files
        const wrapperPath = path.resolve(__dirname, 'src/prod-wrapper.js');
        const configPath = path.resolve(__dirname, 'src/config.js');
        
        let wrapperCode = '';
        let configCode = '';
        
        try {
          // Read and inline the config
          const configContent = fs.readFileSync(configPath, 'utf-8');
          configCode = configContent.replace('export const config =', 'const config =');
          
          // Read the wrapper and remove the import
          const wrapperContent = fs.readFileSync(wrapperPath, 'utf-8');
          wrapperCode = wrapperContent.replace("import { config } from './config.js';", '');
          
          // Combine: config + wrapper + original code
          const originalCode = mainBundle.code;
          mainBundle.code = `${configCode}\n\n${wrapperCode}\n\n// Original production code below:\n${originalCode}`;
          
          console.log('✅ Production wrapper added to bundle');
        } catch (error) {
          console.warn('⚠️ Failed to add production wrapper:', error);
        }
      }
    },
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
          const cssLink = `<link rel="stylesheet" href="http://${address}:${port}/src/styles/main.css">`;
          console.log(
            "\n👾 Webflow embed scripts:\n\n🎨 Styles:\n" +
              cssLink +
              "\n\n📦 Vanilla JS Features:\n" +
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
