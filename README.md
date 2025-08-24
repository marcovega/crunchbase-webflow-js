# Webflow JavaScript Development Server

A Vite-powered development environment for building and live-testing both vanilla JavaScript and React components that can be injected into Webflow sites.

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
   When the server starts, it will display script tags in the console for both vanilla JS and React:

   ```html
   📦 Vanilla JS Features:
   <script type="module" src="http://localhost:5173/src/main.js"></script>

   ⚛️ ROI Calculator (React):
   <script
     type="module"
     src="http://localhost:5173/src/react/roi-calculator-entry.js"
   ></script>
   ```

4. **Paste in Webflow:**
   Copy the appropriate script tag(s) and paste them into Webflow embed elements on your development site.

## How It Works

- **Development**: The Vite dev server runs on `http://127.0.0.1:5173` with CORS enabled for both vanilla JS and React
- **Live Reloading**: Changes to any JavaScript or React files automatically trigger a full page reload in Webflow via WebSocket connection
- **Production Build**: Run `npm run build` to generate both `crunchbase-webflow.js` (vanilla JS) and `roi-calculator.js` (React) for production use

### Live Reload System

The development setup includes automatic live reloading:

- **WebSocket Server**: Runs on `ws://127.0.0.1:5174` alongside the Vite dev server
- **Client Connection**: The injected script automatically connects to the WebSocket server
- **File Watching**: Detects changes to any files and broadcasts reload signals
- **Auto Reconnection**: Automatically reconnects if the WebSocket connection drops
- **Development Only**: Live reload is only active in development mode (`import.meta.env.DEV`)

## File Structure

### Vanilla JavaScript

- `src/main.js` - Your main JavaScript entry point (imports and initializes features)
- `src/features/` - Feature modules directory
  - `index.js` - Features registry and initialization
  - `demo-feature.js` - Example feature (adds black border to body)
  - `logo-slider.js` - Logo slider feature

### React Components

- `src/react/` - React components directory
  - `roi-calculator-entry.js` - React entry point for ROI calculator
  - `components/` - React components
    - `ROICalculator.jsx` - ROI calculator component

### Configuration

- `vite.config.js` - Configured for multiple entry points and React support
- `index.html` - Development testing page with both vanilla JS and React demos

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

This creates **two separate files** in the `dist` folder:

- `crunchbase-webflow.js` - Vanilla JS features bundle
- `roi-calculator.js` - React ROI calculator bundle

Both files can be uploaded to Webflow as hosted files and used independently or together.

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

## React Development

The setup includes React support for building interactive components that can be injected into Webflow:

- **Separate Build**: React components build to their own injectable JavaScript files
- **Live Reload**: React development with hot reloading during development
- **Auto-initialization**: Components can auto-initialize when containers are found
- **Manual Control**: Use `window.initComponentName()` for custom initialization

### Basic Usage

1. **Add container** to Webflow:

   ```html
   <div id="roi-calculator"></div>
   ```

2. **Inject the script**:
   ```html
   <script src="https://your-site.com/roi-calculator.js"></script>
   ```

The included ROI Calculator is a simple placeholder ready for your implementation.

---

Perfect for developing interactive features, animations, React components, or custom functionality for Webflow sites with modern JavaScript and React tooling.
