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
    const i = s.querySelectorAll(":scope > *");
    i.length === 0 || i.length < o || (s.setAttribute("data-logo-slider-init", "true"), s.style.setProperty("--ls-items", i.length), i.forEach((t, e) => {
      t.style.setProperty("--ls-item-index", e + 1);
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
    getCSSVariable(t, e) {
      return getComputedStyle(document.documentElement).getPropertyValue(
        t
      ).trim() || e;
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
      const e = window.matchMedia("(max-width: 991px)").matches;
      let r = 0;
      this.quoteData = this.quotes.map((a, l) => {
        let p;
        e ? (p = this.containerWidth, a.style.width = `${this.containerWidth}px`) : a.classList.contains("quote-card-featured") ? (p = 862, a.style.width = "862px") : a.classList.contains("quote-card") ? (p = 410, a.style.width = "410px") : p = a.getBoundingClientRect().width;
        const h = {
          element: a,
          width: p,
          offsetLeft: r,
          index: l
        };
        return r += p + (l < this.totalQuotes - 1 ? this.gap : 0), h;
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
      const t = this.navContainer.style.justifyContent === "center", e = window.matchMedia("(max-width: 991px)").matches;
      this.calculateDimensions(), t !== e && (this.navContainer && this.navContainer.parentNode && this.navContainer.parentNode.removeChild(this.navContainer), this.createNavigation()), this.updateNavigationState(), this.updateProgress();
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
            const e = Math.max(0, this.currentIndex - 2);
            this.currentIndex = e, this.scrollToQuote(this.currentIndex);
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
      let e = 0;
      for (let l = t; l < this.totalQuotes; l++)
        e += this.quoteData[l].width, l < this.totalQuotes - 1 && (e += this.gap);
      return e <= this.containerWidth + 40;
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
      for (let e = this.totalQuotes - 1; e >= 0; e--)
        if (this.quoteData[e].offsetLeft <= t + 10)
          return e;
      return this.totalQuotes - 1;
    }
    updateCurrentIndexFromScroll() {
      if (this.isAdaptiveAligning)
        return;
      const t = this.container.scrollLeft;
      for (let e = 0; e < this.totalQuotes; e++) {
        const r = this.quoteData[e], a = r.offsetLeft, l = r.offsetLeft + r.width, p = t + this.containerWidth, h = Math.max(a, t), c = Math.min(l, p);
        if (Math.max(0, c - h) / r.width >= 0.3 || a >= t && a < p) {
          this.currentIndex !== e && (this.currentIndex = e, this.updateNavigationState(), this.updateProgress());
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
      const e = t.querySelector("path");
      t.disabled ? (t.style.background = "transparent", t.style.cursor = "not-allowed", t.style.opacity = "0.5", e && e.setAttribute("stroke", "#146AFF")) : (t.style.background = "#146AFF", t.style.cursor = "pointer", t.style.opacity = "1", e && e.setAttribute("stroke", "white"));
    }
    isAtScrollEnd() {
      const t = this.container.scrollLeft, e = this.container.scrollWidth - this.container.clientWidth;
      return Math.abs(t - e) < 5;
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
  return console.log(`📊 Quotes Slider: Found ${o.length} containers`), o.forEach((i) => {
    const t = new n(i);
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
      console.log(`⭐ Star Rating: Found ${s.length} elements`), s.forEach((i, t) => {
        const e = i.getAttribute("rating-value"), r = this.snapToNearestTenth(parseFloat(e) || 0);
        i.innerHTML = "";
        const a = this.createStarContainer(r);
        i.appendChild(a), i.setAttribute("rating-value", r.toString());
      });
    }
    snapToNearestTenth(s) {
      const i = Math.max(0, Math.min(5, s));
      return Math.round(i * 10) / 10;
    }
    createStarContainer(s) {
      const i = document.createElement("div");
      i.style.cssText = `
        display: flex;
        gap: 2px;
        align-items: center;
      `;
      for (let t = 1; t <= 5; t++) {
        const e = this.createStar(t, s);
        i.appendChild(e);
      }
      return i;
    }
    createStar(s, i) {
      const t = document.createElement("div");
      t.style.cssText = `
        width: 19px;
        height: 19px;
        position: relative;
        display: inline-block;
      `;
      const e = this.getStarFillState(s, i), r = this.createStarSvg(e);
      return t.appendChild(r), t;
    }
    getStarFillState(s, i) {
      const t = s - 1;
      return i >= s ? "full" : i > t ? { type: "partial", percentage: ((i - t) * 100).toFixed(0) } : "empty";
    }
    createStarSvg(s) {
      const i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      i.setAttribute("xmlns", "http://www.w3.org/2000/svg"), i.setAttribute("width", "19"), i.setAttribute("height", "19"), i.setAttribute("fill", "none"), i.setAttribute("viewBox", "0 0 19 19");
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
        const e = `partial-fill-${s.percentage}`;
        t.setAttribute("fill", `url(#${e})`), this.ensurePartialFillGradient(i, s.percentage, e);
      }
      return i.appendChild(t), i;
    }
    ensurePartialFillGradient(s, i, t) {
      if (!document.getElementById(t)) {
        const e = document.createElementNS(
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
        a.setAttribute("offset", `${i}%`), a.setAttribute("stop-color", "currentColor");
        const l = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        l.setAttribute("offset", `${i}%`), l.setAttribute("stop-color", "currentColor"), l.setAttribute("stop-opacity", "0.15"), r.appendChild(a), r.appendChild(l), e.appendChild(r), s.appendChild(e);
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
        const i = s.target.closest("[data-cmp-table-trigger]");
        if (!i) return;
        const t = i.getAttribute("data-cmp-table-trigger"), e = i.closest(".comparison-table-container");
        e && (t === "first-column" ? this.activateFirstColumn(e) : t === "last-column" && this.activateLastColumn(e));
      });
    }
    activateFirstColumn(s) {
      const i = s.querySelector(
        '[data-cmp-table-trigger="first-column"]'
      ), t = s.querySelector(
        '[data-cmp-table-trigger="last-column"]'
      );
      i && i.classList.add("comparison-table-link-active"), t && t.classList.remove("comparison-table-link-active"), this.showFirstColumn(s);
    }
    activateLastColumn(s) {
      const i = s.querySelector(
        '[data-cmp-table-trigger="first-column"]'
      ), t = s.querySelector(
        '[data-cmp-table-trigger="last-column"]'
      );
      i && i.classList.remove("comparison-table-link-active"), t && t.classList.add("comparison-table-link-active"), this.showLastColumn(s);
    }
    showFirstColumn(s) {
      s.querySelectorAll(
        ".cmp-table-row.cmp-table-row-first"
      ).forEach((e) => {
        e.style.display = "flex";
      }), s.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      ).forEach((e) => {
        e.style.display = "none";
      });
    }
    showLastColumn(s) {
      s.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      ).forEach((e) => {
        e.style.display = "flex";
      }), s.querySelectorAll(
        ".cmp-table-row.cmp-table-row-first"
      ).forEach((e) => {
        e.style.display = "none";
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
    const i = document.createElement("select");
    i.className = "tabs-select";
    const t = document.createElement("option");
    t.value = "", t.textContent = "Select a tab...", t.disabled = !0, i.appendChild(t), s.forEach((e, r) => {
      const a = document.createElement("option");
      a.value = r, a.textContent = e.textContent.trim() || `Tab ${r + 1}`, e.classList.contains("w--current") && (a.selected = !0, t.disabled = !1, t.selected = !1), i.appendChild(a);
    }), i.addEventListener("change", function() {
      const e = parseInt(this.value);
      !isNaN(e) && s[e] && s[e].click();
    }), o.insertBefore(i, o.firstChild);
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
  !o || s.length === 0 || (W(s), U(s, o), s.forEach((i, t) => {
    z(i, t, n, o);
  }), H(s, o), V());
}
function W(n) {
  n.forEach((o, s) => {
    const t = o.querySelector(".tabbed-card-image-wrapper")?.querySelector("img");
    if (!t) return;
    const e = document.createElement("div");
    e.className = "tabbed-card-mobile-image", e.dataset.cardIndex = s;
    const r = t.cloneNode(!0);
    e.appendChild(r), o.parentNode.insertBefore(e, o.nextSibling);
  });
}
function U(n, o) {
  o.innerHTML = "";
  const s = document.createElement("img");
  s.style.width = "100%", s.style.height = "auto", s.style.display = "block", s.style.transition = "opacity 0.2s ease", s.className = "tabbed-card-main-image", o.appendChild(s), n.forEach((i) => {
    const t = i.querySelector(".tabbed-card-image-wrapper img");
    if (t?.src) {
      const e = new Image();
      e.src = t.src;
    }
  });
}
function z(n, o, s, i) {
  const t = n.querySelector(".tabbed-card-toggler");
  if (!t) return;
  t.addEventListener("click", () => {
    t.getAttribute("aria-expanded") === "true" || (j(n, s), setTimeout(() => {
      C(o, i), E(o, s);
    }, 100));
  }), new MutationObserver((r) => {
    r.forEach((a) => {
      a.attributeName === "aria-expanded" && t.getAttribute("aria-expanded") === "true" && (C(o, i), E(o, s));
    });
  }).observe(t, {
    attributes: !0,
    attributeFilter: ["aria-expanded"]
  });
}
function j(n, o) {
  o.querySelectorAll(".tabbed-card.w-dropdown").forEach((i) => {
    if (i !== n) {
      const t = i.querySelector(".tabbed-card-toggler");
      t && t.getAttribute("aria-expanded") === "true" && (t.click(), setTimeout(() => {
        if (t.getAttribute("aria-expanded") === "true") {
          t.setAttribute("aria-expanded", "false");
          const e = i.querySelector(".w-dropdown"), r = i.querySelector(".w-dropdown-list"), a = i.querySelector(".w-dropdown-toggle");
          e?.classList.remove("w--open"), r?.classList.remove("w--open"), a?.classList.remove("w--open");
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
  const e = t.querySelector(".tabbed-card-image-wrapper img");
  e && s.src !== e.src && (s.style.opacity = "0.5", s.src = e.src, s.alt = e.alt || "", s.onload = () => {
    s.style.opacity = "1";
  });
}
function E(n, o) {
  o.querySelectorAll(
    ".tabbed-card-mobile-image"
  ).forEach((t) => {
    t.style.display = "none";
  });
  const i = o.querySelector(
    `[data-card-index="${n}"]`
  );
  i && (i.style.display = "block");
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
  const s = n[0], i = s.querySelector(".tabbed-card-toggler");
  i && (n.forEach((t, e) => {
    if (e !== 0) {
      const r = t.querySelector(".tabbed-card-toggler");
      r?.getAttribute("aria-expanded") === "true" && r.click();
    }
  }), setTimeout(() => {
    i.getAttribute("aria-expanded") === "true" || (i.click(), setTimeout(() => {
      if (i.getAttribute("aria-expanded") !== "true") {
        i.setAttribute("aria-expanded", "true");
        const e = s.querySelector(".w-dropdown"), r = s.querySelector(".w-dropdown-list"), a = s.querySelector(".w-dropdown-toggle");
        e?.classList.add("w--open"), r?.classList.add("w--open"), a?.classList.add("w--open");
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
let v = {
  css: !1,
  js: !1
};
function G() {
  return new Promise((n) => {
    if (v.css || document.querySelector(`link[href="${A.cssUrl}"]`)) {
      v.css = !0, n();
      return;
    }
    const o = document.createElement("link");
    o.rel = "stylesheet", o.href = A.cssUrl, o.onload = () => {
      v.css = !0, n();
    }, o.onerror = () => {
      console.error("❌ Failed to load Marketo CSS"), n();
    }, document.head.appendChild(o);
  });
}
function X() {
  return new Promise((n) => {
    if (v.js || window.MktoForms2) {
      v.js = !0, n();
      return;
    }
    const o = document.createElement("script");
    o.src = A.jsUrl, o.onload = () => {
      v.js = !0, n();
    }, o.onerror = () => {
      console.error("❌ Failed to load Marketo JS"), n();
    }, document.head.appendChild(o);
  });
}
function J(n) {
  try {
    const o = n.getFormElem()[0], s = Array.from(
      o.querySelectorAll(".mktoFormRow")
    ).filter((i) => !i.querySelector('input[type="hidden"]'));
    o.querySelectorAll(".is-odd-last").forEach((i) => i.classList.remove("is-odd-last")), s.length % 2 === 1 && s[s.length - 1].classList.add("is-odd-last");
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
    const i = document.createElement("form");
    i.id = s, n.appendChild(i), n.setAttribute("data-marketo-initialized", "true"), n.setAttribute("data-marketo-unique-id", s), window.MktoForms2.loadForm(
      A.baseUrl,
      A.munchkinId,
      parseInt(o),
      function(t) {
        const e = t.getFormElem()[0];
        e && (i.parentNode.replaceChild(e, i), e.id = s), setTimeout(() => J(t), 100);
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
    const i = o.getAttribute("data-marketo-id");
    if (!i) {
      console.warn(
        `⚠️ Container ${s + 1} has data-marketo-id but no value`
      );
      return;
    }
    setTimeout(() => {
      T(o, i);
    }, s * 100);
  }));
}
function K() {
  Promise.all([G(), X()]).then(() => {
    setTimeout(() => {
      window.MktoForms2 ? (Y(), new MutationObserver((o) => {
        o.forEach((s) => {
          s.addedNodes.forEach((i) => {
            if (i.nodeType === 1) {
              if (i.hasAttribute && i.hasAttribute("data-marketo-id")) {
                const e = i.getAttribute("data-marketo-id");
                setTimeout(() => T(i, e), 100);
              }
              (i.querySelectorAll ? i.querySelectorAll("[data-marketo-id]") : []).forEach((e, r) => {
                const a = e.getAttribute("data-marketo-id");
                a && setTimeout(
                  () => T(e, a),
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
    getCSSVariable(t, e) {
      return getComputedStyle(document.documentElement).getPropertyValue(t).trim() || e;
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
      this.items.forEach((e) => {
        e.style.cssText = `
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
      const e = -(this.currentIndex * (this.containerWidth + this.gap));
      this.itemsContainer.style.transform = `translateX(${e}px)`, this.updateNavigationState(), setTimeout(() => {
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
  ), o.forEach((i) => {
    const t = i, e = i.querySelector(
      ".related-item-collection-list"
    ), r = i.querySelectorAll(".collection-item");
    if (t && e && r.length > 0) {
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
    const i = (o.textContent || o.innerText).trim().split(/\s+/).length, e = Math.ceil(i / 200), r = document.querySelector(".read-time-estimate");
    r && (r.textContent = `${e} min read`), o.querySelectorAll("iframe").forEach((l) => {
      const p = l.getAttribute("src") || "";
      (p.includes("youtube.com") || p.includes("youtu.be")) && l.classList.add("youtube-iframe");
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
      const i = s.getAttribute("data-toc-content"), t = document.querySelector(
        `[data-toc-target="${i}"]`
      );
      if (!t) {
        console.warn(`📚 Table of Contents: No target found for "${i}"`);
        return;
      }
      const e = s.querySelectorAll("h2");
      if (e.length === 0)
        return;
      let r = null, a = !1;
      function l() {
        const m = document.createElement("ul");
        e.forEach((g, f) => {
          const d = document.createElement("li"), u = document.createElement("a"), w = g.textContent.trim(), y = g.getAttribute("id");
          y && (u.href = `#${y}`, u.textContent = w, u.classList.add("toc-link"), u.dataset.tocId = i, f === 0 && (u.classList.add("active"), r = u), d.appendChild(u), m.appendChild(d));
        }), t.innerHTML = "", t.appendChild(m);
      }
      l();
      const p = t.querySelectorAll(".toc-link");
      function h(m) {
        a || r === m || (a = !0, requestAnimationFrame(() => {
          r && r.classList.remove("active"), m && m.classList.add("active"), r = m, a = !1;
        }));
      }
      p.forEach((m) => {
        m.addEventListener("click", function(g) {
          g.preventDefault();
          const f = this.getAttribute("href").substring(1), d = document.getElementById(f);
          d && d.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });
      });
      let c = !1;
      function b() {
        c || (c = !0, requestAnimationFrame(() => {
          const m = window.scrollY;
          let g = null;
          for (let f = e.length - 1; f >= 0; f--) {
            const d = e[f], u = d.offsetTop;
            if (m >= u - 100) {
              g = d;
              break;
            }
          }
          if (!g && e.length > 0) {
            const f = e[0];
            m < f.offsetTop - 100 && (g = f);
          }
          if (g) {
            const f = t.querySelector(
              `.toc-link[href="#${g.getAttribute("id")}"]`
            );
            h(f);
          }
          c = !1;
        }));
      }
      window.addEventListener("scroll", b, { passive: !0 });
    }));
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", n) : n();
}
function it() {
  const n = document.querySelectorAll("[data-tab-for]");
  if (n.length === 0) return;
  const o = /* @__PURE__ */ new Map();
  n.forEach((i) => {
    let t = i.closest('[role="tablist"]') || i.closest(".hero-tabs") || i.closest(".pricing-card-toggle") || i.parentElement;
    o.has(t) || o.set(t, []), o.get(t).push(i);
  }), st();
  let s = 0;
  o.forEach((i, t) => {
    nt(t, i, s++);
  });
}
function st() {
  const n = document.querySelectorAll("[data-tab-for]"), o = [], s = /* @__PURE__ */ new Set();
  n.forEach((i) => {
    const t = i.getAttribute("data-tab-for");
    t && !s.has(t) && (o.push(t), s.add(t));
  }), o.forEach((i, t) => {
    const e = document.querySelectorAll(
      `[data-tab-container="${i}"]`
    ), r = t === 0;
    e.forEach((a) => {
      a.style.display = r ? "block" : "none", a.setAttribute("aria-hidden", r ? "false" : "true");
    });
  });
}
function nt(n, o, s) {
  if (o.length === 0) return;
  const i = `hero-tabs-${s}`, t = `${i}-tablist`;
  n.getAttribute("role") || n.setAttribute("role", "tablist"), n.getAttribute("id") || n.setAttribute("id", t), n.getAttribute("aria-label") || n.setAttribute("aria-label", "Tab navigation"), o.forEach((e, r) => {
    const a = e.getAttribute("data-tab-for"), l = document.querySelector(
      `[data-tab-container="${a}"]`
    );
    if (!l) return;
    const p = `${i}-tab-${r}`, h = `${i}-panel-${r}`;
    e.getAttribute("role") || e.setAttribute("role", "tab"), e.getAttribute("id") || e.setAttribute("id", p), e.setAttribute("aria-controls", h);
    const c = l.style.display !== "none";
    e.setAttribute("tabindex", c ? "0" : "-1"), e.setAttribute("aria-selected", c ? "true" : "false"), e.classList.toggle("hero-tabs-item-active", c), l.setAttribute("role", "tabpanel"), l.setAttribute("id", h), l.setAttribute(
      "aria-labelledby",
      e.getAttribute("id") || p
    ), l.setAttribute("tabindex", "0"), e.addEventListener("click", (b) => {
      b.preventDefault(), I(e.getAttribute("data-tab-for"), n);
    }), e.addEventListener(
      "keydown",
      (b) => ot(b, n, o, r)
    ), e.addEventListener("focus", () => {
      e.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
}
function I(n, o = null) {
  const s = document.querySelectorAll("[data-tab-for]"), i = document.querySelectorAll("[data-tab-container]");
  let t = null, e = null;
  i.forEach((r) => {
    const l = r.getAttribute("data-tab-container") === n;
    r.style.display = l ? "block" : "none", r.setAttribute("aria-hidden", l ? "false" : "true");
  }), s.forEach((r) => {
    const l = r.getAttribute("data-tab-for") === n;
    r.classList.toggle("hero-tabs-item-active", l), r.setAttribute("aria-selected", l ? "true" : "false"), r.setAttribute("tabindex", l ? "0" : "-1"), l && (t = r, o && (r.closest('[role="tablist"]') === o || r.closest(".hero-tabs") === o || r.closest(".pricing-card-toggle") === o || r.parentElement === o) && (e = r));
  }), t && rt(t), e && e.focus();
}
function ot(n, o, s, i) {
  let t = i;
  switch (n.key) {
    case "ArrowLeft":
    case "ArrowUp":
      n.preventDefault(), t = i > 0 ? i - 1 : s.length - 1;
      break;
    case "ArrowRight":
    case "ArrowDown":
      n.preventDefault(), t = i < s.length - 1 ? i + 1 : 0;
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
        s[i].getAttribute("data-tab-for"),
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
  const n = ".case-study-cards-grid", o = ".case-study-card", s = "data-filter-control", i = 3e3, t = document.querySelector(n);
  if (!t) {
    console.warn(
      `⚠️ Case Study Filter: Container "${n}" not found`
    );
    return;
  }
  const e = Array.from(t.querySelectorAll(o)).map(
    (h) => {
      const c = h.closest(".w-dyn-item");
      return { card: h, parent: c };
    }
  );
  if (e.length === 0) {
    console.warn(
      `⚠️ Case Study Filter: No cards found with selector "${o}"`
    );
    return;
  }
  console.log(`📊 Case Study Filter: Found ${e.length} cards`);
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
  r.forEach((h) => {
    const c = h.getAttribute(s);
    c && (c === "use-case" ? (console.log(
      `⏳ Use Case filter: Waiting ${i}ms for dynamic content to load...`
    ), setTimeout(() => {
      console.log(
        "✨ Use Case filter: Dynamic content loaded, initializing..."
      ), l(h, c);
    }, i)) : l(h, c));
  });
  function l(h, c) {
    const b = `data-filter-${c}`;
    console.log(`🔧 Setting up filter: ${c} (${b})`);
    const m = /* @__PURE__ */ new Set();
    e.forEach(({ card: d }) => {
      if (c === "use-case") {
        const u = d.querySelector('[fs-list-nest="use-cases"]');
        u && u.querySelectorAll(
          '[role="listitem"].w-dyn-item'
        ).forEach((y) => {
          const x = y.textContent.trim();
          x && m.add(x);
        });
      } else {
        const u = d.getAttribute(b);
        u && u.trim() && m.add(u.trim());
      }
    });
    const g = Array.from(m).sort(
      (d, u) => d.localeCompare(u)
    );
    console.log(`   Found ${g.length} unique values:`, g);
    const f = Array.from(h.options);
    for (let d = f.length - 1; d >= 0; d--)
      d === 0 && (!f[d].value || f[d].value === "") || h.remove(d);
    g.forEach((d) => {
      const u = document.createElement("option");
      u.value = d, u.textContent = d, h.appendChild(u);
    }), a[c] = "", h.addEventListener("change", function() {
      a[c] = this.value, console.log(`🔄 Filter changed: ${c} = "${this.value}"`), this.value ? this.style.color = "var(--_colors---primary--dark-blue)" : this.style.color = "", p();
    });
  }
  function p() {
    console.log("🎯 Applying filters:", a);
    let h = 0, c = 0;
    e.forEach(({ card: m, parent: g }) => {
      let f = !0;
      for (const [d, u] of Object.entries(a)) {
        if (!u) continue;
        let w = !1;
        if (d === "use-case") {
          const y = m.querySelector('[fs-list-nest="use-cases"]');
          if (y) {
            const x = y.querySelectorAll(
              '[role="listitem"].w-dyn-item'
            );
            for (const B of x)
              if (B.textContent.trim() === u) {
                w = !0;
                break;
              }
          }
        } else {
          const y = `data-filter-${d}`;
          w = m.getAttribute(y) === u;
        }
        if (!w) {
          f = !1;
          break;
        }
      }
      g ? f ? (g.style.display = "", h++) : (g.style.display = "none", c++) : f ? (m.style.display = "", h++) : (m.style.display = "none", c++);
    }), console.log(
      `✅ Filter applied: ${h} visible, ${c} hidden`
    );
    const b = new CustomEvent("caseStudyFiltersApplied", {
      detail: {
        activeFilters: a,
        visibleCount: h,
        hiddenCount: c,
        totalCount: e.length
      }
    });
    document.dispatchEvent(b);
  }
  p(), console.log("✅ Case Study Filter: Complete");
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
