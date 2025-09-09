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
function S() {
  console.log("🎨 Demo Feature: Adding black border to body"), document.body.style.border = "5px solid navy", document.body.style.margin = "0", document.body.style.boxSizing = "border-box", console.log("✅ Demo Feature: Black border applied");
}
const x = () => {
  const o = document.querySelectorAll('[data-logo-slider="true"]'), s = 7;
  !o || o.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches || o.forEach((e) => {
    const i = e.querySelectorAll(":scope > *");
    i.length === 0 || i.length < s || (e.setAttribute("data-logo-slider-init", "true"), e.style.setProperty("--ls-items", i.length), i.forEach((t, n) => {
      t.style.setProperty("--ls-item-index", n + 1);
    }));
  });
};
function A() {
  class o {
    constructor(t) {
      this.container = t, this.currentIndex = 0, this.quotes = [], this.totalQuotes = 0, this.containerWidth = 0, this.isAnimating = !1, this.resizeTimeout = null, this.animationDuration = this.getCSSVariable(
        "--quotes-slider-duration",
        "400ms"
      ), this.animationEasing = this.getCSSVariable(
        "--quotes-slider-easing",
        "ease-out"
      ), this.init();
    }
    getCSSVariable(t, n) {
      return getComputedStyle(document.documentElement).getPropertyValue(
        t
      ).trim() || n;
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
      const n = window.matchMedia("(max-width: 991px)").matches;
      let r = 0;
      this.quoteData = this.quotes.map((a, l) => {
        let c;
        n ? (c = this.containerWidth, a.style.width = `${this.containerWidth}px`) : a.classList.contains("quote-card-featured") ? (c = 862, a.style.width = "862px") : a.classList.contains("quote-card") ? (c = 410, a.style.width = "410px") : c = a.getBoundingClientRect().width;
        const h = {
          element: a,
          width: c,
          offsetLeft: r,
          index: l
        };
        return r += c + (l < this.totalQuotes - 1 ? this.gap : 0), h;
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
      const t = this.navContainer.style.justifyContent === "center", n = window.matchMedia("(max-width: 991px)").matches;
      this.calculateDimensions(), t !== n && (this.navContainer && this.navContainer.parentNode && this.navContainer.parentNode.removeChild(this.navContainer), this.createNavigation()), this.updateNavigationState(), this.updateProgress();
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
            const n = Math.max(0, this.currentIndex - 2);
            this.currentIndex = n, this.scrollToQuote(this.currentIndex);
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
      let n = 0;
      for (let l = t; l < this.totalQuotes; l++)
        n += this.quoteData[l].width, l < this.totalQuotes - 1 && (n += this.gap);
      return n <= this.containerWidth + 40;
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
      for (let n = this.totalQuotes - 1; n >= 0; n--)
        if (this.quoteData[n].offsetLeft <= t + 10)
          return n;
      return this.totalQuotes - 1;
    }
    updateCurrentIndexFromScroll() {
      if (this.isAdaptiveAligning)
        return;
      const t = this.container.scrollLeft;
      for (let n = 0; n < this.totalQuotes; n++) {
        const r = this.quoteData[n], a = r.offsetLeft, l = r.offsetLeft + r.width, c = t + this.containerWidth, h = Math.max(a, t), f = Math.min(l, c);
        if (Math.max(0, f - h) / r.width >= 0.3 || a >= t && a < c) {
          this.currentIndex !== n && (this.currentIndex = n, this.updateNavigationState(), this.updateProgress());
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
      const n = t.querySelector("path");
      t.disabled ? (t.style.background = "transparent", t.style.cursor = "not-allowed", t.style.opacity = "0.5", n && n.setAttribute("stroke", "#146AFF")) : (t.style.background = "#146AFF", t.style.cursor = "pointer", t.style.opacity = "1", n && n.setAttribute("stroke", "white"));
    }
    isAtScrollEnd() {
      const t = this.container.scrollLeft, n = this.container.scrollWidth - this.container.clientWidth;
      return Math.abs(t - n) < 5;
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
  const s = document.querySelectorAll(".quotes-slider-container"), e = [];
  return console.log(`📊 Quotes Slider: Found ${s.length} containers`), s.forEach((i) => {
    const t = new o(i);
    t.shouldEnable() || t.disable(), e.push(t);
  }), window.quotesSliders = e, e;
}
function C() {
  class o {
    constructor() {
      this.init();
    }
    init() {
      this.processRatingElements();
    }
    processRatingElements() {
      const e = document.querySelectorAll("[rating-value]");
      console.log(`⭐ Star Rating: Found ${e.length} elements`), e.forEach((i, t) => {
        const n = i.getAttribute("rating-value"), r = this.snapToNearestTenth(parseFloat(n) || 0);
        i.innerHTML = "";
        const a = this.createStarContainer(r);
        i.appendChild(a), i.setAttribute("rating-value", r.toString());
      });
    }
    snapToNearestTenth(e) {
      const i = Math.max(0, Math.min(5, e));
      return Math.round(i * 10) / 10;
    }
    createStarContainer(e) {
      const i = document.createElement("div");
      i.style.cssText = `
        display: flex;
        gap: 2px;
        align-items: center;
      `;
      for (let t = 1; t <= 5; t++) {
        const n = this.createStar(t, e);
        i.appendChild(n);
      }
      return i;
    }
    createStar(e, i) {
      const t = document.createElement("div");
      t.style.cssText = `
        width: 19px;
        height: 19px;
        position: relative;
        display: inline-block;
      `;
      const n = this.getStarFillState(e, i), r = this.createStarSvg(n);
      return t.appendChild(r), t;
    }
    getStarFillState(e, i) {
      const t = e - 1;
      return i >= e ? "full" : i > t ? { type: "partial", percentage: ((i - t) * 100).toFixed(0) } : "empty";
    }
    createStarSvg(e) {
      const i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      i.setAttribute("xmlns", "http://www.w3.org/2000/svg"), i.setAttribute("width", "19"), i.setAttribute("height", "19"), i.setAttribute("fill", "none"), i.setAttribute("viewBox", "0 0 19 19");
      const t = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      if (t.setAttribute(
        "d",
        "M9.26.745a.41.41 0 0 1 .735 0l2.548 5.162a.41.41 0 0 0 .308.224l5.697.828a.41.41 0 0 1 .228.7l-4.123 4.018a.41.41 0 0 0-.118.363l.973 5.674a.41.41 0 0 1-.594.432l-5.096-2.68a.41.41 0 0 0-.382 0l-5.095 2.68a.41.41 0 0 1-.595-.432l.973-5.674a.41.41 0 0 0-.118-.363L.48 7.658a.41.41 0 0 1 .227-.699l5.697-.828a.41.41 0 0 0 .309-.224L9.26.745Z"
      ), e === "full")
        t.setAttribute("fill", "var(--_colors---utility--color)");
      else if (e === "empty")
        t.setAttribute("fill", "#dcdfe1");
      else if (e.type === "partial") {
        const n = `partial-fill-${e.percentage}`;
        t.setAttribute("fill", `url(#${n})`), this.ensurePartialFillGradient(i, e.percentage, n);
      }
      return i.appendChild(t), i;
    }
    ensurePartialFillGradient(e, i, t) {
      if (!document.getElementById(t)) {
        const n = document.createElementNS(
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
        a.setAttribute("offset", `${i}%`), a.setAttribute("stop-color", "var(--_colors---utility--color)");
        const l = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        l.setAttribute("offset", `${i}%`), l.setAttribute("stop-color", "#dcdfe1"), r.appendChild(a), r.appendChild(l), n.appendChild(r), e.appendChild(n);
      }
    }
  }
  new o();
}
function k() {
  class o {
    constructor() {
      this.init();
    }
    init() {
      console.log(
        "🔀 Comparison Table Toggler: Initialized and listening for clicks"
      ), this.bindEvents();
    }
    bindEvents() {
      document.addEventListener("click", (e) => {
        const i = e.target.closest("[data-cmp-table-trigger]");
        if (!i) return;
        const t = i.getAttribute("data-cmp-table-trigger"), n = i.closest(".comparison-table-container");
        n && (t === "first-column" ? this.activateFirstColumn(n) : t === "last-column" && this.activateLastColumn(n));
      });
    }
    activateFirstColumn(e) {
      const i = e.querySelector(
        '[data-cmp-table-trigger="first-column"]'
      ), t = e.querySelector(
        '[data-cmp-table-trigger="last-column"]'
      );
      i && i.classList.add("comparison-table-link-active"), t && t.classList.remove("comparison-table-link-active"), this.showFirstColumn(e);
    }
    activateLastColumn(e) {
      const i = e.querySelector(
        '[data-cmp-table-trigger="first-column"]'
      ), t = e.querySelector(
        '[data-cmp-table-trigger="last-column"]'
      );
      i && i.classList.remove("comparison-table-link-active"), t && t.classList.add("comparison-table-link-active"), this.showLastColumn(e);
    }
    showFirstColumn(e) {
      e.querySelectorAll(
        ".cmp-table-row.cmp-table-row-first"
      ).forEach((n) => {
        n.style.display = "flex";
      }), e.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      ).forEach((n) => {
        n.style.display = "none";
      });
    }
    showLastColumn(e) {
      e.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      ).forEach((n) => {
        n.style.display = "flex";
      }), e.querySelectorAll(
        ".cmp-table-row.cmp-table-row-first"
      ).forEach((n) => {
        n.style.display = "none";
      });
    }
  }
  new o();
}
function T() {
  const o = document.querySelectorAll(".tabs.w-tabs");
  o.length !== 0 && (console.log(`📱 Tabs Select: Found ${o.length} tab containers`), o.forEach((s) => {
    const e = s.querySelectorAll(".tab-link");
    if (e.length === 0 || s.querySelector(".tabs-select"))
      return;
    const i = document.createElement("select");
    i.className = "tabs-select";
    const t = document.createElement("option");
    t.value = "", t.textContent = "Select a tab...", t.disabled = !0, i.appendChild(t), e.forEach((n, r) => {
      const a = document.createElement("option");
      a.value = r, a.textContent = n.textContent.trim() || `Tab ${r + 1}`, n.classList.contains("w--current") && (a.selected = !0, t.disabled = !1, t.selected = !1), i.appendChild(a);
    }), i.addEventListener("change", function() {
      const n = parseInt(this.value);
      !isNaN(n) && e[n] && e[n].click();
    }), s.insertBefore(i, s.firstChild);
  }), E(), console.log("✅ Tabs Select: Mobile tab selectors initialized"));
}
function E() {
  if (document.getElementById("tabs-select-styles")) return;
  const o = document.createElement("style");
  o.id = "tabs-select-styles", o.textContent = `
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
  `, document.head.appendChild(o);
}
function L() {
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", y) : y();
}
function y() {
  const o = document.querySelectorAll(".tabbed-cards");
  o.length !== 0 && (console.log(
    `🎴 Tabbed Cards: Found ${o.length} containers`
  ), o.forEach((s) => {
    q(s);
  }), console.log("✅ Tabbed Cards: All containers initialized"));
}
function q(o) {
  const s = o.querySelector(".tabbed-cards-image"), e = o.querySelectorAll(".tabbed-card.w-dropdown");
  !s || e.length === 0 || (F(e), I(e, s), e.forEach((i, t) => {
    M(i, t, o, s);
  }), D(e, s), N());
}
function F(o) {
  o.forEach((s, e) => {
    const t = s.querySelector(".tabbed-card-image-wrapper")?.querySelector("img");
    if (!t) return;
    const n = document.createElement("div");
    n.className = "tabbed-card-mobile-image", n.dataset.cardIndex = e;
    const r = t.cloneNode(!0);
    n.appendChild(r), s.parentNode.insertBefore(n, s.nextSibling);
  });
}
function I(o, s) {
  s.innerHTML = "";
  const e = document.createElement("img");
  e.style.width = "100%", e.style.height = "auto", e.style.display = "block", e.style.transition = "opacity 0.2s ease", e.className = "tabbed-card-main-image", s.appendChild(e), o.forEach((i) => {
    const t = i.querySelector(".tabbed-card-image-wrapper img");
    if (t?.src) {
      const n = new Image();
      n.src = t.src;
    }
  });
}
function M(o, s, e, i) {
  const t = o.querySelector(".tabbed-card-toggler");
  if (!t) return;
  t.addEventListener("click", () => {
    t.getAttribute("aria-expanded") === "true" || (B(o, e), setTimeout(() => {
      p(s, i), m(s, e);
    }, 100));
  }), new MutationObserver((r) => {
    r.forEach((a) => {
      a.attributeName === "aria-expanded" && t.getAttribute("aria-expanded") === "true" && (p(s, i), m(s, e));
    });
  }).observe(t, {
    attributes: !0,
    attributeFilter: ["aria-expanded"]
  });
}
function B(o, s) {
  s.querySelectorAll(".tabbed-card.w-dropdown").forEach((i) => {
    if (i !== o) {
      const t = i.querySelector(".tabbed-card-toggler");
      t && t.getAttribute("aria-expanded") === "true" && (t.click(), setTimeout(() => {
        if (t.getAttribute("aria-expanded") === "true") {
          t.setAttribute("aria-expanded", "false");
          const n = i.querySelector(".w-dropdown"), r = i.querySelector(".w-dropdown-list"), a = i.querySelector(".w-dropdown-toggle");
          n?.classList.remove("w--open"), r?.classList.remove("w--open"), a?.classList.remove("w--open");
        }
      }, 50));
    }
  });
}
function p(o, s) {
  const e = s.querySelector(".tabbed-card-main-image");
  if (!e) return;
  const t = s.closest(".tabbed-cards").querySelectorAll(".tabbed-card.w-dropdown")[o];
  if (!t) return;
  const n = t.querySelector(".tabbed-card-image-wrapper img");
  n && e.src !== n.src && (e.style.opacity = "0.5", e.src = n.src, e.alt = n.alt || "", e.onload = () => {
    e.style.opacity = "1";
  });
}
function m(o, s) {
  s.querySelectorAll(
    ".tabbed-card-mobile-image"
  ).forEach((t) => {
    t.style.display = "none";
  });
  const i = s.querySelector(
    `[data-card-index="${o}"]`
  );
  i && (i.style.display = "block");
}
function N() {
  if (document.getElementById("tabbed-cards-mobile-styles")) return;
  const o = document.createElement("style");
  o.id = "tabbed-cards-mobile-styles", o.textContent = `
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
  `, document.head.appendChild(o);
}
function D(o, s) {
  if (o.length === 0) return;
  const e = o[0], i = e.querySelector(".tabbed-card-toggler");
  i && (o.forEach((t, n) => {
    if (n !== 0) {
      const r = t.querySelector(".tabbed-card-toggler");
      r?.getAttribute("aria-expanded") === "true" && r.click();
    }
  }), setTimeout(() => {
    i.getAttribute("aria-expanded") === "true" || (i.click(), setTimeout(() => {
      if (i.getAttribute("aria-expanded") !== "true") {
        i.setAttribute("aria-expanded", "true");
        const n = e.querySelector(".w-dropdown"), r = e.querySelector(".w-dropdown-list"), a = e.querySelector(".w-dropdown-toggle");
        n?.classList.add("w--open"), r?.classList.add("w--open"), a?.classList.add("w--open");
      }
    }, 100)), p(0, s), m(0, e.closest(".tabbed-cards"));
  }, 200));
}
const u = {
  baseUrl: "https://pages.crunchbase.com",
  munchkinId: "976-JJA-800",
  cssUrl: "https://app-sj22.marketo.com/js/forms2/css/forms2.css",
  jsUrl: "https://pages.crunchbase.com/js/forms2/js/forms2.min.js"
};
let d = {
  css: !1,
  js: !1
};
function O() {
  return new Promise((o) => {
    if (d.css || document.querySelector(`link[href="${u.cssUrl}"]`)) {
      d.css = !0, o();
      return;
    }
    const s = document.createElement("link");
    s.rel = "stylesheet", s.href = u.cssUrl, s.onload = () => {
      d.css = !0, console.log("✅ Marketo CSS loaded"), o();
    }, s.onerror = () => {
      console.error("❌ Failed to load Marketo CSS"), o();
    }, document.head.appendChild(s);
  });
}
function $() {
  return new Promise((o) => {
    if (d.js || window.MktoForms2) {
      d.js = !0, o();
      return;
    }
    const s = document.createElement("script");
    s.src = u.jsUrl, s.onload = () => {
      d.js = !0, console.log("✅ Marketo JS loaded"), o();
    }, s.onerror = () => {
      console.error("❌ Failed to load Marketo JS"), o();
    }, document.head.appendChild(s);
  });
}
function R(o) {
  try {
    const s = o.getFormElem()[0], e = Array.from(
      s.querySelectorAll(".mktoFormRow")
    ).filter((i) => !i.querySelector('input[type="hidden"]'));
    s.querySelectorAll(".is-odd-last").forEach((i) => i.classList.remove("is-odd-last")), e.length % 2 === 1 && e[e.length - 1].classList.add("is-odd-last"), console.log(
      `✅ Layout applied to form with ${e.length} visible rows`
    );
  } catch (s) {
    console.error("❌ Error applying layout:", s);
  }
}
let w = 0;
function b(o, s) {
  try {
    if (o.hasAttribute("data-marketo-initialized")) {
      console.log(
        `ℹ️ Marketo form ${s} already initialized in this container`
      );
      return;
    }
    w++;
    const e = `mktoForm_${s}_${w}`;
    o.innerHTML = "";
    const i = document.createElement("form");
    i.id = e, o.appendChild(i), o.setAttribute("data-marketo-initialized", "true"), o.setAttribute("data-marketo-unique-id", e), console.log(
      `🎯 Initializing Marketo form ${s} with unique ID: ${e}`
    ), window.MktoForms2.loadForm(
      u.baseUrl,
      u.munchkinId,
      parseInt(s),
      function(t) {
        console.log(`✅ Marketo form ${s} loaded successfully`);
        const n = t.getFormElem()[0];
        n && (i.parentNode.replaceChild(n, i), n.id = e, console.log(`🎯 Form rendered in container with ID: ${e}`)), setTimeout(() => R(t), 100);
        const r = new CustomEvent("marketoFormLoaded", {
          detail: { form: t, formId: s, container: o, uniqueId: e }
        });
        o.dispatchEvent(r);
      }
    );
  } catch (e) {
    console.error(`❌ Error initializing Marketo form ${s}:`, e);
  }
}
function P() {
  const o = document.querySelectorAll("[data-marketo-id]");
  if (o.length === 0) {
    console.log(
      "ℹ️ No Marketo form containers found (looking for [data-marketo-id])"
    );
    return;
  }
  console.log(`🎯 Found ${o.length} Marketo form container(s)`), o.forEach((s, e) => {
    const i = s.getAttribute("data-marketo-id");
    if (!i) {
      console.warn(
        `⚠️ Container ${e + 1} has data-marketo-id but no value`
      );
      return;
    }
    setTimeout(() => {
      b(s, i);
    }, e * 100);
  });
}
function Q() {
  console.log("🚀 Marketo Forms: Starting initialization..."), Promise.all([O(), $()]).then(() => {
    setTimeout(() => {
      window.MktoForms2 ? (P(), new MutationObserver((s) => {
        s.forEach((e) => {
          e.addedNodes.forEach((i) => {
            if (i.nodeType === 1) {
              if (i.hasAttribute && i.hasAttribute("data-marketo-id")) {
                const n = i.getAttribute("data-marketo-id");
                setTimeout(() => b(i, n), 100);
              }
              (i.querySelectorAll ? i.querySelectorAll("[data-marketo-id]") : []).forEach((n, r) => {
                const a = n.getAttribute("data-marketo-id");
                a && setTimeout(
                  () => b(n, a),
                  (r + 1) * 100
                );
              });
            }
          });
        });
      }).observe(document.body, {
        childList: !0,
        subtree: !0
      }), console.log(
        "✅ Marketo Forms: Initialization complete with dynamic form detection"
      )) : console.error("❌ MktoForms2 not available after loading resources");
    }, 500);
  }).catch((o) => {
    console.error("❌ Error loading Marketo resources:", o);
  });
}
function _() {
  console.log("🚀 Pricing Card Toggler: Starting...");
  const o = document.querySelectorAll(".pricing-card-details");
  if (o.length === 0) {
    console.log("ℹ️ Pricing Card Toggler: No pricing card details found");
    return;
  }
  console.log(
    `📊 Pricing Card Toggler: Found ${o.length} pricing card(s)`
  ), o.forEach((s, e) => {
    new z(s, e);
  }), console.log("✅ Pricing Card Toggler: Complete");
}
class z {
  constructor(s, e) {
    this.cardDetails = s, this.index = e, this.cardId = `pricing-card-${e}`, this.elements = this.getElements(), this.elements && (this.setupAccessibility(), this.setupEventListeners(), this.setActiveState("annual"));
  }
  getElements() {
    const s = {
      toggle: this.cardDetails.querySelector(".pricing-card-toggle"),
      annualToggle: this.cardDetails.querySelector(".pricing-card-toggle-dark"),
      monthlyToggle: this.cardDetails.querySelector(
        ".pricing-card-toggle-light"
      ),
      annualLink: this.cardDetails.querySelector(
        ".pricing-card-toggle-dark-text"
      ),
      monthlyLink: this.cardDetails.querySelector(
        ".pricing-card-toggle-light-text"
      ),
      pricingOptions: this.cardDetails.querySelectorAll(".pricing-card-option")
    };
    s.annualOption = s.pricingOptions[0], s.monthlyOption = s.pricingOptions[1];
    const i = [
      "toggle",
      "annualToggle",
      "monthlyToggle",
      "annualLink",
      "monthlyLink"
    ].filter((t) => !s[t]);
    return i.length > 0 ? (console.warn(
      `⚠️ Pricing Card Toggler: Missing elements in card ${this.index + 1}:`,
      i
    ), null) : s;
  }
  setupAccessibility() {
    const {
      toggle: s,
      annualToggle: e,
      monthlyToggle: i,
      annualLink: t,
      monthlyLink: n,
      annualOption: r,
      monthlyOption: a
    } = this.elements, l = this.generateIds();
    s.setAttribute("role", "tablist"), s.setAttribute("aria-label", "Pricing period selection"), s.id = l.toggle, e.setAttribute("role", "tab"), e.id = l.annual, e.setAttribute("aria-selected", "true"), e.setAttribute("aria-controls", l.annualOption), e.setAttribute("tabindex", "0"), i.setAttribute("role", "tab"), i.id = l.monthly, i.setAttribute("aria-selected", "false"), i.setAttribute("aria-controls", l.monthlyOption), i.setAttribute("tabindex", "-1"), t.setAttribute("tabindex", "-1"), n.setAttribute("tabindex", "-1"), t.setAttribute("aria-hidden", "true"), n.setAttribute("aria-hidden", "true"), r && (r.setAttribute("role", "tabpanel"), r.id = l.annualOption, r.setAttribute("aria-labelledby", l.annual), r.setAttribute("aria-hidden", "false")), a && (a.setAttribute("role", "tabpanel"), a.id = l.monthlyOption, a.setAttribute("aria-labelledby", l.monthly), a.setAttribute("aria-hidden", "true"));
  }
  generateIds() {
    return {
      toggle: `${this.cardId}-toggle`,
      annual: `${this.cardId}-annual`,
      monthly: `${this.cardId}-monthly`,
      annualOption: `${this.cardId}-annual-option`,
      monthlyOption: `${this.cardId}-monthly-option`
    };
  }
  setupEventListeners() {
    const { annualLink: s, monthlyLink: e, annualToggle: i, monthlyToggle: t } = this.elements;
    i.addEventListener("click", (r) => {
      r.preventDefault(), this.setActiveState("annual");
    }), t.addEventListener("click", (r) => {
      r.preventDefault(), this.setActiveState("monthly");
    });
    const n = (r) => this.handleKeyNavigation(r);
    i.addEventListener("keydown", n), t.addEventListener("keydown", n), s.addEventListener("click", (r) => r.preventDefault()), e.addEventListener("click", (r) => r.preventDefault());
  }
  handleKeyNavigation(s) {
    const { key: e, target: i } = s, { annualToggle: t, monthlyToggle: n } = this.elements;
    switch (e) {
      case "ArrowLeft":
      case "ArrowUp":
        s.preventDefault(), i === n && (t.focus(), this.setActiveState("annual"));
        break;
      case "ArrowRight":
      case "ArrowDown":
        s.preventDefault(), i === t && (n.focus(), this.setActiveState("monthly"));
        break;
      case "Enter":
      case " ":
        s.preventDefault();
        {
          const r = i === t;
          this.setActiveState(r ? "annual" : "monthly");
        }
        break;
      case "Home":
        s.preventDefault(), t.focus(), this.setActiveState("annual");
        break;
      case "End":
        s.preventDefault(), n.focus(), this.setActiveState("monthly");
        break;
    }
  }
  setActiveState(s) {
    const e = s === "annual", { annualToggle: i, monthlyToggle: t } = this.elements;
    i.setAttribute("aria-selected", e.toString()), t.setAttribute("aria-selected", (!e).toString()), i.setAttribute("tabindex", e ? "0" : "-1"), t.setAttribute("tabindex", e ? "-1" : "0"), this.updateToggleClasses(e), this.updateTextColors(e), this.updateOptionVisibility(e), U(
      `${e ? "Annual" : "Monthly"} pricing selected`
    );
  }
  updateToggleClasses(s) {
    const { annualToggle: e, monthlyToggle: i } = this.elements;
    e.classList.toggle("pricing-card-toggle-dark", s), e.classList.toggle("pricing-card-toggle-light", !s), i.classList.toggle("pricing-card-toggle-dark", !s), i.classList.toggle("pricing-card-toggle-light", s);
  }
  updateTextColors(s) {
    const { annualLink: e, monthlyLink: i } = this.elements, t = "white", n = "var(--_colors---primary--dark-blue)";
    e.style.color = s ? t : n, i.style.color = s ? n : t;
  }
  updateOptionVisibility(s) {
    const { annualOption: e, monthlyOption: i } = this.elements;
    e && (e.setAttribute("aria-hidden", (!s).toString()), e.style.display = s ? "flex" : "none"), i && (i.setAttribute("aria-hidden", s.toString()), i.style.display = s ? "none" : "flex");
  }
}
function U(o) {
  const s = document.createElement("div");
  s.setAttribute("aria-live", "polite"), s.setAttribute("aria-atomic", "true"), s.style.position = "absolute", s.style.left = "-10000px", s.style.width = "1px", s.style.height = "1px", s.style.overflow = "hidden", document.body.appendChild(s), s.textContent = o, setTimeout(() => {
    document.body.removeChild(s);
  }, 1e3);
}
const v = {
  demo: S,
  logoSlider: x,
  quotesSlider: A,
  starRating: C,
  comparisonTableToggler: k,
  tabsSelect: T,
  tabbedCards: L,
  marketoForms: Q,
  pricingCardToggler: _
  // Add more features here as you create them
  // myFeature: initMyFeature,
};
function W(o = ["demo"]) {
  console.log("🎯 Initializing features:", o), o.forEach((s) => {
    if (v[s])
      try {
        v[s]();
      } catch (e) {
        console.error(`❌ Error initializing feature '${s}':`, e);
      }
    else
      console.warn(`⚠️ Feature '${s}' not found`);
  });
}
if (typeof window < "u" && !window.__CRUNCHBASE_SHOULD_RUN_PROD__) {
  const o = setInterval(() => {
    window.__CRUNCHBASE_SHOULD_RUN_PROD__ && (clearInterval(o), g());
  }, 50);
  setTimeout(() => {
    clearInterval(o), window.__CRUNCHBASE_SHOULD_RUN_PROD__ || (console.log(
      "⏰ Timeout waiting for wrapper, running production code anyway..."
    ), g());
  }, 5e3);
} else
  g();
function g() {
  console.log("🚀 Crunchbase Webflow script loaded"), W([
    "logoSlider",
    "quotesSlider",
    "starRating",
    "comparisonTableToggler",
    "tabsSelect",
    "tabbedCards",
    // RE-ENABLED with safer implementation
    "marketoForms",
    // Marketo forms integration
    "pricingCardToggler"
    // Pricing card annual/monthly toggler
  ]);
}
