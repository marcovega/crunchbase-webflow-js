export default {
  server: {
    cors: true,
    origin: "http://localhost:5173",
    strictPort: true,
  },
  build: {
    lib: {
      entry: "src/main.js",
      formats: ["iife"],
      name: "WebflowTest",
      fileName: () => "webflow-demo.js",
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
        server.httpServer?.once("listening", () => {
          const address = server.config.server.host || "localhost";
          const port = server.config.server.port;
          const script = `<script type="module" src="http://${address}:${port}/src/main.js"></script>`;
          console.log(
            "\n👾 paste this in your Webflow embed:\n\n" + script + "\n",
          );
        });
      },
    },
  ],
};
