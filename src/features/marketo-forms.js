/**
 * Marketo Forms Feature
 *
 * Dynamically initializes Marketo forms based on data-marketo-id attributes.
 * This allows you to use divs with data attributes instead of form elements
 * in Webflow, avoiding conflicts with Webflow's form handling.
 *
 * Usage in Webflow:
 * <div data-marketo-id="1753" class="mkto-form-container"></div>
 *
 * The feature will:
 * 1. Load Marketo CSS and JS if not already loaded
 * 2. Find all elements with data-marketo-id
 * 3. Create form elements and initialize Marketo forms
 * 4. Apply the layout function for styling
 */

// Marketo configuration
const MARKETO_CONFIG = {
  baseUrl: "https://pages.crunchbase.com",
  munchkinId: "976-JJA-800",
  cssUrl: "https://app-sj22.marketo.com/js/forms2/css/forms2.css",
  jsUrl: "https://pages.crunchbase.com/js/forms2/js/forms2.min.js",
};

// Track loaded resources to avoid duplicates
let resourcesLoaded = {
  css: false,
  js: false,
};

/**
 * Load Marketo CSS if not already loaded
 */
function loadMarketoCSS() {
  return new Promise((resolve) => {
    if (
      resourcesLoaded.css ||
      document.querySelector(`link[href="${MARKETO_CONFIG.cssUrl}"]`)
    ) {
      resourcesLoaded.css = true;
      resolve();
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = MARKETO_CONFIG.cssUrl;
    link.onload = () => {
      resourcesLoaded.css = true;
      console.log("✅ Marketo CSS loaded");
      resolve();
    };
    link.onerror = () => {
      console.error("❌ Failed to load Marketo CSS");
      resolve(); // Continue even if CSS fails
    };
    document.head.appendChild(link);
  });
}

/**
 * Load Marketo JS if not already loaded
 */
function loadMarketoJS() {
  return new Promise((resolve) => {
    if (resourcesLoaded.js || window.MktoForms2) {
      resourcesLoaded.js = true;
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = MARKETO_CONFIG.jsUrl;
    script.onload = () => {
      resourcesLoaded.js = true;
      console.log("✅ Marketo JS loaded");
      resolve();
    };
    script.onerror = () => {
      console.error("❌ Failed to load Marketo JS");
      resolve(); // Continue even if JS fails
    };
    document.head.appendChild(script);
  });
}

/**
 * Apply layout styling to form (handles odd/even row styling)
 */
function applyLayout(form) {
  try {
    const formEl = form.getFormElem()[0];
    const visibleRows = Array.from(
      formEl.querySelectorAll(".mktoFormRow")
    ).filter((row) => !row.querySelector('input[type="hidden"]'));

    // Remove existing odd-last classes
    formEl
      .querySelectorAll(".is-odd-last")
      .forEach((row) => row.classList.remove("is-odd-last"));

    // Add odd-last class to last row if total rows is odd
    if (visibleRows.length % 2 === 1) {
      visibleRows[visibleRows.length - 1].classList.add("is-odd-last");
    }

    console.log(
      `✅ Layout applied to form with ${visibleRows.length} visible rows`
    );
  } catch (error) {
    console.error("❌ Error applying layout:", error);
  }
}

// Counter to ensure unique form IDs
let formInstanceCounter = 0;

/**
 * Initialize a single Marketo form
 */
function initializeMarketoForm(container, formId) {
  try {
    // Check if this container already has a form initialized
    if (container.hasAttribute("data-marketo-initialized")) {
      console.log(
        `ℹ️ Marketo form ${formId} already initialized in this container`
      );
      return;
    }

    // Create unique form ID to avoid conflicts
    formInstanceCounter++;
    const uniqueFormId = `mktoForm_${formId}_${formInstanceCounter}`;

    // Clear container and create form element with unique ID
    container.innerHTML = "";
    const formElement = document.createElement("form");
    formElement.id = uniqueFormId;
    container.appendChild(formElement);

    // Mark container as initialized
    container.setAttribute("data-marketo-initialized", "true");
    container.setAttribute("data-marketo-unique-id", uniqueFormId);

    console.log(
      `🎯 Initializing Marketo form ${formId} with unique ID: ${uniqueFormId}`
    );

    // Load form and render it in the specific form element
    window.MktoForms2.loadForm(
      MARKETO_CONFIG.baseUrl,
      MARKETO_CONFIG.munchkinId,
      parseInt(formId),
      function (form) {
        console.log(`✅ Marketo form ${formId} loaded successfully`);

        // Get the actual form element that Marketo created
        const marketoForm = form.getFormElem()[0];

        if (marketoForm) {
          // Replace our placeholder form with the actual Marketo form
          formElement.parentNode.replaceChild(marketoForm, formElement);

          // Update the ID to our unique ID to maintain uniqueness
          marketoForm.id = uniqueFormId;

          console.log(`🎯 Form rendered in container with ID: ${uniqueFormId}`);
        }

        // Apply layout after a short delay to ensure form is rendered
        setTimeout(() => applyLayout(form), 100);

        // Add custom event for additional customization if needed
        const event = new CustomEvent("marketoFormLoaded", {
          detail: { form, formId, container, uniqueId: uniqueFormId },
        });
        container.dispatchEvent(event);
      }
    );
  } catch (error) {
    console.error(`❌ Error initializing Marketo form ${formId}:`, error);
  }
}

/**
 * Find and initialize all Marketo forms on the page
 */
function initializeAllMarketoForms() {
  const containers = document.querySelectorAll("[data-marketo-id]");

  if (containers.length === 0) {
    console.log(
      "ℹ️ No Marketo form containers found (looking for [data-marketo-id])"
    );
    return;
  }

  console.log(`🎯 Found ${containers.length} Marketo form container(s)`);

  containers.forEach((container, index) => {
    const formId = container.getAttribute("data-marketo-id");

    if (!formId) {
      console.warn(
        `⚠️ Container ${index + 1} has data-marketo-id but no value`
      );
      return;
    }

    // Add a small delay between form initializations to avoid conflicts
    setTimeout(() => {
      initializeMarketoForm(container, formId);
    }, index * 100);
  });
}

/**
 * Main initialization function
 */
export function initMarketoForms() {
  console.log("🚀 Marketo Forms: Starting initialization...");

  // Load resources and then initialize forms
  Promise.all([loadMarketoCSS(), loadMarketoJS()])
    .then(() => {
      // Wait a bit for MktoForms2 to be fully ready
      setTimeout(() => {
        if (window.MktoForms2) {
          initializeAllMarketoForms();

          // Set up observer for dynamically added forms
          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) {
                  // Element node
                  // Check if the added node has data-marketo-id
                  if (
                    node.hasAttribute &&
                    node.hasAttribute("data-marketo-id")
                  ) {
                    const formId = node.getAttribute("data-marketo-id");
                    setTimeout(() => initializeMarketoForm(node, formId), 100);
                  }

                  // Check if any child elements have data-marketo-id
                  const childContainers = node.querySelectorAll
                    ? node.querySelectorAll("[data-marketo-id]")
                    : [];
                  childContainers.forEach((container, index) => {
                    const formId = container.getAttribute("data-marketo-id");
                    if (formId) {
                      setTimeout(
                        () => initializeMarketoForm(container, formId),
                        (index + 1) * 100
                      );
                    }
                  });
                }
              });
            });
          });

          observer.observe(document.body, {
            childList: true,
            subtree: true,
          });

          console.log(
            "✅ Marketo Forms: Initialization complete with dynamic form detection"
          );
        } else {
          console.error("❌ MktoForms2 not available after loading resources");
        }
      }, 500);
    })
    .catch((error) => {
      console.error("❌ Error loading Marketo resources:", error);
    });
}

// Export default for easy importing
export default initMarketoForms;
