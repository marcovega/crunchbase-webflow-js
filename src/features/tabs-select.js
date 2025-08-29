/**
 * Tabs Select Feature
 *
 * Converts Webflow tabs to select dropdown for mobile/tablet (991px and below).
 */

export function initTabsSelect() {
  const tabContainers = document.querySelectorAll(".tabs.w-tabs");
  if (tabContainers.length === 0) return;

  console.log(`📱 Tabs Select: Found ${tabContainers.length} tab containers`);

  tabContainers.forEach((tabContainer) => {
    const tabLinks = tabContainer.querySelectorAll(".tab-link");

    if (tabLinks.length === 0 || tabContainer.querySelector(".tabs-select")) {
      return;
    }

    const select = document.createElement("select");
    select.className = "tabs-select";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a tab...";
    defaultOption.disabled = true;
    select.appendChild(defaultOption);

    tabLinks.forEach((tabLink, tabIndex) => {
      const option = document.createElement("option");
      option.value = tabIndex;
      option.textContent = tabLink.textContent.trim() || `Tab ${tabIndex + 1}`;

      if (tabLink.classList.contains("w--current")) {
        option.selected = true;
        defaultOption.disabled = false;
        defaultOption.selected = false;
      }

      select.appendChild(option);
    });

    select.addEventListener("change", function () {
      const selectedIndex = parseInt(this.value);
      if (!isNaN(selectedIndex) && tabLinks[selectedIndex]) {
        tabLinks[selectedIndex].click();
      }
    });

    tabContainer.insertBefore(select, tabContainer.firstChild);
  });

  addTabsSelectCSS();
  console.log("✅ Tabs Select: Mobile tab selectors initialized");
}

function addTabsSelectCSS() {
  if (document.getElementById("tabs-select-styles")) return;

  const style = document.createElement("style");
  style.id = "tabs-select-styles";
  style.textContent = `
    .tabs-select {
      width: 100%;
      padding: 12px 16px;
      margin-bottom: 16px;
      border: 2px solid #e1e5e9;
      border-radius: 6px;
      background-color: #ffffff;
      font-family: inherit;
      font-size: 16px;
      color: #333333;
      cursor: pointer;
      transition: border-color 0.2s ease;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 12px center;
      background-size: 16px;
      padding-right: 40px;
    }

    .tabs-select:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }

    .tabs-select:hover {
      border-color: #007bff;
    }

    @media (min-width: 992px) {
      .tabs-select {
        display: none !important;
      }
    }

    @media (max-width: 991px) {
      .tabs-select {
        display: block !important;
      }
    }
  `;

  document.head.appendChild(style);
}

export default initTabsSelect;
