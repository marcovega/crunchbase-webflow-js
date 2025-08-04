import { WebSocketServer } from "ws";

export default {
  server: {
    host: "127.0.0.1",
    cors: true,
    origin: "http://127.0.0.1:5173",
    strictPort: true,
  },
  build: {
    lib: {
      entry: "src/main.js",
      formats: ["iife"],
      name: "CrunchbaseWebflow",
      fileName: () => "crunchbase-webflow.js",
    },
    rollupOptions: {
      output: {
        globals: {},
      },
    },
  },
  plugins: [
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
          const script = `<script type="module" src="http://${address}:${port}/src/main.js"></script>`;
          console.log(
            "\n👾 paste this in your Webflow embed:\n\n" + script + "\n"
          );
          console.log("🔄 Live reload enabled on ws://127.0.0.1:5174\n");
        });
      },
    },
  ],
};
