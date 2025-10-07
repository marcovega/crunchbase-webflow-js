/**
 * Configuration for Crunchbase Webflow JavaScript
 */

const config = {
  // Domains where development server detection should be enabled
  devDomains: [
    'about-crunchbase-com.webflow.io'
  ],
  
  // Development server configuration
  devServer: {
    url: 'http://127.0.0.1:5173/src/main.js',
    timeout: 2000 // 2 seconds timeout for dev server check
  }
};

/**
 * Production Wrapper with Development Server Detection
 * 
 * This wrapper is prepended to the production build and handles
 * conditional loading based on domain and dev server availability.
 */



(async function() {
  const currentDomain = window.location.hostname;
  const isDevelopmentDomain = config.devDomains.includes(currentDomain);
  
  console.log(`🌐 Crunchbase Webflow: Running on ${currentDomain}`);
  
  if (!isDevelopmentDomain) {
    console.log('📦 Production domain detected, running production code...');
    // Production code will be appended after this wrapper
    return;
  }
  
  console.log('🔧 Development domain detected, checking for local dev server...');
  
  /**
   * Check if the development server is available
   */
  async function checkDevServer() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.devServer.timeout);
      
      const response = await fetch(config.devServer.url, {
        method: 'HEAD',
        signal: controller.signal,
        mode: 'cors'
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Load development script
   */
  function loadDevScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = config.devServer.url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  
  // Check for development server
  const isDevAvailable = await checkDevServer();
  
  if (isDevAvailable) {
    console.log('🚀 Development server found! Loading dev version instead of production...');
    try {
      await loadDevScript();
      console.log('✅ Development version loaded successfully');
      // Exit early - don't run production code
      return;
    } catch (error) {
      console.warn('⚠️ Failed to load development version, falling back to production:', error);
    }
  } else {
    console.log('📦 Development server not available, running production version...');
  }
  
  // If we reach here, run the production code
  // The actual production code will be appended after this wrapper during build
})().then(() => {
  // Mark that we should continue with production code
  window.__CRUNCHBASE_SHOULD_RUN_PROD__ = true;
}).catch((error) => {
  console.error('❌ Error in production wrapper:', error);
  // Still run production code on wrapper error
  window.__CRUNCHBASE_SHOULD_RUN_PROD__ = true;
});

// Original production code below:
function N() {
  document.body.style.border = "5px solid navy", document.body.style.margin = "0", document.body.style.boxSizing = "border-box";
}
const M = () => {
  const n = document.querySelectorAll('[data-logo-slider="true"]'), o = 7;
  !n || n.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches || n.forEach((s) => {
    const e = s.querySelectorAll(":scope > *");
    e.length === 0 || e.length < o || (s.setAttribute("data-logo-slider-init", "true"), s.style.setProperty("--ls-items", e.length), e.forEach((t, i) => {
      t.style.setProperty("--ls-item-index", i + 1);
    }));
  });
};
function $() {
  class n {
    constructor(t) {
      this.container = t, this.currentIndex = 0, this.quotes = [], this.totalQuotes = 0, this.containerWidth = 0, this.isAnimating = !1, this.resizeTimeout = null, this.animationDuration = this.getCSSVariable(
        "--quotes-slider-duration",
        "400ms"
      ), this.animationEasing = this.getCSSVariable(
        "--quotes-slider-easing",
        "ease-out"
      ), this.init();
    }
    getCSSVariable(t, i) {
      return getComputedStyle(document.documentElement).getPropertyValue(
        t
      ).trim() || i;
    }
    init() {
      this.setupContainer(), this.calculateDimensions(), this.createNavigation(), this.bindEvents(), this.updateCurrentIndexFromScroll(), this.updateNavigationState();
    }
    setupContainer() {
      this.container.style.display = "flex", this.container.style.overflowX = "auto", this.container.style.scrollBehavior = "smooth", this.container.style.scrollbarWidth = "none", this.container.style.msOverflowStyle = "none";
      const t = document.createElement("style");
      t.textContent = `
        .quotes-slider-container::-webkit-scrollbar {
          display: none;
        }
        .quotes-slider-container {
          scroll-snap-type: x mandatory;
        }
        .quotes-slider-container > * {
          flex-shrink: 0;
          scroll-snap-align: start;
        }
      `, document.head.appendChild(t);
    }
    calculateDimensions() {
      this.containerWidth = this.container.offsetWidth, this.quotes = Array.from(this.container.children), this.totalQuotes = this.quotes.length;
      const t = getComputedStyle(this.container);
      this.gap = parseInt(t.gap) || 0;
      const i = window.matchMedia("(max-width: 991px)").matches;
      let r = 0;
      this.quoteData = this.quotes.map((a, l) => {
        let m;
        i ? (m = this.containerWidth, a.style.width = `${this.containerWidth}px`) : a.classList.contains("quote-card-featured") ? (m = 862, a.style.width = "862px") : a.classList.contains("quote-card") ? (m = 410, a.style.width = "410px") : m = a.getBoundingClientRect().width;
        const u = {
          element: a,
          width: m,
          offsetLeft: r,
          index: l
        };
        return r += m + (l < this.totalQuotes - 1 ? this.gap : 0), u;
      });
    }
    createNavigation() {
      const t = window.matchMedia("(max-width: 991px)").matches;
      this.navContainer = document.createElement("div"), this.navContainer.className = "quotes-slider-nav", this.navContainer.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 30px;
        justify-content: ${t ? "center" : "flex-start"};
      `, this.prevBtn = document.createElement("button"), this.prevBtn.className = "quotes-slider-prev", this.prevBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
          <path d="M6 0.999999L1 6L6 11.3333" stroke="#146AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `, this.prevBtn.style.cssText = `
        width: 34px;
        height: 34px;
        border-radius: 22px;
        border: 1.5px solid #146AFF;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        padding: 0;
      `, this.nextBtn = document.createElement("button"), this.nextBtn.className = "quotes-slider-next", this.nextBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none" style="transform: rotate(180deg);">
          <path d="M6 0.999999L1 6L6 11.3333" stroke="#146AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `, this.nextBtn.style.cssText = this.prevBtn.style.cssText, t || (this.progressContainer = document.createElement("div"), this.progressContainer.className = "quotes-slider-progress", this.progressContainer.style.cssText = `
          flex: 1;
          height: 4px;
          background: #E4EAEF;
          border-radius: 1px;
          overflow: hidden;
          margin-left: 35px;
        `, this.progressFill = document.createElement("div"), this.progressFill.className = "quotes-slider-progress-fill", this.progressFill.style.cssText = `
          height: 100%;
          background: #146AFF;
          border-radius: 1px;
          transition: width ${this.animationDuration} ${this.animationEasing};
          width: 0%;
        `, this.progressContainer.appendChild(this.progressFill)), this.navContainer.appendChild(this.prevBtn), this.navContainer.appendChild(this.nextBtn), !t && this.progressContainer && this.navContainer.appendChild(this.progressContainer), this.container.parentNode.insertBefore(
        this.navContainer,
        this.container.nextSibling
      );
    }
    bindEvents() {
      this.prevBtn.addEventListener("click", () => {
        this.prevBtn.disabled || (this.animateButtonClick(this.prevBtn), this.goToPrevious());
      }), this.nextBtn.addEventListener("click", () => {
        this.nextBtn.disabled || (this.animateButtonClick(this.nextBtn), this.goToNext());
      }), window.addEventListener("resize", () => {
        clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(() => {
          this.handleResize();
        }, 1e3);
      }), this.container.addEventListener("scroll", () => {
        this.updateCurrentIndexFromScroll();
      });
    }
    handleResize() {
      const t = this.navContainer.style.justifyContent === "center", i = window.matchMedia("(max-width: 991px)").matches;
      this.calculateDimensions(), t !== i && (this.navContainer && this.navContainer.parentNode && this.navContainer.parentNode.removeChild(this.navContainer), this.createNavigation()), this.updateNavigationState(), this.updateProgress();
    }
    goToNext() {
      if (this.isAnimating || this.currentIndex === this.totalQuotes - 1 && this.isAtScrollEnd())
        return;
      this.isAnimating = !0;
      const t = this.findNextNavigationTarget();
      t === -1 ? this.isAtScrollEnd() || this.scrollToRightAlignment() : this.shouldUseAdaptiveAlignment(t) ? this.scrollToRightAlignment() : this.scrollToQuote(t), setTimeout(() => {
        this.isAnimating = !1;
      }, parseInt(this.animationDuration));
    }
    goToPrevious() {
      if (!(this.isAnimating || this.currentIndex <= 0)) {
        if (this.isAnimating = !0, this.isAdaptiveAligning = !1, this.currentIndex === this.totalQuotes - 1)
          if (this.isAtScrollEnd()) {
            const i = Math.max(0, this.currentIndex - 2);
            this.currentIndex = i, this.scrollToQuote(this.currentIndex);
          } else
            this.currentIndex--, this.scrollToQuote(this.currentIndex);
        else
          this.currentIndex--, this.scrollToQuote(this.currentIndex);
        setTimeout(() => {
          this.isAnimating = !1;
        }, parseInt(this.animationDuration));
      }
    }
    shouldUseAdaptiveAlignment(t) {
      let i = 0;
      for (let l = t; l < this.totalQuotes; l++)
        i += this.quoteData[l].width, l < this.totalQuotes - 1 && (i += this.gap);
      return i <= this.containerWidth + 40;
    }
    scrollToQuote(t) {
      if (t < 0 || t >= this.totalQuotes) return;
      this.currentIndex = t;
      const r = this.quoteData[t].offsetLeft;
      this.container.scrollTo({
        left: r,
        behavior: "smooth"
      }), this.updateNavigationState(), setTimeout(() => {
        this.updateProgress();
      }, 50);
    }
    scrollToRightAlignment() {
      const t = this.quoteData[this.totalQuotes - 1], r = t.offsetLeft + t.width - this.containerWidth;
      this.currentIndex = this.totalQuotes - 1, this.isAdaptiveAligning = !0, this.container.scrollTo({
        left: Math.max(0, r),
        behavior: "smooth"
      }), this.updateNavigationState(), setTimeout(() => {
        this.updateProgress(), setTimeout(() => {
          this.isAdaptiveAligning = !1;
        }, parseInt(this.animationDuration));
      }, 50);
    }
    findNextNavigationTarget() {
      for (let t = this.currentIndex + 1; t < this.totalQuotes; t++)
        return t;
      return -1;
    }
    findLastVisibleQuoteIndex(t) {
      for (let i = this.totalQuotes - 1; i >= 0; i--)
        if (this.quoteData[i].offsetLeft <= t + 10)
          return i;
      return this.totalQuotes - 1;
    }
    updateCurrentIndexFromScroll() {
      if (this.isAdaptiveAligning)
        return;
      const t = this.container.scrollLeft;
      for (let i = 0; i < this.totalQuotes; i++) {
        const r = this.quoteData[i], a = r.offsetLeft, l = r.offsetLeft + r.width, m = t + this.containerWidth, u = Math.max(a, t), d = Math.min(l, m);
        if (Math.max(0, d - u) / r.width >= 0.3 || a >= t && a < m) {
          this.currentIndex !== i && (this.currentIndex = i, this.updateNavigationState(), this.updateProgress());
          break;
        }
      }
    }
    animateButtonClick(t) {
      t.style.transform = "scale(0.95)", setTimeout(() => {
        t.style.transform = "scale(1)";
      }, 200);
    }
    updateNavigationState() {
      this.prevBtn.disabled = this.currentIndex <= 0, this.updateButtonStyle(this.prevBtn);
      const t = this.currentIndex >= this.totalQuotes - 1 || this.isAtScrollEnd();
      this.nextBtn.disabled = t, this.updateButtonStyle(this.nextBtn);
    }
    updateButtonStyle(t) {
      const i = t.querySelector("path");
      t.disabled ? (t.style.background = "transparent", t.style.cursor = "not-allowed", t.style.opacity = "0.5", i && i.setAttribute("stroke", "#146AFF")) : (t.style.background = "#146AFF", t.style.cursor = "pointer", t.style.opacity = "1", i && i.setAttribute("stroke", "white"));
    }
    isAtScrollEnd() {
      const t = this.container.scrollLeft, i = this.container.scrollWidth - this.container.clientWidth;
      return Math.abs(t - i) < 5;
    }
    updateProgress() {
      if (!this.progressFill) return;
      const t = this.totalQuotes > 1 ? this.currentIndex / (this.totalQuotes - 1) * 100 : 0;
      this.progressFill.style.width = `${Math.min(100, Math.max(0, t))}%`;
    }
    // Public method to check if slider should be enabled
    shouldEnable() {
      return this.container.scrollWidth > this.container.clientWidth;
    }
    // Public method to disable slider
    disable() {
      this.navContainer.style.display = "none", this.container.style.overflowX = "visible";
    }
    // Public method to enable slider
    enable() {
      this.navContainer.style.display = "flex", this.container.style.overflowX = "auto";
    }
  }
  const o = document.querySelectorAll(".quotes-slider-container"), s = [];
  return console.log(`📊 Quotes Slider: Found ${o.length} containers`), o.forEach((e) => {
    const t = new n(e);
    t.shouldEnable() || t.disable(), s.push(t);
  }), window.quotesSliders = s, s;
}
function R() {
  class n {
    constructor() {
      this.init();
    }
    init() {
      this.processRatingElements();
    }
    processRatingElements() {
      const s = document.querySelectorAll("[rating-value]");
      console.log(`⭐ Star Rating: Found ${s.length} elements`), s.forEach((e, t) => {
        const i = e.getAttribute("rating-value"), r = this.snapToNearestTenth(parseFloat(i) || 0);
        e.innerHTML = "";
        const a = this.createStarContainer(r);
        e.appendChild(a), e.setAttribute("rating-value", r.toString());
      });
    }
    snapToNearestTenth(s) {
      const e = Math.max(0, Math.min(5, s));
      return Math.round(e * 10) / 10;
    }
    createStarContainer(s) {
      const e = document.createElement("div");
      e.style.cssText = `
        display: flex;
        gap: 2px;
        align-items: center;
      `;
      for (let t = 1; t <= 5; t++) {
        const i = this.createStar(t, s);
        e.appendChild(i);
      }
      return e;
    }
    createStar(s, e) {
      const t = document.createElement("div");
      t.style.cssText = `
        width: 19px;
        height: 19px;
        position: relative;
        display: inline-block;
      `;
      const i = this.getStarFillState(s, e), r = this.createStarSvg(i);
      return t.appendChild(r), t;
    }
    getStarFillState(s, e) {
      const t = s - 1;
      return e >= s ? "full" : e > t ? { type: "partial", percentage: ((e - t) * 100).toFixed(0) } : "empty";
    }
    createStarSvg(s) {
      const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      e.setAttribute("xmlns", "http://www.w3.org/2000/svg"), e.setAttribute("width", "19"), e.setAttribute("height", "19"), e.setAttribute("fill", "none"), e.setAttribute("viewBox", "0 0 19 19");
      const t = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      if (t.setAttribute(
        "d",
        "M9.26.745a.41.41 0 0 1 .735 0l2.548 5.162a.41.41 0 0 0 .308.224l5.697.828a.41.41 0 0 1 .228.7l-4.123 4.018a.41.41 0 0 0-.118.363l.973 5.674a.41.41 0 0 1-.594.432l-5.096-2.68a.41.41 0 0 0-.382 0l-5.095 2.68a.41.41 0 0 1-.595-.432l.973-5.674a.41.41 0 0 0-.118-.363L.48 7.658a.41.41 0 0 1 .227-.699l5.697-.828a.41.41 0 0 0 .309-.224L9.26.745Z"
      ), s === "full")
        t.setAttribute("fill", "currentColor");
      else if (s === "empty")
        t.setAttribute("fill", "currentColor"), t.setAttribute("opacity", "0.15");
      else if (s.type === "partial") {
        const i = `partial-fill-${s.percentage}`;
        t.setAttribute("fill", `url(#${i})`), this.ensurePartialFillGradient(e, s.percentage, i);
      }
      return e.appendChild(t), e;
    }
    ensurePartialFillGradient(s, e, t) {
      if (!document.getElementById(t)) {
        const i = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs"
        ), r = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "linearGradient"
        );
        r.setAttribute("id", t), r.setAttribute("gradientUnits", "objectBoundingBox"), r.setAttribute("x1", "0%"), r.setAttribute("y1", "0%"), r.setAttribute("x2", "100%"), r.setAttribute("y2", "0%");
        const a = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        a.setAttribute("offset", `${e}%`), a.setAttribute("stop-color", "currentColor");
        const l = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        l.setAttribute("offset", `${e}%`), l.setAttribute("stop-color", "currentColor"), l.setAttribute("stop-opacity", "0.15"), r.appendChild(a), r.appendChild(l), i.appendChild(r), s.appendChild(i);
      }
    }
  }
  new n();
}
function D() {
  class n {
    constructor() {
      this.init();
    }
    init() {
      this.bindEvents();
    }
    bindEvents() {
      document.addEventListener("click", (s) => {
        const e = s.target.closest("[data-cmp-table-trigger]");
        if (!e) return;
        const t = e.getAttribute("data-cmp-table-trigger"), i = e.closest(".comparison-table-container");
        i && (t === "first-column" ? this.activateFirstColumn(i) : t === "last-column" && this.activateLastColumn(i));
      });
    }
    activateFirstColumn(s) {
      const e = s.querySelector(
        '[data-cmp-table-trigger="first-column"]'
      ), t = s.querySelector(
        '[data-cmp-table-trigger="last-column"]'
      );
      e && e.classList.add("comparison-table-link-active"), t && t.classList.remove("comparison-table-link-active"), this.showFirstColumn(s);
    }
    activateLastColumn(s) {
      const e = s.querySelector(
        '[data-cmp-table-trigger="first-column"]'
      ), t = s.querySelector(
        '[data-cmp-table-trigger="last-column"]'
      );
      e && e.classList.remove("comparison-table-link-active"), t && t.classList.add("comparison-table-link-active"), this.showLastColumn(s);
    }
    showFirstColumn(s) {
      s.querySelectorAll(
        ".cmp-table-row.cmp-table-row-first"
      ).forEach((i) => {
        i.style.display = "flex";
      }), s.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      ).forEach((i) => {
        i.style.display = "none";
      });
    }
    showLastColumn(s) {
      s.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      ).forEach((i) => {
        i.style.display = "flex";
      }), s.querySelectorAll(
        ".cmp-table-row.cmp-table-row-first"
      ).forEach((i) => {
        i.style.display = "none";
      });
    }
  }
  new n();
}
function O() {
  const n = document.querySelectorAll(".tabs.w-tabs");
  n.length !== 0 && (console.log(`📱 Tabs Select: Found ${n.length} tab containers`), n.forEach((o) => {
    const s = o.querySelectorAll(".tab-link");
    if (s.length === 0 || o.querySelector(".tabs-select"))
      return;
    const e = document.createElement("select");
    e.className = "tabs-select";
    const t = document.createElement("option");
    t.value = "", t.textContent = "Select a tab...", t.disabled = !0, e.appendChild(t), s.forEach((i, r) => {
      const a = document.createElement("option");
      a.value = r, a.textContent = i.textContent.trim() || `Tab ${r + 1}`, i.classList.contains("w--current") && (a.selected = !0, t.disabled = !1, t.selected = !1), e.appendChild(a);
    }), e.addEventListener("change", function() {
      const i = parseInt(this.value);
      !isNaN(i) && s[i] && s[i].click();
    }), o.insertBefore(e, o.firstChild);
  }), _());
}
function _() {
  if (document.getElementById("tabs-select-styles")) return;
  const n = document.createElement("style");
  n.id = "tabs-select-styles", n.textContent = `
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
  `, document.head.appendChild(n);
}
function P() {
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", k) : k();
}
function k() {
  const n = document.querySelectorAll(".tabbed-cards");
  n.length !== 0 && (console.log(
    `🎴 Tabbed Cards: Found ${n.length} containers`
  ), n.forEach((o) => {
    Q(o);
  }));
}
function Q(n) {
  const o = n.querySelector(".tabbed-cards-image"), s = n.querySelectorAll(".tabbed-card.w-dropdown");
  !o || s.length === 0 || (W(s), U(s, o), s.forEach((e, t) => {
    z(e, t, n, o);
  }), H(s, o), V());
}
function W(n) {
  n.forEach((o, s) => {
    const t = o.querySelector(".tabbed-card-image-wrapper")?.querySelector("img");
    if (!t) return;
    const i = document.createElement("div");
    i.className = "tabbed-card-mobile-image", i.dataset.cardIndex = s;
    const r = t.cloneNode(!0);
    i.appendChild(r), o.parentNode.insertBefore(i, o.nextSibling);
  });
}
function U(n, o) {
  o.innerHTML = "";
  const s = document.createElement("img");
  s.style.width = "100%", s.style.height = "auto", s.style.display = "block", s.style.transition = "opacity 0.2s ease", s.className = "tabbed-card-main-image", o.appendChild(s), n.forEach((e) => {
    const t = e.querySelector(".tabbed-card-image-wrapper img");
    if (t?.src) {
      const i = new Image();
      i.src = t.src;
    }
  });
}
function z(n, o, s, e) {
  const t = n.querySelector(".tabbed-card-toggler");
  if (!t) return;
  t.addEventListener("click", () => {
    t.getAttribute("aria-expanded") === "true" || (j(n, s), setTimeout(() => {
      C(o, e), E(o, s);
    }, 100));
  }), new MutationObserver((r) => {
    r.forEach((a) => {
      a.attributeName === "aria-expanded" && t.getAttribute("aria-expanded") === "true" && (C(o, e), E(o, s));
    });
  }).observe(t, {
    attributes: !0,
    attributeFilter: ["aria-expanded"]
  });
}
function j(n, o) {
  o.querySelectorAll(".tabbed-card.w-dropdown").forEach((e) => {
    if (e !== n) {
      const t = e.querySelector(".tabbed-card-toggler");
      t && t.getAttribute("aria-expanded") === "true" && (t.click(), setTimeout(() => {
        if (t.getAttribute("aria-expanded") === "true") {
          t.setAttribute("aria-expanded", "false");
          const i = e.querySelector(".w-dropdown"), r = e.querySelector(".w-dropdown-list"), a = e.querySelector(".w-dropdown-toggle");
          i?.classList.remove("w--open"), r?.classList.remove("w--open"), a?.classList.remove("w--open");
        }
      }, 50));
    }
  });
}
function C(n, o) {
  const s = o.querySelector(".tabbed-card-main-image");
  if (!s) return;
  const t = o.closest(".tabbed-cards").querySelectorAll(".tabbed-card.w-dropdown")[n];
  if (!t) return;
  const i = t.querySelector(".tabbed-card-image-wrapper img");
  i && s.src !== i.src && (s.style.opacity = "0.5", s.src = i.src, s.alt = i.alt || "", s.onload = () => {
    s.style.opacity = "1";
  });
}
function E(n, o) {
  o.querySelectorAll(
    ".tabbed-card-mobile-image"
  ).forEach((t) => {
    t.style.display = "none";
  });
  const e = o.querySelector(
    `[data-card-index="${n}"]`
  );
  e && (e.style.display = "block");
}
function V() {
  if (document.getElementById("tabbed-cards-mobile-styles")) return;
  const n = document.createElement("style");
  n.id = "tabbed-cards-mobile-styles", n.textContent = `
    /* Desktop: Show original images in content, hide mobile siblings */
    @media (min-width: 992px) {
      .tabbed-card-image-wrapper {
        display: block !important;
      }
      .tabbed-card-mobile-image {
        display: none !important;
      }
    }

    /* Mobile/Tablet: Hide original images, show mobile siblings when active */
    @media (max-width: 991px) {
      .tabbed-card-image-wrapper {
        display: none !important;
      }
      .tabbed-card-mobile-image {
        display: none;
        margin-top: 16px;
        width: 100%;
      }
      .tabbed-card-mobile-image img {
        width: 100%;
        height: auto;
        border-radius: 8px;
      }
    }
  `, document.head.appendChild(n);
}
function H(n, o) {
  if (n.length === 0) return;
  const s = n[0], e = s.querySelector(".tabbed-card-toggler");
  e && (n.forEach((t, i) => {
    if (i !== 0) {
      const r = t.querySelector(".tabbed-card-toggler");
      r?.getAttribute("aria-expanded") === "true" && r.click();
    }
  }), setTimeout(() => {
    e.getAttribute("aria-expanded") === "true" || (e.click(), setTimeout(() => {
      if (e.getAttribute("aria-expanded") !== "true") {
        e.setAttribute("aria-expanded", "true");
        const i = s.querySelector(".w-dropdown"), r = s.querySelector(".w-dropdown-list"), a = s.querySelector(".w-dropdown-toggle");
        i?.classList.add("w--open"), r?.classList.add("w--open"), a?.classList.add("w--open");
      }
    }, 100)), C(0, o), E(0, s.closest(".tabbed-cards"));
  }, 200));
}
const A = {
  baseUrl: "https://pages.crunchbase.com",
  munchkinId: "976-JJA-800",
  cssUrl: "https://app-sj22.marketo.com/js/forms2/css/forms2.css",
  jsUrl: "https://pages.crunchbase.com/js/forms2/js/forms2.min.js"
};
let x = {
  css: !1,
  js: !1
};
function G() {
  return new Promise((n) => {
    if (x.css || document.querySelector(`link[href="${A.cssUrl}"]`)) {
      x.css = !0, n();
      return;
    }
    const o = document.createElement("link");
    o.rel = "stylesheet", o.href = A.cssUrl, o.onload = () => {
      x.css = !0, n();
    }, o.onerror = () => {
      console.error("❌ Failed to load Marketo CSS"), n();
    }, document.head.appendChild(o);
  });
}
function X() {
  return new Promise((n) => {
    if (x.js || window.MktoForms2) {
      x.js = !0, n();
      return;
    }
    const o = document.createElement("script");
    o.src = A.jsUrl, o.onload = () => {
      x.js = !0, n();
    }, o.onerror = () => {
      console.error("❌ Failed to load Marketo JS"), n();
    }, document.head.appendChild(o);
  });
}
function J(n) {
  try {
    const o = n.getFormElem()[0], s = Array.from(
      o.querySelectorAll(".mktoFormRow")
    ).filter((e) => !e.querySelector('input[type="hidden"]'));
    o.querySelectorAll(".is-odd-last").forEach((e) => e.classList.remove("is-odd-last")), s.length % 2 === 1 && s[s.length - 1].classList.add("is-odd-last");
  } catch (o) {
    console.error("❌ Error applying layout:", o);
  }
}
let L = 0;
function T(n, o) {
  try {
    if (n.hasAttribute("data-marketo-initialized"))
      return;
    L++;
    const s = `mktoForm_${o}_${L}`;
    n.innerHTML = "";
    const e = document.createElement("form");
    e.id = s, n.appendChild(e), n.setAttribute("data-marketo-initialized", "true"), n.setAttribute("data-marketo-unique-id", s), window.MktoForms2.loadForm(
      A.baseUrl,
      A.munchkinId,
      parseInt(o),
      function(t) {
        const i = t.getFormElem()[0];
        i && (e.parentNode.replaceChild(i, e), i.id = s), setTimeout(() => J(t), 100);
        const r = new CustomEvent("marketoFormLoaded", {
          detail: { form: t, formId: o, container: n, uniqueId: s }
        });
        n.dispatchEvent(r);
      }
    );
  } catch (s) {
    console.error(`❌ Error initializing Marketo form ${o}:`, s);
  }
}
function Y() {
  const n = document.querySelectorAll("[data-marketo-id]");
  n.length !== 0 && (console.log(`🎯 Found ${n.length} Marketo form container(s)`), n.forEach((o, s) => {
    const e = o.getAttribute("data-marketo-id");
    if (!e) {
      console.warn(
        `⚠️ Container ${s + 1} has data-marketo-id but no value`
      );
      return;
    }
    setTimeout(() => {
      T(o, e);
    }, s * 100);
  }));
}
function K() {
  Promise.all([G(), X()]).then(() => {
    setTimeout(() => {
      window.MktoForms2 ? (Y(), new MutationObserver((o) => {
        o.forEach((s) => {
          s.addedNodes.forEach((e) => {
            if (e.nodeType === 1) {
              if (e.hasAttribute && e.hasAttribute("data-marketo-id")) {
                const i = e.getAttribute("data-marketo-id");
                setTimeout(() => T(e, i), 100);
              }
              (e.querySelectorAll ? e.querySelectorAll("[data-marketo-id]") : []).forEach((i, r) => {
                const a = i.getAttribute("data-marketo-id");
                a && setTimeout(
                  () => T(i, a),
                  (r + 1) * 100
                );
              });
            }
          });
        });
      }).observe(document.body, {
        childList: !0,
        subtree: !0
      })) : console.error("❌ MktoForms2 not available after loading resources");
    }, 500);
  }).catch((n) => {
    console.error("❌ Error loading Marketo resources:", n);
  });
}
function Z() {
  class n {
    constructor(t) {
      this.wrapper = t, this.itemsContainer = t.querySelector(
        ".related-item-collection-list"
      ), this.items = Array.from(t.querySelectorAll(".collection-item")), this.currentIndex = 0, this.totalItems = this.items.length, this.gap = 20, this.isAnimating = !1, this.resizeTimeout = null, this.animationDuration = this.getCSSVariable(
        "--related-articles-slider-duration",
        "400ms"
      ), this.animationEasing = this.getCSSVariable(
        "--related-articles-slider-easing",
        "ease-out"
      ), this.forceEnable = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1", this.init();
    }
    getCSSVariable(t, i) {
      return getComputedStyle(document.documentElement).getPropertyValue(t).trim() || i;
    }
    init() {
      if (!this.wrapper || !this.itemsContainer || this.totalItems === 0) {
        console.warn("Related Articles Slider: Required elements not found");
        return;
      }
      this.isEnabled = this.shouldEnable(), this.isEnabled && this.setupSlider(), window.addEventListener("resize", () => {
        clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(() => this.handleResize(), 150);
      });
    }
    shouldEnable() {
      return window.matchMedia("(max-width: 991px)").matches || this.forceEnable;
    }
    setupSlider() {
      this.updateDimensions(), this.wrapper.style.overflow = "hidden", this.itemsContainer.style.cssText = `
        display: flex !important;
        scroll-behavior: smooth;
        gap: ${this.gap}px !important;
        transition: transform ${this.animationDuration} ${this.animationEasing};
        grid-template-columns: none !important;
        grid-template-rows: none !important;
        grid-auto-flow: none !important;
      `, this.applyItemStyles(), this.navContainer || (this.createNavigation(), this.attachEventListeners()), this.updateNavigationState();
    }
    updateDimensions() {
      this.containerWidth = this.itemsContainer.offsetWidth, this.itemsPerView = 1, this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
    }
    applyItemStyles() {
      const t = this.containerWidth;
      this.items.forEach((i) => {
        i.style.cssText = `
          flex-shrink: 0;
          width: ${t}px !important;
          min-width: ${t}px !important;
          max-width: ${t}px !important;
          grid-column: unset !important;
          grid-row: unset !important;
          grid-area: unset !important;
          place-self: unset !important;
          align-self: unset !important;
          justify-self: unset !important;
        `;
      });
    }
    createNavigation() {
      this.navContainer = document.createElement("div"), this.navContainer.className = "related-articles-slider-nav", this.navContainer.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 30px;
        justify-content: center;
      `;
      const t = `
        width: 34px;
        height: 34px;
        border-radius: 22px;
        border: 1.5px solid #146AFF;
        background: transparent;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        padding: 0;
      `;
      this.prevBtn = document.createElement("button"), this.prevBtn.className = "related-articles-slider-prev", this.prevBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
          <path d="M6 0.999999L1 6L6 11.3333" stroke="#146AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `, this.prevBtn.style.cssText = t, this.nextBtn = document.createElement("button"), this.nextBtn.className = "related-articles-slider-next", this.nextBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none" style="transform: rotate(180deg);">
          <path d="M6 0.999999L1 6L6 11.3333" stroke="#146AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `, this.nextBtn.style.cssText = t, this.navContainer.appendChild(this.prevBtn), this.navContainer.appendChild(this.nextBtn), this.wrapper.parentNode.insertBefore(
        this.navContainer,
        this.wrapper.nextSibling
      );
    }
    attachEventListeners() {
      this.prevBtn && this.prevBtn.addEventListener("click", () => this.goToPrevious()), this.nextBtn && this.nextBtn.addEventListener("click", () => this.goToNext());
    }
    goToNext() {
      this.isAnimating || this.currentIndex >= this.maxIndex || this.navigateTo(this.currentIndex + 1);
    }
    goToPrevious() {
      this.isAnimating || this.currentIndex <= 0 || this.navigateTo(this.currentIndex - 1);
    }
    navigateTo(t) {
      this.isAnimating = !0, this.currentIndex = Math.max(0, Math.min(t, this.maxIndex));
      const i = -(this.currentIndex * (this.containerWidth + this.gap));
      this.itemsContainer.style.transform = `translateX(${i}px)`, this.updateNavigationState(), setTimeout(() => {
        this.isAnimating = !1;
      }, parseInt(this.animationDuration));
    }
    updateNavigationState() {
      !this.prevBtn || !this.nextBtn || (this.currentIndex <= 0 ? (this.prevBtn.style.opacity = "0.3", this.prevBtn.style.cursor = "not-allowed") : (this.prevBtn.style.opacity = "1", this.prevBtn.style.cursor = "pointer"), this.currentIndex >= this.maxIndex ? (this.nextBtn.style.opacity = "0.3", this.nextBtn.style.cursor = "not-allowed") : (this.nextBtn.style.opacity = "1", this.nextBtn.style.cursor = "pointer"));
    }
    handleResize() {
      const t = this.shouldEnable();
      t && !this.isEnabled ? (this.isEnabled = !0, this.setupSlider()) : !t && this.isEnabled ? (this.isEnabled = !1, this.restoreOriginalLayout()) : this.isEnabled && (this.updateDimensions(), this.applyItemStyles(), this.currentIndex > this.maxIndex && (this.currentIndex = this.maxIndex), this.navigateTo(this.currentIndex));
    }
    restoreOriginalLayout() {
      this.wrapper.style.overflow = "", this.itemsContainer.removeAttribute("style"), this.items.forEach((t) => t.removeAttribute("style")), this.navContainer && this.navContainer.parentNode && (this.navContainer.parentNode.removeChild(this.navContainer), this.navContainer = null, this.prevBtn = null, this.nextBtn = null);
    }
  }
  const o = document.querySelectorAll(
    ".related-item-collection-list-wrapper"
  ), s = [];
  return console.log(
    `📰 Related Articles Slider: Found ${o.length} containers`
  ), o.forEach((e) => {
    const t = e, i = e.querySelector(
      ".related-item-collection-list"
    ), r = e.querySelectorAll(".collection-item");
    if (t && i && r.length > 0) {
      const a = new n(t);
      s.push(a);
    }
  }), window.relatedArticlesSliders = s, s;
}
function tt() {
  const n = () => {
    const o = document.querySelector(".blog-content-richtext");
    if (!o)
      return;
    console.log("📖 Reading Time Estimate: Found rich text element");
    const e = (o.textContent || o.innerText).trim().split(/\s+/).length, i = Math.ceil(e / 200), r = document.querySelector(".read-time-estimate");
    r && (r.textContent = `${i} min read`), o.querySelectorAll("iframe").forEach((l) => {
      const m = l.getAttribute("src") || "";
      (m.includes("youtube.com") || m.includes("youtu.be")) && l.classList.add("youtube-iframe");
    });
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", n) : n();
}
function et() {
  const n = () => {
    const o = document.querySelectorAll("[data-toc-content]");
    o.length !== 0 && (console.log(
      `📚 Table of Contents: Found ${o.length} content element(s)`
    ), o.forEach((s) => {
      const e = s.getAttribute("data-toc-content"), t = document.querySelector(
        `[data-toc-target="${e}"]`
      );
      if (!t) {
        console.warn(`📚 Table of Contents: No target found for "${e}"`);
        return;
      }
      const r = s.querySelectorAll("h2");
      if (r.length === 0)
        return;
      let a = null, l = !1;
      function m() {
        const p = document.createElement("ul");
        r.forEach((f, c) => {
          const h = document.createElement("li"), g = document.createElement("a"), v = f.textContent.trim();
          let w = f.getAttribute("id");
          w || (w = v.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim(), f.setAttribute("id", w)), g.href = `#${w}`, g.textContent = v, g.classList.add("toc-link"), g.dataset.tocId = e, c === 0 && (g.classList.add("active"), a = g), h.appendChild(g), p.appendChild(h);
        }), t.innerHTML = "", t.appendChild(p);
      }
      m();
      const u = t.querySelectorAll(".toc-link");
      function d(p) {
        l || a === p || (l = !0, requestAnimationFrame(() => {
          a && a.classList.remove("active"), p && p.classList.add("active"), a = p, l = !1;
        }));
      }
      u.forEach((p) => {
        p.addEventListener("click", function(f) {
          f.preventDefault();
          const c = this.getAttribute("href").substring(1), h = document.getElementById(c);
          h && h.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });
      });
      let b = !1;
      function y() {
        b || (b = !0, requestAnimationFrame(() => {
          const p = window.scrollY;
          let f = null;
          for (let c = r.length - 1; c >= 0; c--) {
            const h = r[c], g = h.offsetTop;
            if (p >= g - 100) {
              f = h;
              break;
            }
          }
          if (!f && r.length > 0) {
            const c = r[0];
            p < c.offsetTop - 100 && (f = c);
          }
          if (f) {
            const c = t.querySelector(
              `.toc-link[href="#${f.getAttribute("id")}"]`
            );
            d(c);
          }
          b = !1;
        }));
      }
      window.addEventListener("scroll", y, { passive: !0 });
    }));
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", n) : n();
}
function it() {
  const n = document.querySelectorAll("[data-tab-for]");
  if (n.length === 0) return;
  const o = /* @__PURE__ */ new Map();
  n.forEach((e) => {
    let t = e.closest('[role="tablist"]') || e.closest(".hero-tabs") || e.closest(".pricing-card-toggle") || e.parentElement;
    o.has(t) || o.set(t, []), o.get(t).push(e);
  }), st();
  let s = 0;
  o.forEach((e, t) => {
    nt(t, e, s++);
  });
}
function st() {
  const n = document.querySelectorAll("[data-tab-for]"), o = [], s = /* @__PURE__ */ new Set();
  n.forEach((e) => {
    const t = e.getAttribute("data-tab-for");
    t && !s.has(t) && (o.push(t), s.add(t));
  }), o.forEach((e, t) => {
    const i = document.querySelectorAll(
      `[data-tab-container="${e}"]`
    ), r = t === 0;
    i.forEach((a) => {
      a.style.display = r ? "block" : "none", a.setAttribute("aria-hidden", r ? "false" : "true");
    });
  });
}
function nt(n, o, s) {
  if (o.length === 0) return;
  const e = `hero-tabs-${s}`, t = `${e}-tablist`;
  n.getAttribute("role") || n.setAttribute("role", "tablist"), n.getAttribute("id") || n.setAttribute("id", t), n.getAttribute("aria-label") || n.setAttribute("aria-label", "Tab navigation"), o.forEach((i, r) => {
    const a = i.getAttribute("data-tab-for"), l = document.querySelector(
      `[data-tab-container="${a}"]`
    );
    if (!l) return;
    const m = `${e}-tab-${r}`, u = `${e}-panel-${r}`;
    i.getAttribute("role") || i.setAttribute("role", "tab"), i.getAttribute("id") || i.setAttribute("id", m), i.setAttribute("aria-controls", u);
    const d = l.style.display !== "none";
    i.setAttribute("tabindex", d ? "0" : "-1"), i.setAttribute("aria-selected", d ? "true" : "false"), i.classList.toggle("hero-tabs-item-active", d), l.setAttribute("role", "tabpanel"), l.setAttribute("id", u), l.setAttribute(
      "aria-labelledby",
      i.getAttribute("id") || m
    ), l.setAttribute("tabindex", "0"), i.addEventListener("click", (b) => {
      b.preventDefault(), I(i.getAttribute("data-tab-for"), n);
    }), i.addEventListener(
      "keydown",
      (b) => ot(b, n, o, r)
    ), i.addEventListener("focus", () => {
      i.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
}
function I(n, o = null) {
  const s = document.querySelectorAll("[data-tab-for]"), e = document.querySelectorAll("[data-tab-container]");
  let t = null, i = null;
  e.forEach((r) => {
    const l = r.getAttribute("data-tab-container") === n;
    r.style.display = l ? "block" : "none", r.setAttribute("aria-hidden", l ? "false" : "true");
  }), s.forEach((r) => {
    const l = r.getAttribute("data-tab-for") === n;
    r.classList.toggle("hero-tabs-item-active", l), r.setAttribute("aria-selected", l ? "true" : "false"), r.setAttribute("tabindex", l ? "0" : "-1"), l && (t = r, o && (r.closest('[role="tablist"]') === o || r.closest(".hero-tabs") === o || r.closest(".pricing-card-toggle") === o || r.parentElement === o) && (i = r));
  }), t && rt(t), i && i.focus();
}
function ot(n, o, s, e) {
  let t = e;
  switch (n.key) {
    case "ArrowLeft":
    case "ArrowUp":
      n.preventDefault(), t = e > 0 ? e - 1 : s.length - 1;
      break;
    case "ArrowRight":
    case "ArrowDown":
      n.preventDefault(), t = e < s.length - 1 ? e + 1 : 0;
      break;
    case "Home":
      n.preventDefault(), t = 0;
      break;
    case "End":
      n.preventDefault(), t = s.length - 1;
      break;
    case "Enter":
    case " ":
      n.preventDefault(), I(
        s[e].getAttribute("data-tab-for"),
        o
      );
      return;
    default:
      return;
  }
  s[t].focus();
}
function rt(n) {
  const o = document.createElement("div");
  o.setAttribute("aria-live", "polite"), o.setAttribute("aria-atomic", "true"), o.className = "sr-only", o.style.cssText = `
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  `, o.textContent = `${n.textContent.trim()} tab selected`, document.body.appendChild(o), setTimeout(() => {
    o.parentNode && o.parentNode.removeChild(o);
  }, 1e3);
}
function F() {
  if (document.getElementById("hero-tabs-styles")) return;
  const n = document.createElement("style");
  n.id = "hero-tabs-styles", n.textContent = `
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
  `, document.head.appendChild(n);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", F) : F();
function at() {
  console.log("🔍 Case Study Filter: Starting...");
  const n = ".case-study-cards-grid", o = ".case-study-card", s = "data-filter-control", e = 3e3, t = document.querySelector(n);
  if (!t) {
    console.warn(
      `⚠️ Case Study Filter: Container "${n}" not found`
    );
    return;
  }
  const i = Array.from(t.querySelectorAll(o)).map(
    (u) => {
      const d = u.closest(".w-dyn-item");
      return { card: u, parent: d };
    }
  );
  if (i.length === 0) {
    console.warn(
      `⚠️ Case Study Filter: No cards found with selector "${o}"`
    );
    return;
  }
  console.log(`📊 Case Study Filter: Found ${i.length} cards`);
  const r = Array.from(
    document.querySelectorAll(`[${s}]`)
  );
  if (r.length === 0) {
    console.warn(
      `⚠️ Case Study Filter: No filter controls found with attribute "${s}"`
    );
    return;
  }
  console.log(
    `🎛️ Case Study Filter: Found ${r.length} filter control(s)`
  );
  const a = {};
  r.forEach((u) => {
    const d = u.getAttribute(s);
    d && (d === "use-case" ? (console.log(
      `⏳ Use Case filter: Waiting ${e}ms for dynamic content to load...`
    ), setTimeout(() => {
      console.log(
        "✨ Use Case filter: Dynamic content loaded, initializing..."
      ), l(u, d);
    }, e)) : l(u, d));
  });
  function l(u, d) {
    const b = `data-filter-${d}`;
    console.log(`🔧 Setting up filter: ${d} (${b})`);
    const y = /* @__PURE__ */ new Set();
    i.forEach(({ card: c }) => {
      if (d === "use-case") {
        const h = c.querySelector('[fs-list-nest="use-cases"]');
        h && h.querySelectorAll(
          '[role="listitem"].w-dyn-item'
        ).forEach((v) => {
          const w = v.textContent.trim();
          w && y.add(w);
        });
      } else {
        const h = c.getAttribute(b);
        h && h.trim() && y.add(h.trim());
      }
    });
    const p = Array.from(y).sort(
      (c, h) => c.localeCompare(h)
    );
    console.log(`   Found ${p.length} unique values:`, p);
    const f = Array.from(u.options);
    for (let c = f.length - 1; c >= 0; c--)
      c === 0 && (!f[c].value || f[c].value === "") || u.remove(c);
    p.forEach((c) => {
      const h = document.createElement("option");
      h.value = c, h.textContent = c, u.appendChild(h);
    }), a[d] = "", u.addEventListener("change", function() {
      a[d] = this.value, console.log(`🔄 Filter changed: ${d} = "${this.value}"`), this.value ? this.style.color = "var(--_colors---primary--dark-blue)" : this.style.color = "", m();
    });
  }
  function m() {
    console.log("🎯 Applying filters:", a);
    let u = 0, d = 0;
    i.forEach(({ card: y, parent: p }) => {
      let f = !0;
      for (const [c, h] of Object.entries(a)) {
        if (!h) continue;
        let g = !1;
        if (c === "use-case") {
          const v = y.querySelector('[fs-list-nest="use-cases"]');
          if (v) {
            const w = v.querySelectorAll(
              '[role="listitem"].w-dyn-item'
            );
            for (const B of w)
              if (B.textContent.trim() === h) {
                g = !0;
                break;
              }
          }
        } else {
          const v = `data-filter-${c}`;
          g = y.getAttribute(v) === h;
        }
        if (!g) {
          f = !1;
          break;
        }
      }
      p ? f ? (p.style.display = "", u++) : (p.style.display = "none", d++) : f ? (y.style.display = "", u++) : (y.style.display = "none", d++);
    }), console.log(
      `✅ Filter applied: ${u} visible, ${d} hidden`
    );
    const b = new CustomEvent("caseStudyFiltersApplied", {
      detail: {
        activeFilters: a,
        visibleCount: u,
        hiddenCount: d,
        totalCount: i.length
      }
    });
    document.dispatchEvent(b);
  }
  m(), console.log("✅ Case Study Filter: Complete");
}
const q = {
  demo: N,
  logoSlider: M,
  quotesSlider: $,
  starRating: R,
  comparisonTableToggler: D,
  tabsSelect: O,
  tabbedCards: P,
  marketoForms: K,
  relatedArticlesSlider: Z,
  readingTimeEstimate: tt,
  tableOfContents: et,
  heroTabs: it,
  caseStudyFilter: at
  // Add more features here as you create them
  // myFeature: initMyFeature,
};
function lt(n = ["demo"]) {
  n.forEach((o) => {
    if (q[o])
      try {
        q[o]();
      } catch (s) {
        console.error(`❌ Error initializing feature '${o}':`, s);
      }
    else
      console.warn(`⚠️ Feature '${o}' not found`);
  });
}
if (typeof window < "u" && !window.__CRUNCHBASE_SHOULD_RUN_PROD__) {
  const n = setInterval(() => {
    window.__CRUNCHBASE_SHOULD_RUN_PROD__ && (clearInterval(n), S());
  }, 50);
  setTimeout(() => {
    clearInterval(n), window.__CRUNCHBASE_SHOULD_RUN_PROD__ || (console.log(
      "⏰ Timeout waiting for wrapper, running production code anyway..."
    ), S());
  }, 5e3);
} else
  S();
function S() {
  console.log("🚀 Crunchbase Webflow script loaded"), lt([
    "logoSlider",
    "quotesSlider",
    "starRating",
    "comparisonTableToggler",
    "tabsSelect",
    "tabbedCards",
    // RE-ENABLED with safer implementation
    "marketoForms",
    // Marketo forms integration
    // "pricingCardToggler", // Pricing card annual/monthly toggler
    "relatedArticlesSlider",
    // Related articles slider for blog posts
    "readingTimeEstimate",
    // Reading time estimate for blog posts
    "tableOfContents",
    // Table of contents for blog posts
    "heroTabs",
    // Hero tabs with accessibility features
    "caseStudyFilter"
    // Case study filtering system
  ]);
}
