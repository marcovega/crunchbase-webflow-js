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
function F() {
  document.body.style.border = "5px solid navy", document.body.style.margin = "0", document.body.style.boxSizing = "border-box";
}
const q = () => {
  const s = document.querySelectorAll('[data-logo-slider="true"]'), o = 7;
  !s || s.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches || s.forEach((n) => {
    const e = n.querySelectorAll(":scope > *");
    e.length === 0 || e.length < o || (n.setAttribute("data-logo-slider-init", "true"), n.style.setProperty("--ls-items", e.length), e.forEach((t, i) => {
      t.style.setProperty("--ls-item-index", i + 1);
    }));
  });
};
function I() {
  class s {
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
        let c;
        i ? (c = this.containerWidth, a.style.width = `${this.containerWidth}px`) : a.classList.contains("quote-card-featured") ? (c = 862, a.style.width = "862px") : a.classList.contains("quote-card") ? (c = 410, a.style.width = "410px") : c = a.getBoundingClientRect().width;
        const f = {
          element: a,
          width: c,
          offsetLeft: r,
          index: l
        };
        return r += c + (l < this.totalQuotes - 1 ? this.gap : 0), f;
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
        const r = this.quoteData[i], a = r.offsetLeft, l = r.offsetLeft + r.width, c = t + this.containerWidth, f = Math.max(a, t), d = Math.min(l, c);
        if (Math.max(0, d - f) / r.width >= 0.3 || a >= t && a < c) {
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
  const o = document.querySelectorAll(".quotes-slider-container"), n = [];
  return console.log(`📊 Quotes Slider: Found ${o.length} containers`), o.forEach((e) => {
    const t = new s(e);
    t.shouldEnable() || t.disable(), n.push(t);
  }), window.quotesSliders = n, n;
}
function B() {
  class s {
    constructor() {
      this.init();
    }
    init() {
      this.processRatingElements();
    }
    processRatingElements() {
      const n = document.querySelectorAll("[rating-value]");
      console.log(`⭐ Star Rating: Found ${n.length} elements`), n.forEach((e, t) => {
        const i = e.getAttribute("rating-value"), r = this.snapToNearestTenth(parseFloat(i) || 0);
        e.innerHTML = "";
        const a = this.createStarContainer(r);
        e.appendChild(a), e.setAttribute("rating-value", r.toString());
      });
    }
    snapToNearestTenth(n) {
      const e = Math.max(0, Math.min(5, n));
      return Math.round(e * 10) / 10;
    }
    createStarContainer(n) {
      const e = document.createElement("div");
      e.style.cssText = `
        display: flex;
        gap: 2px;
        align-items: center;
      `;
      for (let t = 1; t <= 5; t++) {
        const i = this.createStar(t, n);
        e.appendChild(i);
      }
      return e;
    }
    createStar(n, e) {
      const t = document.createElement("div");
      t.style.cssText = `
        width: 19px;
        height: 19px;
        position: relative;
        display: inline-block;
      `;
      const i = this.getStarFillState(n, e), r = this.createStarSvg(i);
      return t.appendChild(r), t;
    }
    getStarFillState(n, e) {
      const t = n - 1;
      return e >= n ? "full" : e > t ? { type: "partial", percentage: ((e - t) * 100).toFixed(0) } : "empty";
    }
    createStarSvg(n) {
      const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      e.setAttribute("xmlns", "http://www.w3.org/2000/svg"), e.setAttribute("width", "19"), e.setAttribute("height", "19"), e.setAttribute("fill", "none"), e.setAttribute("viewBox", "0 0 19 19");
      const t = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      if (t.setAttribute(
        "d",
        "M9.26.745a.41.41 0 0 1 .735 0l2.548 5.162a.41.41 0 0 0 .308.224l5.697.828a.41.41 0 0 1 .228.7l-4.123 4.018a.41.41 0 0 0-.118.363l.973 5.674a.41.41 0 0 1-.594.432l-5.096-2.68a.41.41 0 0 0-.382 0l-5.095 2.68a.41.41 0 0 1-.595-.432l.973-5.674a.41.41 0 0 0-.118-.363L.48 7.658a.41.41 0 0 1 .227-.699l5.697-.828a.41.41 0 0 0 .309-.224L9.26.745Z"
      ), n === "full")
        t.setAttribute("fill", "currentColor");
      else if (n === "empty")
        t.setAttribute("fill", "currentColor"), t.setAttribute("opacity", "0.15");
      else if (n.type === "partial") {
        const i = `partial-fill-${n.percentage}`;
        t.setAttribute("fill", `url(#${i})`), this.ensurePartialFillGradient(e, n.percentage, i);
      }
      return e.appendChild(t), e;
    }
    ensurePartialFillGradient(n, e, t) {
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
        l.setAttribute("offset", `${e}%`), l.setAttribute("stop-color", "currentColor"), l.setAttribute("stop-opacity", "0.15"), r.appendChild(a), r.appendChild(l), i.appendChild(r), n.appendChild(i);
      }
    }
  }
  new s();
}
function N() {
  class s {
    constructor() {
      this.init();
    }
    init() {
      this.bindEvents();
    }
    bindEvents() {
      document.addEventListener("click", (n) => {
        const e = n.target.closest("[data-cmp-table-trigger]");
        if (!e) return;
        const t = e.getAttribute("data-cmp-table-trigger"), i = e.closest(".comparison-table-container");
        i && (t === "first-column" ? this.activateFirstColumn(i) : t === "last-column" && this.activateLastColumn(i));
      });
    }
    activateFirstColumn(n) {
      const e = n.querySelector(
        '[data-cmp-table-trigger="first-column"]'
      ), t = n.querySelector(
        '[data-cmp-table-trigger="last-column"]'
      );
      e && e.classList.add("comparison-table-link-active"), t && t.classList.remove("comparison-table-link-active"), this.showFirstColumn(n);
    }
    activateLastColumn(n) {
      const e = n.querySelector(
        '[data-cmp-table-trigger="first-column"]'
      ), t = n.querySelector(
        '[data-cmp-table-trigger="last-column"]'
      );
      e && e.classList.remove("comparison-table-link-active"), t && t.classList.add("comparison-table-link-active"), this.showLastColumn(n);
    }
    showFirstColumn(n) {
      n.querySelectorAll(
        ".cmp-table-row.cmp-table-row-first"
      ).forEach((i) => {
        i.style.display = "flex";
      }), n.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      ).forEach((i) => {
        i.style.display = "none";
      });
    }
    showLastColumn(n) {
      n.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      ).forEach((i) => {
        i.style.display = "flex";
      }), n.querySelectorAll(
        ".cmp-table-row.cmp-table-row-first"
      ).forEach((i) => {
        i.style.display = "none";
      });
    }
  }
  new s();
}
function M() {
  const s = document.querySelectorAll(".tabs.w-tabs");
  s.length !== 0 && (console.log(`📱 Tabs Select: Found ${s.length} tab containers`), s.forEach((o) => {
    const n = o.querySelectorAll(".tab-link");
    if (n.length === 0 || o.querySelector(".tabs-select"))
      return;
    const e = document.createElement("select");
    e.className = "tabs-select";
    const t = document.createElement("option");
    t.value = "", t.textContent = "Select a tab...", t.disabled = !0, e.appendChild(t), n.forEach((i, r) => {
      const a = document.createElement("option");
      a.value = r, a.textContent = i.textContent.trim() || `Tab ${r + 1}`, i.classList.contains("w--current") && (a.selected = !0, t.disabled = !1, t.selected = !1), e.appendChild(a);
    }), e.addEventListener("change", function() {
      const i = parseInt(this.value);
      !isNaN(i) && n[i] && n[i].click();
    }), o.insertBefore(e, o.firstChild);
  }), $());
}
function $() {
  if (document.getElementById("tabs-select-styles")) return;
  const s = document.createElement("style");
  s.id = "tabs-select-styles", s.textContent = `
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
  `, document.head.appendChild(s);
}
function R() {
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", C) : C();
}
function C() {
  const s = document.querySelectorAll(".tabbed-cards");
  s.length !== 0 && (console.log(
    `🎴 Tabbed Cards: Found ${s.length} containers`
  ), s.forEach((o) => {
    D(o);
  }));
}
function D(s) {
  const o = s.querySelector(".tabbed-cards-image"), n = s.querySelectorAll(".tabbed-card.w-dropdown");
  !o || n.length === 0 || (O(n), P(n, o), n.forEach((e, t) => {
    _(e, t, s, o);
  }), U(n, o), W());
}
function O(s) {
  s.forEach((o, n) => {
    const t = o.querySelector(".tabbed-card-image-wrapper")?.querySelector("img");
    if (!t) return;
    const i = document.createElement("div");
    i.className = "tabbed-card-mobile-image", i.dataset.cardIndex = n;
    const r = t.cloneNode(!0);
    i.appendChild(r), o.parentNode.insertBefore(i, o.nextSibling);
  });
}
function P(s, o) {
  o.innerHTML = "";
  const n = document.createElement("img");
  n.style.width = "100%", n.style.height = "auto", n.style.display = "block", n.style.transition = "opacity 0.2s ease", n.className = "tabbed-card-main-image", o.appendChild(n), s.forEach((e) => {
    const t = e.querySelector(".tabbed-card-image-wrapper img");
    if (t?.src) {
      const i = new Image();
      i.src = t.src;
    }
  });
}
function _(s, o, n, e) {
  const t = s.querySelector(".tabbed-card-toggler");
  if (!t) return;
  t.addEventListener("click", () => {
    t.getAttribute("aria-expanded") === "true" || (Q(s, n), setTimeout(() => {
      w(o, e), v(o, n);
    }, 100));
  }), new MutationObserver((r) => {
    r.forEach((a) => {
      a.attributeName === "aria-expanded" && t.getAttribute("aria-expanded") === "true" && (w(o, e), v(o, n));
    });
  }).observe(t, {
    attributes: !0,
    attributeFilter: ["aria-expanded"]
  });
}
function Q(s, o) {
  o.querySelectorAll(".tabbed-card.w-dropdown").forEach((e) => {
    if (e !== s) {
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
function w(s, o) {
  const n = o.querySelector(".tabbed-card-main-image");
  if (!n) return;
  const t = o.closest(".tabbed-cards").querySelectorAll(".tabbed-card.w-dropdown")[s];
  if (!t) return;
  const i = t.querySelector(".tabbed-card-image-wrapper img");
  i && n.src !== i.src && (n.style.opacity = "0.5", n.src = i.src, n.alt = i.alt || "", n.onload = () => {
    n.style.opacity = "1";
  });
}
function v(s, o) {
  o.querySelectorAll(
    ".tabbed-card-mobile-image"
  ).forEach((t) => {
    t.style.display = "none";
  });
  const e = o.querySelector(
    `[data-card-index="${s}"]`
  );
  e && (e.style.display = "block");
}
function W() {
  if (document.getElementById("tabbed-cards-mobile-styles")) return;
  const s = document.createElement("style");
  s.id = "tabbed-cards-mobile-styles", s.textContent = `
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
  `, document.head.appendChild(s);
}
function U(s, o) {
  if (s.length === 0) return;
  const n = s[0], e = n.querySelector(".tabbed-card-toggler");
  e && (s.forEach((t, i) => {
    if (i !== 0) {
      const r = t.querySelector(".tabbed-card-toggler");
      r?.getAttribute("aria-expanded") === "true" && r.click();
    }
  }), setTimeout(() => {
    e.getAttribute("aria-expanded") === "true" || (e.click(), setTimeout(() => {
      if (e.getAttribute("aria-expanded") !== "true") {
        e.setAttribute("aria-expanded", "true");
        const i = n.querySelector(".w-dropdown"), r = n.querySelector(".w-dropdown-list"), a = n.querySelector(".w-dropdown-toggle");
        i?.classList.add("w--open"), r?.classList.add("w--open"), a?.classList.add("w--open");
      }
    }, 100)), w(0, o), v(0, n.closest(".tabbed-cards"));
  }, 200));
}
const b = {
  baseUrl: "https://pages.crunchbase.com",
  munchkinId: "976-JJA-800",
  cssUrl: "https://app-sj22.marketo.com/js/forms2/css/forms2.css",
  jsUrl: "https://pages.crunchbase.com/js/forms2/js/forms2.min.js"
};
let g = {
  css: !1,
  js: !1
};
function j() {
  return new Promise((s) => {
    if (g.css || document.querySelector(`link[href="${b.cssUrl}"]`)) {
      g.css = !0, s();
      return;
    }
    const o = document.createElement("link");
    o.rel = "stylesheet", o.href = b.cssUrl, o.onload = () => {
      g.css = !0, s();
    }, o.onerror = () => {
      console.error("❌ Failed to load Marketo CSS"), s();
    }, document.head.appendChild(o);
  });
}
function z() {
  return new Promise((s) => {
    if (g.js || window.MktoForms2) {
      g.js = !0, s();
      return;
    }
    const o = document.createElement("script");
    o.src = b.jsUrl, o.onload = () => {
      g.js = !0, s();
    }, o.onerror = () => {
      console.error("❌ Failed to load Marketo JS"), s();
    }, document.head.appendChild(o);
  });
}
function V(s) {
  try {
    const o = s.getFormElem()[0], n = Array.from(
      o.querySelectorAll(".mktoFormRow")
    ).filter((e) => !e.querySelector('input[type="hidden"]'));
    o.querySelectorAll(".is-odd-last").forEach((e) => e.classList.remove("is-odd-last")), n.length % 2 === 1 && n[n.length - 1].classList.add("is-odd-last");
  } catch (o) {
    console.error("❌ Error applying layout:", o);
  }
}
let E = 0;
function x(s, o) {
  try {
    if (s.hasAttribute("data-marketo-initialized"))
      return;
    E++;
    const n = `mktoForm_${o}_${E}`;
    s.innerHTML = "";
    const e = document.createElement("form");
    e.id = n, s.appendChild(e), s.setAttribute("data-marketo-initialized", "true"), s.setAttribute("data-marketo-unique-id", n), window.MktoForms2.loadForm(
      b.baseUrl,
      b.munchkinId,
      parseInt(o),
      function(t) {
        const i = t.getFormElem()[0];
        i && (e.parentNode.replaceChild(i, e), i.id = n), setTimeout(() => V(t), 100);
        const r = new CustomEvent("marketoFormLoaded", {
          detail: { form: t, formId: o, container: s, uniqueId: n }
        });
        s.dispatchEvent(r);
      }
    );
  } catch (n) {
    console.error(`❌ Error initializing Marketo form ${o}:`, n);
  }
}
function H() {
  const s = document.querySelectorAll("[data-marketo-id]");
  s.length !== 0 && (console.log(`🎯 Found ${s.length} Marketo form container(s)`), s.forEach((o, n) => {
    const e = o.getAttribute("data-marketo-id");
    if (!e) {
      console.warn(
        `⚠️ Container ${n + 1} has data-marketo-id but no value`
      );
      return;
    }
    setTimeout(() => {
      x(o, e);
    }, n * 100);
  }));
}
function G() {
  Promise.all([j(), z()]).then(() => {
    setTimeout(() => {
      window.MktoForms2 ? (H(), new MutationObserver((o) => {
        o.forEach((n) => {
          n.addedNodes.forEach((e) => {
            if (e.nodeType === 1) {
              if (e.hasAttribute && e.hasAttribute("data-marketo-id")) {
                const i = e.getAttribute("data-marketo-id");
                setTimeout(() => x(e, i), 100);
              }
              (e.querySelectorAll ? e.querySelectorAll("[data-marketo-id]") : []).forEach((i, r) => {
                const a = i.getAttribute("data-marketo-id");
                a && setTimeout(
                  () => x(i, a),
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
  }).catch((s) => {
    console.error("❌ Error loading Marketo resources:", s);
  });
}
function X() {
  class s {
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
  ), n = [];
  return console.log(
    `📰 Related Articles Slider: Found ${o.length} containers`
  ), o.forEach((e) => {
    const t = e, i = e.querySelector(
      ".related-item-collection-list"
    ), r = e.querySelectorAll(".collection-item");
    if (t && i && r.length > 0) {
      const a = new s(t);
      n.push(a);
    }
  }), window.relatedArticlesSliders = n, n;
}
function J() {
  const s = () => {
    const o = document.querySelector(".blog-content-richtext");
    if (!o)
      return;
    console.log("📖 Reading Time Estimate: Found rich text element");
    const e = (o.textContent || o.innerText).trim().split(/\s+/).length, i = Math.ceil(e / 200), r = document.querySelector(".read-time-estimate");
    r && (r.textContent = `${i} min read`), o.querySelectorAll("iframe").forEach((l) => {
      const c = l.getAttribute("src") || "";
      (c.includes("youtube.com") || c.includes("youtu.be")) && l.classList.add("youtube-iframe");
    });
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", s) : s();
}
function K() {
  const s = () => {
    const o = document.querySelector(".table-of-content"), n = document.querySelector(".blog-content");
    if (!n)
      return;
    console.log("📚 Table of Contents: Found blog content element");
    const e = n.querySelectorAll("h2");
    let t = null, i = !1;
    function r() {
      if (e.length === 0) return;
      const d = document.createElement("ul");
      e.forEach((h, p) => {
        const u = document.createElement("li"), m = document.createElement("a"), S = h.textContent.trim(), A = h.getAttribute("id");
        A && (m.href = `#${A}`, m.textContent = S, m.classList.add("toc-link"), p === 0 && (m.classList.add("active"), t = m), u.appendChild(m), d.appendChild(u));
      }), o && (o.innerHTML = "", o.appendChild(d));
    }
    r();
    const a = document.querySelectorAll(".toc-link");
    function l(d) {
      i || t === d || (i = !0, requestAnimationFrame(() => {
        t && t.classList.remove("active"), d && d.classList.add("active"), t = d, i = !1;
      }));
    }
    a.forEach((d) => {
      d.addEventListener("click", function(h) {
        h.preventDefault();
        const p = this.getAttribute("href").substring(1), u = document.getElementById(p);
        u && u.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    let c = !1;
    function f() {
      c || (c = !0, requestAnimationFrame(() => {
        const d = window.scrollY;
        let h = null;
        for (let p = e.length - 1; p >= 0; p--) {
          const u = e[p], m = u.offsetTop;
          if (d >= m - 100) {
            h = u;
            break;
          }
        }
        if (!h && e.length > 0) {
          const p = e[0];
          d < p.offsetTop - 100 && (h = p);
        }
        if (h) {
          const p = document.querySelector(
            `.toc-link[href="#${h.getAttribute("id")}"]`
          );
          l(p);
        }
        c = !1;
      }));
    }
    window.addEventListener("scroll", f, { passive: !0 });
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", s) : s();
}
function Y() {
  const s = document.querySelectorAll("[data-tab-for]");
  if (s.length === 0) return;
  const o = /* @__PURE__ */ new Map();
  s.forEach((e) => {
    let t = e.closest('[role="tablist"]') || e.closest(".hero-tabs") || e.closest(".pricing-card-toggle") || e.parentElement;
    o.has(t) || o.set(t, []), o.get(t).push(e);
  }), Z();
  let n = 0;
  o.forEach((e, t) => {
    tt(t, e, n++);
  });
}
function Z() {
  const s = document.querySelectorAll("[data-tab-for]"), o = [], n = /* @__PURE__ */ new Set();
  s.forEach((e) => {
    const t = e.getAttribute("data-tab-for");
    t && !n.has(t) && (o.push(t), n.add(t));
  }), o.forEach((e, t) => {
    const i = document.querySelectorAll(
      `[data-tab-container="${e}"]`
    ), r = t === 0;
    i.forEach((a) => {
      a.style.display = r ? "block" : "none", a.setAttribute("aria-hidden", r ? "false" : "true");
    });
  });
}
function tt(s, o, n) {
  if (o.length === 0) return;
  const e = `hero-tabs-${n}`, t = `${e}-tablist`;
  s.getAttribute("role") || s.setAttribute("role", "tablist"), s.getAttribute("id") || s.setAttribute("id", t), s.getAttribute("aria-label") || s.setAttribute("aria-label", "Tab navigation"), o.forEach((i, r) => {
    const a = i.getAttribute("data-tab-for"), l = document.querySelector(
      `[data-tab-container="${a}"]`
    );
    if (!l) return;
    const c = `${e}-tab-${r}`, f = `${e}-panel-${r}`;
    i.getAttribute("role") || i.setAttribute("role", "tab"), i.getAttribute("id") || i.setAttribute("id", c), i.setAttribute("aria-controls", f);
    const d = l.style.display !== "none";
    i.setAttribute("tabindex", d ? "0" : "-1"), i.setAttribute("aria-selected", d ? "true" : "false"), i.classList.toggle("hero-tabs-item-active", d), l.setAttribute("role", "tabpanel"), l.setAttribute("id", f), l.setAttribute(
      "aria-labelledby",
      i.getAttribute("id") || c
    ), l.setAttribute("tabindex", "0"), i.addEventListener("click", (h) => {
      h.preventDefault(), L(i.getAttribute("data-tab-for"), s);
    }), i.addEventListener(
      "keydown",
      (h) => et(h, s, o, r)
    ), i.addEventListener("focus", () => {
      i.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
}
function L(s, o = null) {
  const n = document.querySelectorAll("[data-tab-for]"), e = document.querySelectorAll("[data-tab-container]");
  let t = null, i = null;
  e.forEach((r) => {
    const l = r.getAttribute("data-tab-container") === s;
    r.style.display = l ? "block" : "none", r.setAttribute("aria-hidden", l ? "false" : "true");
  }), n.forEach((r) => {
    const l = r.getAttribute("data-tab-for") === s;
    r.classList.toggle("hero-tabs-item-active", l), r.setAttribute("aria-selected", l ? "true" : "false"), r.setAttribute("tabindex", l ? "0" : "-1"), l && (t = r, o && (r.closest('[role="tablist"]') === o || r.closest(".hero-tabs") === o || r.closest(".pricing-card-toggle") === o || r.parentElement === o) && (i = r));
  }), t && it(t), i && i.focus();
}
function et(s, o, n, e) {
  let t = e;
  switch (s.key) {
    case "ArrowLeft":
    case "ArrowUp":
      s.preventDefault(), t = e > 0 ? e - 1 : n.length - 1;
      break;
    case "ArrowRight":
    case "ArrowDown":
      s.preventDefault(), t = e < n.length - 1 ? e + 1 : 0;
      break;
    case "Home":
      s.preventDefault(), t = 0;
      break;
    case "End":
      s.preventDefault(), t = n.length - 1;
      break;
    case "Enter":
    case " ":
      s.preventDefault(), L(
        n[e].getAttribute("data-tab-for"),
        o
      );
      return;
    default:
      return;
  }
  n[t].focus();
}
function it(s) {
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
  `, o.textContent = `${s.textContent.trim()} tab selected`, document.body.appendChild(o), setTimeout(() => {
    o.parentNode && o.parentNode.removeChild(o);
  }, 1e3);
}
function T() {
  if (document.getElementById("hero-tabs-styles")) return;
  const s = document.createElement("style");
  s.id = "hero-tabs-styles", s.textContent = `
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
  `, document.head.appendChild(s);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", T) : T();
function nt() {
  console.log("🔍 Case Study Filter: Starting...");
  const s = ".case-study-cards-grid", o = ".case-study-card", n = "data-filter-control", e = document.querySelector(s);
  if (!e) {
    console.warn(
      `⚠️ Case Study Filter: Container "${s}" not found`
    );
    return;
  }
  const t = Array.from(e.querySelectorAll(o));
  if (t.length === 0) {
    console.warn(
      `⚠️ Case Study Filter: No cards found with selector "${o}"`
    );
    return;
  }
  console.log(`📊 Case Study Filter: Found ${t.length} cards`);
  const i = Array.from(
    document.querySelectorAll(`[${n}]`)
  );
  if (i.length === 0) {
    console.warn(
      `⚠️ Case Study Filter: No filter controls found with attribute "${n}"`
    );
    return;
  }
  console.log(
    `🎛️ Case Study Filter: Found ${i.length} filter control(s)`
  );
  const r = {};
  i.forEach((l) => {
    const c = l.getAttribute(n);
    if (!c) return;
    const f = `data-filter-${c}`;
    console.log(`🔧 Setting up filter: ${c} (${f})`);
    const d = /* @__PURE__ */ new Set();
    t.forEach((u) => {
      const m = u.getAttribute(f);
      m && m.trim() && d.add(m.trim());
    });
    const h = Array.from(d).sort(
      (u, m) => u.localeCompare(m)
    );
    console.log(`   Found ${h.length} unique values:`, h);
    const p = Array.from(l.options);
    for (let u = p.length - 1; u >= 0; u--)
      u === 0 && (!p[u].value || p[u].value === "") || l.remove(u);
    h.forEach((u) => {
      const m = document.createElement("option");
      m.value = u, m.textContent = u, l.appendChild(m);
    }), r[c] = "", l.addEventListener("change", function() {
      r[c] = this.value, console.log(`🔄 Filter changed: ${c} = "${this.value}"`), this.value ? this.style.color = "var(--_colors---primary--dark-blue)" : this.style.color = "", a();
    });
  });
  function a() {
    console.log("🎯 Applying filters:", r);
    let l = 0, c = 0;
    t.forEach((d) => {
      let h = !0;
      for (const [p, u] of Object.entries(r)) {
        if (!u) continue;
        const m = `data-filter-${p}`;
        if (d.getAttribute(m) !== u) {
          h = !1;
          break;
        }
      }
      h ? (d.style.display = "", l++) : (d.style.display = "none", c++);
    }), console.log(
      `✅ Filter applied: ${l} visible, ${c} hidden`
    );
    const f = new CustomEvent("caseStudyFiltersApplied", {
      detail: {
        activeFilters: r,
        visibleCount: l,
        hiddenCount: c,
        totalCount: t.length
      }
    });
    document.dispatchEvent(f);
  }
  a(), console.log("✅ Case Study Filter: Complete");
}
const k = {
  demo: F,
  logoSlider: q,
  quotesSlider: I,
  starRating: B,
  comparisonTableToggler: N,
  tabsSelect: M,
  tabbedCards: R,
  marketoForms: G,
  relatedArticlesSlider: X,
  readingTimeEstimate: J,
  tableOfContents: K,
  heroTabs: Y,
  caseStudyFilter: nt
  // Add more features here as you create them
  // myFeature: initMyFeature,
};
function st(s = ["demo"]) {
  s.forEach((o) => {
    if (k[o])
      try {
        k[o]();
      } catch (n) {
        console.error(`❌ Error initializing feature '${o}':`, n);
      }
    else
      console.warn(`⚠️ Feature '${o}' not found`);
  });
}
if (typeof window < "u" && !window.__CRUNCHBASE_SHOULD_RUN_PROD__) {
  const s = setInterval(() => {
    window.__CRUNCHBASE_SHOULD_RUN_PROD__ && (clearInterval(s), y());
  }, 50);
  setTimeout(() => {
    clearInterval(s), window.__CRUNCHBASE_SHOULD_RUN_PROD__ || (console.log(
      "⏰ Timeout waiting for wrapper, running production code anyway..."
    ), y());
  }, 5e3);
} else
  y();
function y() {
  console.log("🚀 Crunchbase Webflow script loaded"), st([
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
