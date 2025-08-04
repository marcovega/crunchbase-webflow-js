# Webflow JavaScript Development Server

A Vite-powered development environment for building and live-testing JavaScript code that can be injected into Webflow sites.

## Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Copy the embed code:**
   When the server starts, it will display a script tag in the console like:

   ```html
   <script type="module" src="http://localhost:5173/src/main.js"></script>
   ```

4. **Paste in Webflow:**
   Copy this script tag and paste it into a Webflow embed element on your development site.

## How It Works

- **Development**: The Vite dev server runs on `http://127.0.0.1:5173` with CORS enabled
- **Live Reloading**: Changes to your JavaScript automatically trigger a full page reload in Webflow via WebSocket connection
- **Production Build**: Run `npm run build` to generate `crunchbase-webflow.js` for production use

### Live Reload System

The development setup includes automatic live reloading:

- **WebSocket Server**: Runs on `ws://127.0.0.1:5174` alongside the Vite dev server
- **Client Connection**: The injected script automatically connects to the WebSocket server
- **File Watching**: Detects changes to any files and broadcasts reload signals
- **Auto Reconnection**: Automatically reconnects if the WebSocket connection drops
- **Development Only**: Live reload is only active in development mode (`import.meta.env.DEV`)

## File Structure

- `src/main.js` - Your main JavaScript entry point (imports and initializes features)
- `src/features/` - Feature modules directory
  - `index.js` - Features registry and initialization
  - `demo-feature.js` - Example feature (adds black border to body)
- `vite.config.js` - Configured to output IIFE format for Webflow compatibility
- `index.html` - Development testing page

## Feature Development

### Creating New Features

1. **Create a new feature file** in `src/features/`:

   ```javascript
   // src/features/my-feature.js
   export function initMyFeature() {
     console.log("🚀 My Feature: Starting...");
     // Your feature code here
     console.log("✅ My Feature: Complete");
   }

   export default initMyFeature;
   ```

2. **Add to features index** in `src/features/index.js`:

   ```javascript
   import initMyFeature from "./my-feature.js";

   export const features = {
     demo: initDemoFeature,
     myFeature: initMyFeature, // Add your feature here
   };
   ```

3. **Enable the feature** in `src/main.js`:
   ```javascript
   // Enable specific features
   initFeatures(["demo", "myFeature"]);
   ```

### Feature Best Practices

- **Self-contained**: Each feature should work independently
- **Console logging**: Use clear console messages for debugging
- **Error handling**: Wrap feature code in try/catch if needed
- **Conditional loading**: Use feature flags for optional functionality

### Demo Feature

The included `demo-feature.js` adds a **5px black border** around the entire body element. This helps you:

- **Test the injection**: Verify your script is loading in Webflow
- **See live reload**: Make changes and watch them update immediately
- **Understand structure**: See how features are organized and initialized

**To disable the demo feature:**

```javascript
// In src/main.js
initFeatures([]); // Empty array = no features
```

## Building for Production

```bash
npm run build
```

This creates a `crunchbase-webflow.js` file in the `dist` folder that can be uploaded to Webflow as a hosted file.

## Development Workflow

1. Write your JavaScript in `src/main.js` (or create additional modules)
2. The dev server provides live reloading via WebSocket connection to the embed script
3. Any file changes automatically trigger a page reload in Webflow
4. Test directly in your Webflow development environment with real-time updates
5. Build and deploy when ready for production

**Live Reload in Action:**

- Save any file in your project
- Watch the Webflow page automatically reload
- See your changes instantly without manual refresh
- **Development Indicator**: Small indicator in bottom-right shows:
  - ⚡ Vite Dev server status
  - 🟢 Live Reload connection (green = connected)
  - 🔄 Reconnecting status (yellow = reconnecting)
  - ❌ Disconnected status (red = error)

---

Perfect for developing interactive features, animations, or custom functionality for Webflow sites with modern JavaScript tooling.
