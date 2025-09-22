export function initHeroTabs() {
  const triggers = document.querySelectorAll("[data-tab-for]");
  if (triggers.length === 0) return;

  const containers = new Map();

  triggers.forEach((trigger) => {
    let container =
      trigger.closest('[role="tablist"]') ||
      trigger.closest(".hero-tabs") ||
      trigger.closest(".pricing-card-toggle") ||
      trigger.parentElement;

    if (!containers.has(container)) containers.set(container, []);
    containers.get(container).push(trigger);
  });

  setDefaultTabVisibility();

  let idx = 0;
  containers.forEach((triggers, container) => {
    initTabContainer(container, triggers, idx++);
  });

  setupGlobalTabSync();
}

function setDefaultTabVisibility() {
  const triggers = document.querySelectorAll("[data-tab-for]");
  const tabIds = [];
  const seen = new Set();

  triggers.forEach((trigger) => {
    const tabFor = trigger.getAttribute("data-tab-for");
    if (tabFor && !seen.has(tabFor)) {
      tabIds.push(tabFor);
      seen.add(tabFor);
    }
  });

  tabIds.forEach((tabId, index) => {
    const containers = document.querySelectorAll(
      `[data-tab-container="${tabId}"]`
    );
    const show = index === 0;

    containers.forEach((container) => {
      container.style.display = show ? "block" : "none";
      container.setAttribute("aria-hidden", show ? "false" : "true");
    });
  });
}

function initTabContainer(container, triggers, idx) {
  if (triggers.length === 0) return;

  const tabsId = `hero-tabs-${idx}`;
  const tablistId = `${tabsId}-tablist`;

  if (!container.getAttribute("role"))
    container.setAttribute("role", "tablist");
  if (!container.getAttribute("id")) container.setAttribute("id", tablistId);
  if (!container.getAttribute("aria-label"))
    container.setAttribute("aria-label", "Tab navigation");

  triggers.forEach((trigger, i) => {
    const tabFor = trigger.getAttribute("data-tab-for");
    const tabContainer = document.querySelector(
      `[data-tab-container="${tabFor}"]`
    );

    if (!tabContainer) return;

    const tabId = `${tabsId}-tab-${i}`;
    const panelId = `${tabsId}-panel-${i}`;

    if (!trigger.getAttribute("role")) trigger.setAttribute("role", "tab");
    if (!trigger.getAttribute("id")) trigger.setAttribute("id", tabId);
    trigger.setAttribute("aria-controls", panelId);

    const isActive = tabContainer.style.display !== "none";
    trigger.setAttribute("tabindex", isActive ? "0" : "-1");
    trigger.setAttribute("aria-selected", isActive ? "true" : "false");
    trigger.classList.toggle("hero-tabs-item-active", isActive);

    tabContainer.setAttribute("role", "tabpanel");
    tabContainer.setAttribute("id", panelId);
    tabContainer.setAttribute(
      "aria-labelledby",
      trigger.getAttribute("id") || tabId
    );
    tabContainer.setAttribute("tabindex", "0");

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      activateTabGlobally(trigger.getAttribute("data-tab-for"), container);
    });

    trigger.addEventListener("keydown", (e) =>
      handleTabKeydown(e, container, triggers, i)
    );

    trigger.addEventListener("focus", () => {
      trigger.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
}

function activateTabGlobally(targetTabFor, focusContainer = null) {
  const triggers = document.querySelectorAll("[data-tab-for]");
  const containers = document.querySelectorAll("[data-tab-container]");

  let activeTrigger = null;
  let focusTarget = null;

  containers.forEach((container) => {
    const tabFor = container.getAttribute("data-tab-container");
    const isActive = tabFor === targetTabFor;

    container.style.display = isActive ? "block" : "none";
    container.setAttribute("aria-hidden", isActive ? "false" : "true");
  });

  triggers.forEach((trigger) => {
    const tabFor = trigger.getAttribute("data-tab-for");
    const isActive = tabFor === targetTabFor;

    trigger.classList.toggle("hero-tabs-item-active", isActive);
    trigger.setAttribute("aria-selected", isActive ? "true" : "false");
    trigger.setAttribute("tabindex", isActive ? "0" : "-1");

    if (isActive) {
      activeTrigger = trigger;

      if (
        focusContainer &&
        (trigger.closest('[role="tablist"]') === focusContainer ||
          trigger.closest(".hero-tabs") === focusContainer ||
          trigger.closest(".pricing-card-toggle") === focusContainer ||
          trigger.parentElement === focusContainer)
      ) {
        focusTarget = trigger;
      }
    }
  });

  if (activeTrigger) announceTabChange(activeTrigger);
  if (focusTarget) focusTarget.focus();
}

function handleTabKeydown(event, container, triggers, currentIndex) {
  let targetIndex = currentIndex;

  switch (event.key) {
    case "ArrowLeft":
    case "ArrowUp":
      event.preventDefault();
      targetIndex = currentIndex > 0 ? currentIndex - 1 : triggers.length - 1;
      break;

    case "ArrowRight":
    case "ArrowDown":
      event.preventDefault();
      targetIndex = currentIndex < triggers.length - 1 ? currentIndex + 1 : 0;
      break;

    case "Home":
      event.preventDefault();
      targetIndex = 0;
      break;

    case "End":
      event.preventDefault();
      targetIndex = triggers.length - 1;
      break;

    case "Enter":
    case " ":
      event.preventDefault();
      activateTabGlobally(
        triggers[currentIndex].getAttribute("data-tab-for"),
        container
      );
      return;

    default:
      return;
  }

  triggers[targetIndex].focus();
}

function announceTabChange(activeTab) {
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.style.cssText = `
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  `;

  announcement.textContent = `${activeTab.textContent.trim()} tab selected`;
  document.body.appendChild(announcement);

  setTimeout(() => {
    if (announcement.parentNode)
      announcement.parentNode.removeChild(announcement);
  }, 1000);
}

function setupGlobalTabSync() {
  // Global synchronization handled in activateTabGlobally
}

function addHeroTabsCSS() {
  if (document.getElementById("hero-tabs-styles")) return;

  const style = document.createElement("style");
  style.id = "hero-tabs-styles";
  style.textContent = `
    [data-tab-for]:focus {
      outline: 2px solid #005fcc;
      outline-offset: 2px;
      box-shadow: 0 0 0 4px rgba(0, 95, 204, 0.1);
    }

    [data-tab-container] {
      transition: opacity 0.2s ease-in-out;
    }

    @media (prefers-contrast: high) {
      [data-tab-for]:focus {
        outline: 3px solid;
        outline-offset: 2px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      [data-tab-container] { transition: none; }
      [data-tab-for] { scroll-behavior: auto; }
    }

    .sr-only {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }
  `;

  document.head.appendChild(style);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addHeroTabsCSS);
} else {
  addHeroTabsCSS();
}

export default initHeroTabs;
