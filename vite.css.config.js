// Vite config specifically for CSS compilation
export default {
  build: {
    outDir: "dist",
    emptyOutDir: false, // Don't clear dist folder
    rollupOptions: {
      input: "src/styles/main.css",
      output: {
        assetFileNames: "crunchbase-webflow.css",
      },
    },
  },
};
