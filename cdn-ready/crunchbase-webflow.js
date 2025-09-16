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
function k() {
  document.body.style.border = "5px solid navy", document.body.style.margin = "0", document.body.style.boxSizing = "border-box";
}
const L = () => {
  const r = document.querySelectorAll('[data-logo-slider="true"]'), n = 7;
  !r || r.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches || r.forEach((e) => {
    const i = e.querySelectorAll(":scope > *");
    i.length === 0 || i.length < n || (e.setAttribute("data-logo-slider-init", "true"), e.style.setProperty("--ls-items", i.length), i.forEach((t, s) => {
      t.style.setProperty("--ls-item-index", s + 1);
    }));
  });
};
function q() {
  class r {
    constructor(t) {
      this.container = t, this.currentIndex = 0, this.quotes = [], this.totalQuotes = 0, this.containerWidth = 0, this.isAnimating = !1, this.resizeTimeout = null, this.animationDuration = this.getCSSVariable(
        "--quotes-slider-duration",
        "400ms"
      ), this.animationEasing = this.getCSSVariable(
        "--quotes-slider-easing",
        "ease-out"
      ), this.init();
    }
    getCSSVariable(t, s) {
      return getComputedStyle(document.documentElement).getPropertyValue(
        t
      ).trim() || s;
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
      const s = window.matchMedia("(max-width: 991px)").matches;
      let o = 0;
      this.quoteData = this.quotes.map((a, l) => {
        let c;
        s ? (c = this.containerWidth, a.style.width = `${this.containerWidth}px`) : a.classList.contains("quote-card-featured") ? (c = 862, a.style.width = "862px") : a.classList.contains("quote-card") ? (c = 410, a.style.width = "410px") : c = a.getBoundingClientRect().width;
        const f = {
          element: a,
          width: c,
          offsetLeft: o,
          index: l
        };
        return o += c + (l < this.totalQuotes - 1 ? this.gap : 0), f;
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
      const t = this.navContainer.style.justifyContent === "center", s = window.matchMedia("(max-width: 991px)").matches;
      this.calculateDimensions(), t !== s && (this.navContainer && this.navContainer.parentNode && this.navContainer.parentNode.removeChild(this.navContainer), this.createNavigation()), this.updateNavigationState(), this.updateProgress();
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
            const s = Math.max(0, this.currentIndex - 2);
            this.currentIndex = s, this.scrollToQuote(this.currentIndex);
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
      let s = 0;
      for (let l = t; l < this.totalQuotes; l++)
        s += this.quoteData[l].width, l < this.totalQuotes - 1 && (s += this.gap);
      return s <= this.containerWidth + 40;
    }
    scrollToQuote(t) {
      if (t < 0 || t >= this.totalQuotes) return;
      this.currentIndex = t;
      const o = this.quoteData[t].offsetLeft;
      this.container.scrollTo({
        left: o,
        behavior: "smooth"
      }), this.updateNavigationState(), setTimeout(() => {
        this.updateProgress();
      }, 50);
    }
    scrollToRightAlignment() {
      const t = this.quoteData[this.totalQuotes - 1], o = t.offsetLeft + t.width - this.containerWidth;
      this.currentIndex = this.totalQuotes - 1, this.isAdaptiveAligning = !0, this.container.scrollTo({
        left: Math.max(0, o),
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
      for (let s = this.totalQuotes - 1; s >= 0; s--)
        if (this.quoteData[s].offsetLeft <= t + 10)
          return s;
      return this.totalQuotes - 1;
    }
    updateCurrentIndexFromScroll() {
      if (this.isAdaptiveAligning)
        return;
      const t = this.container.scrollLeft;
      for (let s = 0; s < this.totalQuotes; s++) {
        const o = this.quoteData[s], a = o.offsetLeft, l = o.offsetLeft + o.width, c = t + this.containerWidth, f = Math.max(a, t), d = Math.min(l, c);
        if (Math.max(0, d - f) / o.width >= 0.3 || a >= t && a < c) {
          this.currentIndex !== s && (this.currentIndex = s, this.updateNavigationState(), this.updateProgress());
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
      const s = t.querySelector("path");
      t.disabled ? (t.style.background = "transparent", t.style.cursor = "not-allowed", t.style.opacity = "0.5", s && s.setAttribute("stroke", "#146AFF")) : (t.style.background = "#146AFF", t.style.cursor = "pointer", t.style.opacity = "1", s && s.setAttribute("stroke", "white"));
    }
    isAtScrollEnd() {
      const t = this.container.scrollLeft, s = this.container.scrollWidth - this.container.clientWidth;
      return Math.abs(t - s) < 5;
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
  const n = document.querySelectorAll(".quotes-slider-container"), e = [];
  return console.log(`📊 Quotes Slider: Found ${n.length} containers`), n.forEach((i) => {
    const t = new r(i);
    t.shouldEnable() || t.disable(), e.push(t);
  }), window.quotesSliders = e, e;
}
function I() {
  class r {
    constructor() {
      this.init();
    }
    init() {
      this.processRatingElements();
    }
    processRatingElements() {
      const e = document.querySelectorAll("[rating-value]");
      console.log(`⭐ Star Rating: Found ${e.length} elements`), e.forEach((i, t) => {
        const s = i.getAttribute("rating-value"), o = this.snapToNearestTenth(parseFloat(s) || 0);
        i.innerHTML = "";
        const a = this.createStarContainer(o);
        i.appendChild(a), i.setAttribute("rating-value", o.toString());
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
        const s = this.createStar(t, e);
        i.appendChild(s);
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
      const s = this.getStarFillState(e, i), o = this.createStarSvg(s);
      return t.appendChild(o), t;
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
        const s = `partial-fill-${e.percentage}`;
        t.setAttribute("fill", `url(#${s})`), this.ensurePartialFillGradient(i, e.percentage, s);
      }
      return i.appendChild(t), i;
    }
    ensurePartialFillGradient(e, i, t) {
      if (!document.getElementById(t)) {
        const s = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs"
        ), o = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "linearGradient"
        );
        o.setAttribute("id", t), o.setAttribute("gradientUnits", "objectBoundingBox"), o.setAttribute("x1", "0%"), o.setAttribute("y1", "0%"), o.setAttribute("x2", "100%"), o.setAttribute("y2", "0%");
        const a = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        a.setAttribute("offset", `${i}%`), a.setAttribute("stop-color", "var(--_colors---utility--color)");
        const l = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        l.setAttribute("offset", `${i}%`), l.setAttribute("stop-color", "#dcdfe1"), o.appendChild(a), o.appendChild(l), s.appendChild(o), e.appendChild(s);
      }
    }
  }
  new r();
}
function B() {
  class r {
    constructor() {
      this.init();
    }
    init() {
      this.bindEvents();
    }
    bindEvents() {
      document.addEventListener("click", (e) => {
        const i = e.target.closest("[data-cmp-table-trigger]");
        if (!i) return;
        const t = i.getAttribute("data-cmp-table-trigger"), s = i.closest(".comparison-table-container");
        s && (t === "first-column" ? this.activateFirstColumn(s) : t === "last-column" && this.activateLastColumn(s));
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
      ).forEach((s) => {
        s.style.display = "flex";
      }), e.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      ).forEach((s) => {
        s.style.display = "none";
      });
    }
    showLastColumn(e) {
      e.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      ).forEach((s) => {
        s.style.display = "flex";
      }), e.querySelectorAll(
        ".cmp-table-row.cmp-table-row-first"
      ).forEach((s) => {
        s.style.display = "none";
      });
    }
  }
  new r();
}
function F() {
  const r = document.querySelectorAll(".tabs.w-tabs");
  r.length !== 0 && (console.log(`📱 Tabs Select: Found ${r.length} tab containers`), r.forEach((n) => {
    const e = n.querySelectorAll(".tab-link");
    if (e.length === 0 || n.querySelector(".tabs-select"))
      return;
    const i = document.createElement("select");
    i.className = "tabs-select";
    const t = document.createElement("option");
    t.value = "", t.textContent = "Select a tab...", t.disabled = !0, i.appendChild(t), e.forEach((s, o) => {
      const a = document.createElement("option");
      a.value = o, a.textContent = s.textContent.trim() || `Tab ${o + 1}`, s.classList.contains("w--current") && (a.selected = !0, t.disabled = !1, t.selected = !1), i.appendChild(a);
    }), i.addEventListener("change", function() {
      const s = parseInt(this.value);
      !isNaN(s) && e[s] && e[s].click();
    }), n.insertBefore(i, n.firstChild);
  }), M());
}
function M() {
  if (document.getElementById("tabs-select-styles")) return;
  const r = document.createElement("style");
  r.id = "tabs-select-styles", r.textContent = `
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
  `, document.head.appendChild(r);
}
function N() {
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", A) : A();
}
function A() {
  const r = document.querySelectorAll(".tabbed-cards");
  r.length !== 0 && (console.log(
    `🎴 Tabbed Cards: Found ${r.length} containers`
  ), r.forEach((n) => {
    D(n);
  }));
}
function D(r) {
  const n = r.querySelector(".tabbed-cards-image"), e = r.querySelectorAll(".tabbed-card.w-dropdown");
  !n || e.length === 0 || (O(e), R(e, n), e.forEach((i, t) => {
    $(i, t, r, n);
  }), W(e, n), Q());
}
function O(r) {
  r.forEach((n, e) => {
    const t = n.querySelector(".tabbed-card-image-wrapper")?.querySelector("img");
    if (!t) return;
    const s = document.createElement("div");
    s.className = "tabbed-card-mobile-image", s.dataset.cardIndex = e;
    const o = t.cloneNode(!0);
    s.appendChild(o), n.parentNode.insertBefore(s, n.nextSibling);
  });
}
function R(r, n) {
  n.innerHTML = "";
  const e = document.createElement("img");
  e.style.width = "100%", e.style.height = "auto", e.style.display = "block", e.style.transition = "opacity 0.2s ease", e.className = "tabbed-card-main-image", n.appendChild(e), r.forEach((i) => {
    const t = i.querySelector(".tabbed-card-image-wrapper img");
    if (t?.src) {
      const s = new Image();
      s.src = t.src;
    }
  });
}
function $(r, n, e, i) {
  const t = r.querySelector(".tabbed-card-toggler");
  if (!t) return;
  t.addEventListener("click", () => {
    t.getAttribute("aria-expanded") === "true" || (P(r, e), setTimeout(() => {
      w(n, i), v(n, e);
    }, 100));
  }), new MutationObserver((o) => {
    o.forEach((a) => {
      a.attributeName === "aria-expanded" && t.getAttribute("aria-expanded") === "true" && (w(n, i), v(n, e));
    });
  }).observe(t, {
    attributes: !0,
    attributeFilter: ["aria-expanded"]
  });
}
function P(r, n) {
  n.querySelectorAll(".tabbed-card.w-dropdown").forEach((i) => {
    if (i !== r) {
      const t = i.querySelector(".tabbed-card-toggler");
      t && t.getAttribute("aria-expanded") === "true" && (t.click(), setTimeout(() => {
        if (t.getAttribute("aria-expanded") === "true") {
          t.setAttribute("aria-expanded", "false");
          const s = i.querySelector(".w-dropdown"), o = i.querySelector(".w-dropdown-list"), a = i.querySelector(".w-dropdown-toggle");
          s?.classList.remove("w--open"), o?.classList.remove("w--open"), a?.classList.remove("w--open");
        }
      }, 50));
    }
  });
}
function w(r, n) {
  const e = n.querySelector(".tabbed-card-main-image");
  if (!e) return;
  const t = n.closest(".tabbed-cards").querySelectorAll(".tabbed-card.w-dropdown")[r];
  if (!t) return;
  const s = t.querySelector(".tabbed-card-image-wrapper img");
  s && e.src !== s.src && (e.style.opacity = "0.5", e.src = s.src, e.alt = s.alt || "", e.onload = () => {
    e.style.opacity = "1";
  });
}
function v(r, n) {
  n.querySelectorAll(
    ".tabbed-card-mobile-image"
  ).forEach((t) => {
    t.style.display = "none";
  });
  const i = n.querySelector(
    `[data-card-index="${r}"]`
  );
  i && (i.style.display = "block");
}
function Q() {
  if (document.getElementById("tabbed-cards-mobile-styles")) return;
  const r = document.createElement("style");
  r.id = "tabbed-cards-mobile-styles", r.textContent = `
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
  `, document.head.appendChild(r);
}
function W(r, n) {
  if (r.length === 0) return;
  const e = r[0], i = e.querySelector(".tabbed-card-toggler");
  i && (r.forEach((t, s) => {
    if (s !== 0) {
      const o = t.querySelector(".tabbed-card-toggler");
      o?.getAttribute("aria-expanded") === "true" && o.click();
    }
  }), setTimeout(() => {
    i.getAttribute("aria-expanded") === "true" || (i.click(), setTimeout(() => {
      if (i.getAttribute("aria-expanded") !== "true") {
        i.setAttribute("aria-expanded", "true");
        const s = e.querySelector(".w-dropdown"), o = e.querySelector(".w-dropdown-list"), a = e.querySelector(".w-dropdown-toggle");
        s?.classList.add("w--open"), o?.classList.add("w--open"), a?.classList.add("w--open");
      }
    }, 100)), w(0, n), v(0, e.closest(".tabbed-cards"));
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
function _() {
  return new Promise((r) => {
    if (g.css || document.querySelector(`link[href="${b.cssUrl}"]`)) {
      g.css = !0, r();
      return;
    }
    const n = document.createElement("link");
    n.rel = "stylesheet", n.href = b.cssUrl, n.onload = () => {
      g.css = !0, r();
    }, n.onerror = () => {
      console.error("❌ Failed to load Marketo CSS"), r();
    }, document.head.appendChild(n);
  });
}
function z() {
  return new Promise((r) => {
    if (g.js || window.MktoForms2) {
      g.js = !0, r();
      return;
    }
    const n = document.createElement("script");
    n.src = b.jsUrl, n.onload = () => {
      g.js = !0, r();
    }, n.onerror = () => {
      console.error("❌ Failed to load Marketo JS"), r();
    }, document.head.appendChild(n);
  });
}
function U(r) {
  try {
    const n = r.getFormElem()[0], e = Array.from(
      n.querySelectorAll(".mktoFormRow")
    ).filter((i) => !i.querySelector('input[type="hidden"]'));
    n.querySelectorAll(".is-odd-last").forEach((i) => i.classList.remove("is-odd-last")), e.length % 2 === 1 && e[e.length - 1].classList.add("is-odd-last");
  } catch (n) {
    console.error("❌ Error applying layout:", n);
  }
}
let C = 0;
function x(r, n) {
  try {
    if (r.hasAttribute("data-marketo-initialized"))
      return;
    C++;
    const e = `mktoForm_${n}_${C}`;
    r.innerHTML = "";
    const i = document.createElement("form");
    i.id = e, r.appendChild(i), r.setAttribute("data-marketo-initialized", "true"), r.setAttribute("data-marketo-unique-id", e), window.MktoForms2.loadForm(
      b.baseUrl,
      b.munchkinId,
      parseInt(n),
      function(t) {
        const s = t.getFormElem()[0];
        s && (i.parentNode.replaceChild(s, i), s.id = e), setTimeout(() => U(t), 100);
        const o = new CustomEvent("marketoFormLoaded", {
          detail: { form: t, formId: n, container: r, uniqueId: e }
        });
        r.dispatchEvent(o);
      }
    );
  } catch (e) {
    console.error(`❌ Error initializing Marketo form ${n}:`, e);
  }
}
function j() {
  const r = document.querySelectorAll("[data-marketo-id]");
  r.length !== 0 && (console.log(`🎯 Found ${r.length} Marketo form container(s)`), r.forEach((n, e) => {
    const i = n.getAttribute("data-marketo-id");
    if (!i) {
      console.warn(
        `⚠️ Container ${e + 1} has data-marketo-id but no value`
      );
      return;
    }
    setTimeout(() => {
      x(n, i);
    }, e * 100);
  }));
}
function H() {
  Promise.all([_(), z()]).then(() => {
    setTimeout(() => {
      window.MktoForms2 ? (j(), new MutationObserver((n) => {
        n.forEach((e) => {
          e.addedNodes.forEach((i) => {
            if (i.nodeType === 1) {
              if (i.hasAttribute && i.hasAttribute("data-marketo-id")) {
                const s = i.getAttribute("data-marketo-id");
                setTimeout(() => x(i, s), 100);
              }
              (i.querySelectorAll ? i.querySelectorAll("[data-marketo-id]") : []).forEach((s, o) => {
                const a = s.getAttribute("data-marketo-id");
                a && setTimeout(
                  () => x(s, a),
                  (o + 1) * 100
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
  }).catch((r) => {
    console.error("❌ Error loading Marketo resources:", r);
  });
}
function V() {
  const r = document.querySelectorAll(".pricing-card-details");
  r.length !== 0 && (console.log(
    `📊 Pricing Card Toggler: Found ${r.length} pricing card(s)`
  ), r.forEach((n, e) => {
    new X(n, e);
  }));
}
class X {
  constructor(n, e) {
    this.cardDetails = n, this.index = e, this.cardId = `pricing-card-${e}`, this.elements = this.getElements(), this.elements && (this.setupAccessibility(), this.setupEventListeners(), this.setActiveState("annual"));
  }
  getElements() {
    const n = {
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
    n.annualOption = n.pricingOptions[0], n.monthlyOption = n.pricingOptions[1];
    const i = [
      "toggle",
      "annualToggle",
      "monthlyToggle",
      "annualLink",
      "monthlyLink"
    ].filter((t) => !n[t]);
    return i.length > 0 ? (console.warn(
      `⚠️ Pricing Card Toggler: Missing elements in card ${this.index + 1}:`,
      i
    ), null) : n;
  }
  setupAccessibility() {
    const {
      toggle: n,
      annualToggle: e,
      monthlyToggle: i,
      annualLink: t,
      monthlyLink: s,
      annualOption: o,
      monthlyOption: a
    } = this.elements, l = this.generateIds();
    n.setAttribute("role", "tablist"), n.setAttribute("aria-label", "Pricing period selection"), n.id = l.toggle, e.setAttribute("role", "tab"), e.id = l.annual, e.setAttribute("aria-selected", "true"), e.setAttribute("aria-controls", l.annualOption), e.setAttribute("tabindex", "0"), i.setAttribute("role", "tab"), i.id = l.monthly, i.setAttribute("aria-selected", "false"), i.setAttribute("aria-controls", l.monthlyOption), i.setAttribute("tabindex", "-1"), t.setAttribute("tabindex", "-1"), s.setAttribute("tabindex", "-1"), t.setAttribute("aria-hidden", "true"), s.setAttribute("aria-hidden", "true"), o && (o.setAttribute("role", "tabpanel"), o.id = l.annualOption, o.setAttribute("aria-labelledby", l.annual), o.setAttribute("aria-hidden", "false")), a && (a.setAttribute("role", "tabpanel"), a.id = l.monthlyOption, a.setAttribute("aria-labelledby", l.monthly), a.setAttribute("aria-hidden", "true"));
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
    const { annualLink: n, monthlyLink: e, annualToggle: i, monthlyToggle: t } = this.elements;
    i.addEventListener("click", (o) => {
      o.preventDefault(), this.setActiveState("annual");
    }), t.addEventListener("click", (o) => {
      o.preventDefault(), this.setActiveState("monthly");
    });
    const s = (o) => this.handleKeyNavigation(o);
    i.addEventListener("keydown", s), t.addEventListener("keydown", s), n.addEventListener("click", (o) => o.preventDefault()), e.addEventListener("click", (o) => o.preventDefault());
  }
  handleKeyNavigation(n) {
    const { key: e, target: i } = n, { annualToggle: t, monthlyToggle: s } = this.elements;
    switch (e) {
      case "ArrowLeft":
      case "ArrowUp":
        n.preventDefault(), i === s && (t.focus(), this.setActiveState("annual"));
        break;
      case "ArrowRight":
      case "ArrowDown":
        n.preventDefault(), i === t && (s.focus(), this.setActiveState("monthly"));
        break;
      case "Enter":
      case " ":
        n.preventDefault();
        {
          const o = i === t;
          this.setActiveState(o ? "annual" : "monthly");
        }
        break;
      case "Home":
        n.preventDefault(), t.focus(), this.setActiveState("annual");
        break;
      case "End":
        n.preventDefault(), s.focus(), this.setActiveState("monthly");
        break;
    }
  }
  setActiveState(n) {
    const e = n === "annual", { annualToggle: i, monthlyToggle: t } = this.elements;
    i.setAttribute("aria-selected", e.toString()), t.setAttribute("aria-selected", (!e).toString()), i.setAttribute("tabindex", e ? "0" : "-1"), t.setAttribute("tabindex", e ? "-1" : "0"), this.updateToggleClasses(e), this.updateTextColors(e), this.updateOptionVisibility(e), G(
      `${e ? "Annual" : "Monthly"} pricing selected`
    );
  }
  updateToggleClasses(n) {
    const { annualToggle: e, monthlyToggle: i } = this.elements;
    e.classList.toggle("pricing-card-toggle-dark", n), e.classList.toggle("pricing-card-toggle-light", !n), i.classList.toggle("pricing-card-toggle-dark", !n), i.classList.toggle("pricing-card-toggle-light", n);
  }
  updateTextColors(n) {
    const { annualLink: e, monthlyLink: i } = this.elements, t = "white", s = "var(--_colors---primary--dark-blue)";
    e.style.color = n ? t : s, i.style.color = n ? s : t;
  }
  updateOptionVisibility(n) {
    const { annualOption: e, monthlyOption: i } = this.elements;
    e && (e.setAttribute("aria-hidden", (!n).toString()), e.style.display = n ? "flex" : "none"), i && (i.setAttribute("aria-hidden", n.toString()), i.style.display = n ? "none" : "flex");
  }
}
function G(r) {
  const n = document.createElement("div");
  n.setAttribute("aria-live", "polite"), n.setAttribute("aria-atomic", "true"), n.style.position = "absolute", n.style.left = "-10000px", n.style.width = "1px", n.style.height = "1px", n.style.overflow = "hidden", document.body.appendChild(n), n.textContent = r, setTimeout(() => {
    document.body.removeChild(n);
  }, 1e3);
}
function J() {
  class r {
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
    getCSSVariable(t, s) {
      return getComputedStyle(document.documentElement).getPropertyValue(t).trim() || s;
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
      this.items.forEach((s) => {
        s.style.cssText = `
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
      const s = -(this.currentIndex * (this.containerWidth + this.gap));
      this.itemsContainer.style.transform = `translateX(${s}px)`, this.updateNavigationState(), setTimeout(() => {
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
  const n = document.querySelectorAll(
    ".related-item-collection-list-wrapper"
  ), e = [];
  return console.log(
    `📰 Related Articles Slider: Found ${n.length} containers`
  ), n.forEach((i) => {
    const t = i, s = i.querySelector(
      ".related-item-collection-list"
    ), o = i.querySelectorAll(".collection-item");
    if (t && s && o.length > 0) {
      const a = new r(t);
      e.push(a);
    }
  }), window.relatedArticlesSliders = e, e;
}
function K() {
  const r = () => {
    const n = document.querySelector(".blog-content-richtext");
    if (!n)
      return;
    console.log("📖 Reading Time Estimate: Found rich text element");
    const i = (n.textContent || n.innerText).trim().split(/\s+/).length, s = Math.ceil(i / 200), o = document.querySelector(".read-time-estimate");
    o && (o.textContent = `${s} min read`), n.querySelectorAll("iframe").forEach((l) => {
      const c = l.getAttribute("src") || "";
      (c.includes("youtube.com") || c.includes("youtu.be")) && l.classList.add("youtube-iframe");
    });
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", r) : r();
}
function Y() {
  const r = () => {
    const n = document.querySelector(".table-of-content"), e = document.querySelector(".blog-content");
    if (!e)
      return;
    console.log("📚 Table of Contents: Found blog content element");
    const i = e.querySelectorAll("h2");
    let t = null, s = !1;
    function o() {
      if (i.length === 0) return;
      const d = document.createElement("ul");
      i.forEach((h, u) => {
        const m = document.createElement("li"), p = document.createElement("a"), T = h.textContent.trim(), S = h.getAttribute("id");
        S && (p.href = `#${S}`, p.textContent = T, p.classList.add("toc-link"), u === 0 && (p.classList.add("active"), t = p), m.appendChild(p), d.appendChild(m));
      }), n && (n.innerHTML = "", n.appendChild(d));
    }
    o();
    const a = document.querySelectorAll(".toc-link");
    function l(d) {
      s || t === d || (s = !0, requestAnimationFrame(() => {
        t && t.classList.remove("active"), d && d.classList.add("active"), t = d, s = !1;
      }));
    }
    a.forEach((d) => {
      d.addEventListener("click", function(h) {
        h.preventDefault();
        const u = this.getAttribute("href").substring(1), m = document.getElementById(u);
        m && m.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    let c = !1;
    function f() {
      c || (c = !0, requestAnimationFrame(() => {
        const d = window.scrollY;
        let h = null;
        for (let u = i.length - 1; u >= 0; u--) {
          const m = i[u], p = m.offsetTop;
          if (d >= p - 100) {
            h = m;
            break;
          }
        }
        if (!h && i.length > 0) {
          const u = i[0];
          d < u.offsetTop - 100 && (h = u);
        }
        if (h) {
          const u = document.querySelector(
            `.toc-link[href="#${h.getAttribute("id")}"]`
          );
          l(u);
        }
        c = !1;
      }));
    }
    window.addEventListener("scroll", f, { passive: !0 });
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", r) : r();
}
const E = {
  demo: k,
  logoSlider: L,
  quotesSlider: q,
  starRating: I,
  comparisonTableToggler: B,
  tabsSelect: F,
  tabbedCards: N,
  marketoForms: H,
  pricingCardToggler: V,
  relatedArticlesSlider: J,
  readingTimeEstimate: K,
  tableOfContents: Y
  // Add more features here as you create them
  // myFeature: initMyFeature,
};
function Z(r = ["demo"]) {
  r.forEach((n) => {
    if (E[n])
      try {
        E[n]();
      } catch (e) {
        console.error(`❌ Error initializing feature '${n}':`, e);
      }
    else
      console.warn(`⚠️ Feature '${n}' not found`);
  });
}
if (typeof window < "u" && !window.__CRUNCHBASE_SHOULD_RUN_PROD__) {
  const r = setInterval(() => {
    window.__CRUNCHBASE_SHOULD_RUN_PROD__ && (clearInterval(r), y());
  }, 50);
  setTimeout(() => {
    clearInterval(r), window.__CRUNCHBASE_SHOULD_RUN_PROD__ || (console.log(
      "⏰ Timeout waiting for wrapper, running production code anyway..."
    ), y());
  }, 5e3);
} else
  y();
function y() {
  console.log("🚀 Crunchbase Webflow script loaded"), Z([
    "logoSlider",
    "quotesSlider",
    "starRating",
    "comparisonTableToggler",
    "tabsSelect",
    "tabbedCards",
    // RE-ENABLED with safer implementation
    "marketoForms",
    // Marketo forms integration
    "pricingCardToggler",
    // Pricing card annual/monthly toggler
    "relatedArticlesSlider",
    // Related articles slider for blog posts
    "readingTimeEstimate",
    // Reading time estimate for blog posts
    "tableOfContents"
    // Table of contents for blog posts
  ]);
}
