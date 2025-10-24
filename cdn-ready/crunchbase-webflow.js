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
function Y() {
  document.body.style.border = "5px solid navy", document.body.style.margin = "0", document.body.style.boxSizing = "border-box";
}
const Z = () => {
  const s = document.querySelectorAll('[data-logo-slider="true"]'), o = 7;
  !s || s.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches || s.forEach((n) => {
    const e = n.querySelectorAll(":scope > *");
    e.length === 0 || e.length < o || (n.setAttribute("data-logo-slider-init", "true"), n.style.setProperty("--ls-items", e.length), e.forEach((t, i) => {
      t.style.setProperty("--ls-item-index", i + 1);
    }));
  });
};
function tt() {
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
      let a = 0;
      this.quoteData = this.quotes.map((r, l) => {
        let c;
        i ? (c = this.containerWidth, r.style.width = `${this.containerWidth}px`) : r.classList.contains("quote-card-featured") ? (c = 862, r.style.width = "862px") : r.classList.contains("quote-card") ? (c = 410, r.style.width = "410px") : c = r.getBoundingClientRect().width;
        const u = {
          element: r,
          width: c,
          offsetLeft: a,
          index: l
        };
        return a += c + (l < this.totalQuotes - 1 ? this.gap : 0), u;
      }), this.lastNavigableIndex = this.calculateLastNavigableIndex();
    }
    calculateLastNavigableIndex() {
      const t = this.quoteData[this.totalQuotes - 1], a = t.offsetLeft + t.width - this.containerWidth;
      if (a <= 0)
        return 0;
      const r = 50;
      for (let l = this.totalQuotes - 1; l >= 0; l--)
        if (this.quoteData[l].offsetLeft <= a + r)
          return l;
      return 0;
    }
    createNavigation() {
      const t = window.matchMedia("(max-width: 991px)").matches;
      this.navContainer = document.createElement("div"), this.navContainer.className = "quotes-slider-nav", this.navContainer.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 30px;
        justify-content: ${t ? "center" : "flex-start"};
      `, this.prevBtn = document.createElement("button"), this.prevBtn.className = "arrow-button quotes-slider-prev", this.prevBtn.innerHTML = `
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
      `, this.nextBtn = document.createElement("button"), this.nextBtn.className = "arrow-button quotes-slider-next", this.nextBtn.innerHTML = `
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
      if (t < this.totalQuotes - 2)
        return !1;
      let i = 0;
      for (let r = t; r < this.totalQuotes; r++)
        i += this.quoteData[r].width, r < this.totalQuotes - 1 && (i += this.gap);
      return i < this.containerWidth;
    }
    scrollToQuote(t) {
      if (t < 0 || t >= this.totalQuotes) return;
      this.currentIndex = t;
      const a = this.quoteData[t].offsetLeft;
      this.container.scrollTo({
        left: a,
        behavior: "smooth"
      }), this.updateNavigationState(), setTimeout(() => {
        this.updateProgress();
      }, 50);
    }
    scrollToRightAlignment() {
      const t = this.quoteData[this.totalQuotes - 1], a = t.offsetLeft + t.width - this.containerWidth;
      this.currentIndex = this.totalQuotes - 1, this.isAdaptiveAligning = !0, this.container.scrollTo({
        left: Math.max(0, a),
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
        const a = this.quoteData[i], r = a.offsetLeft, l = a.offsetLeft + a.width, c = t + this.containerWidth, u = Math.max(r, t), p = Math.min(l, c);
        if (Math.max(0, p - u) / a.width >= 0.3 || r >= t && r < c) {
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
      const t = this.currentIndex >= this.lastNavigableIndex || this.isAtScrollEnd();
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
      const t = this.lastNavigableIndex > 0 ? this.currentIndex / this.lastNavigableIndex * 100 : 0;
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
function et() {
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
        const i = e.getAttribute("rating-value"), a = this.snapToNearestTenth(parseFloat(i) || 0);
        e.innerHTML = "";
        const r = this.createStarContainer(a);
        e.appendChild(r), e.setAttribute("rating-value", a.toString());
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
      const i = this.getStarFillState(n, e), a = this.createStarSvg(i);
      return t.appendChild(a), t;
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
        ), a = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "linearGradient"
        );
        a.setAttribute("id", t), a.setAttribute("gradientUnits", "objectBoundingBox"), a.setAttribute("x1", "0%"), a.setAttribute("y1", "0%"), a.setAttribute("x2", "100%"), a.setAttribute("y2", "0%");
        const r = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        r.setAttribute("offset", `${e}%`), r.setAttribute("stop-color", "currentColor");
        const l = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        l.setAttribute("offset", `${e}%`), l.setAttribute("stop-color", "currentColor"), l.setAttribute("stop-opacity", "0.15"), a.appendChild(r), a.appendChild(l), i.appendChild(a), n.appendChild(i);
      }
    }
  }
  new s();
}
function it() {
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
function nt() {
  const s = document.querySelectorAll(".tabs.w-tabs");
  s.length !== 0 && (console.log(`📱 Tabs Select: Found ${s.length} tab containers`), s.forEach((o) => {
    const n = o.querySelectorAll(".tab-link");
    if (n.length === 0 || o.querySelector(".tabs-select"))
      return;
    const e = document.createElement("select");
    e.className = "tabs-select";
    const t = document.createElement("option");
    t.value = "", t.textContent = "Select a tab...", t.disabled = !0, e.appendChild(t), n.forEach((i, a) => {
      const r = document.createElement("option");
      r.value = a, r.textContent = i.textContent.trim() || `Tab ${a + 1}`, i.classList.contains("w--current") && (r.selected = !0, t.disabled = !1, t.selected = !1), e.appendChild(r);
    }), e.addEventListener("change", function() {
      const i = parseInt(this.value);
      !isNaN(i) && n[i] && n[i].click();
    }), o.insertBefore(e, o.firstChild);
  }), ot());
}
function ot() {
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
function st() {
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", z) : z();
}
function z() {
  const s = document.querySelectorAll(".tabbed-cards");
  s.length !== 0 && (console.log(
    `🎴 Tabbed Cards: Found ${s.length} containers`
  ), s.forEach((o) => {
    at(o);
  }));
}
function at(s) {
  const o = s.querySelector(".tabbed-cards-image"), n = s.querySelectorAll(".tabbed-card.w-dropdown");
  !o || n.length === 0 || (rt(n), lt(n, o), n.forEach((e, t) => {
    ct(e, t, s, o);
  }), ht(n, o), ut());
}
function rt(s) {
  s.forEach((o, n) => {
    const t = o.querySelector(".tabbed-card-image-wrapper")?.querySelector("img");
    if (!t) return;
    const i = document.createElement("div");
    i.className = "tabbed-card-mobile-image", i.dataset.cardIndex = n;
    const a = t.cloneNode(!0);
    i.appendChild(a), o.parentNode.insertBefore(i, o.nextSibling);
  });
}
function lt(s, o) {
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
function ct(s, o, n, e) {
  const t = s.querySelector(".tabbed-card-toggler");
  if (!t) return;
  t.addEventListener("click", () => {
    t.getAttribute("aria-expanded") === "true" || (dt(s, n), setTimeout(() => {
      _(o, e), W(o, n);
    }, 100));
  }), new MutationObserver((a) => {
    a.forEach((r) => {
      r.attributeName === "aria-expanded" && t.getAttribute("aria-expanded") === "true" && (_(o, e), W(o, n));
    });
  }).observe(t, {
    attributes: !0,
    attributeFilter: ["aria-expanded"]
  });
}
function dt(s, o) {
  o.querySelectorAll(".tabbed-card.w-dropdown").forEach((e) => {
    if (e !== s) {
      const t = e.querySelector(".tabbed-card-toggler");
      t && t.getAttribute("aria-expanded") === "true" && (t.click(), setTimeout(() => {
        if (t.getAttribute("aria-expanded") === "true") {
          t.setAttribute("aria-expanded", "false");
          const i = e.querySelector(".w-dropdown"), a = e.querySelector(".w-dropdown-list"), r = e.querySelector(".w-dropdown-toggle");
          i?.classList.remove("w--open"), a?.classList.remove("w--open"), r?.classList.remove("w--open");
        }
      }, 50));
    }
  });
}
function _(s, o) {
  const n = o.querySelector(".tabbed-card-main-image");
  if (!n) return;
  const t = o.closest(".tabbed-cards").querySelectorAll(".tabbed-card.w-dropdown")[s];
  if (!t) return;
  const i = t.querySelector(".tabbed-card-image-wrapper img");
  i && n.src !== i.src && (n.style.opacity = "0.5", n.src = i.src, n.alt = i.alt || "", n.onload = () => {
    n.style.opacity = "1";
  });
}
function W(s, o) {
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
function ut() {
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
function ht(s, o) {
  if (s.length === 0) return;
  const n = s[0], e = n.querySelector(".tabbed-card-toggler");
  e && (s.forEach((t, i) => {
    if (i !== 0) {
      const a = t.querySelector(".tabbed-card-toggler");
      a?.getAttribute("aria-expanded") === "true" && a.click();
    }
  }), setTimeout(() => {
    e.getAttribute("aria-expanded") === "true" || (e.click(), setTimeout(() => {
      if (e.getAttribute("aria-expanded") !== "true") {
        e.setAttribute("aria-expanded", "true");
        const i = n.querySelector(".w-dropdown"), a = n.querySelector(".w-dropdown-list"), r = n.querySelector(".w-dropdown-toggle");
        i?.classList.add("w--open"), a?.classList.add("w--open"), r?.classList.add("w--open");
      }
    }, 100)), _(0, o), W(0, n.closest(".tabbed-cards"));
  }, 200));
}
const M = {
  baseUrl: "https://pages.crunchbase.com",
  munchkinId: "976-JJA-800",
  cssUrl: "https://app-sj22.marketo.com/js/forms2/css/forms2.css",
  jsUrl: "https://pages.crunchbase.com/js/forms2/js/forms2.min.js"
};
let $ = {
  css: !1,
  js: !1
};
function pt() {
  return new Promise((s) => {
    if ($.css || document.querySelector(`link[href="${M.cssUrl}"]`)) {
      $.css = !0, s();
      return;
    }
    const o = document.createElement("link");
    o.rel = "stylesheet", o.href = M.cssUrl, o.onload = () => {
      $.css = !0, s();
    }, o.onerror = () => {
      console.error("❌ Failed to load Marketo CSS"), s();
    }, document.head.appendChild(o);
  });
}
function mt() {
  return new Promise((s) => {
    if ($.js || window.MktoForms2) {
      $.js = !0, s();
      return;
    }
    const o = document.createElement("script");
    o.src = M.jsUrl, o.onload = () => {
      $.js = !0, s();
    }, o.onerror = () => {
      console.error("❌ Failed to load Marketo JS"), s();
    }, document.head.appendChild(o);
  });
}
function ft(s) {
  try {
    const o = s.getFormElem()[0], n = Array.from(
      o.querySelectorAll(".mktoFormRow")
    ).filter((e) => !e.querySelector('input[type="hidden"]'));
    o.querySelectorAll(".is-odd-last").forEach((e) => e.classList.remove("is-odd-last")), n.length % 2 === 1 && n[n.length - 1].classList.add("is-odd-last");
  } catch (o) {
    console.error("❌ Error applying layout:", o);
  }
}
let j = 0;
function U(s, o) {
  try {
    if (s.hasAttribute("data-marketo-initialized"))
      return;
    j++;
    const n = `mktoForm_${o}_${j}`;
    s.innerHTML = "";
    const e = document.createElement("form");
    e.id = n, s.appendChild(e), s.setAttribute("data-marketo-initialized", "true"), s.setAttribute("data-marketo-unique-id", n), window.MktoForms2.loadForm(
      M.baseUrl,
      M.munchkinId,
      parseInt(o),
      function(t) {
        const i = t.getFormElem()[0];
        i && (e.parentNode.replaceChild(i, e), i.id = n), setTimeout(() => ft(t), 100);
        const a = new CustomEvent("marketoFormLoaded", {
          detail: { form: t, formId: o, container: s, uniqueId: n }
        });
        s.dispatchEvent(a);
      }
    );
  } catch (n) {
    console.error(`❌ Error initializing Marketo form ${o}:`, n);
  }
}
function gt() {
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
      U(o, e);
    }, n * 100);
  }));
}
function bt() {
  Promise.all([pt(), mt()]).then(() => {
    setTimeout(() => {
      window.MktoForms2 ? (gt(), new MutationObserver((o) => {
        o.forEach((n) => {
          n.addedNodes.forEach((e) => {
            if (e.nodeType === 1) {
              if (e.hasAttribute && e.hasAttribute("data-marketo-id")) {
                const i = e.getAttribute("data-marketo-id");
                setTimeout(() => U(e, i), 100);
              }
              (e.querySelectorAll ? e.querySelectorAll("[data-marketo-id]") : []).forEach((i, a) => {
                const r = i.getAttribute("data-marketo-id");
                r && setTimeout(
                  () => U(i, r),
                  (a + 1) * 100
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
function yt() {
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
    ), a = e.querySelectorAll(".collection-item");
    if (t && i && a.length > 0) {
      const r = new s(t);
      n.push(r);
    }
  }), window.relatedArticlesSliders = n, n;
}
function vt() {
  const s = () => {
    const o = document.querySelector(".blog-content-richtext");
    if (!o)
      return;
    console.log("📖 Reading Time Estimate: Found rich text element");
    const e = (o.textContent || o.innerText).trim().split(/\s+/).length, i = Math.ceil(e / 200), a = document.querySelector(".read-time-estimate");
    a && (a.textContent = `${i} min read`), o.querySelectorAll("iframe").forEach((l) => {
      const c = l.getAttribute("src") || "";
      (c.includes("youtube.com") || c.includes("youtu.be")) && l.classList.add("youtube-iframe");
    });
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", s) : s();
}
function wt() {
  const s = () => {
    const o = document.querySelectorAll("[data-toc-content]");
    o.length !== 0 && (console.log(
      `📚 Table of Contents: Found ${o.length} content element(s)`
    ), o.forEach((n) => {
      const e = n.getAttribute("data-toc-content"), t = document.querySelector(
        `[data-toc-target="${e}"]`
      );
      if (!t) {
        console.warn(`📚 Table of Contents: No target found for "${e}"`);
        return;
      }
      const a = n.querySelectorAll("h2");
      if (a.length === 0)
        return;
      let r = null, l = !1;
      function c() {
        const v = document.createElement("ul");
        a.forEach((x, b) => {
          const k = document.createElement("li"), T = document.createElement("a"), P = x.textContent.trim();
          let L = x.getAttribute("id");
          L || (L = P.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim(), x.setAttribute("id", L)), T.href = `#${L}`, T.textContent = P, T.classList.add("toc-link"), T.dataset.tocId = e, b === 0 && (T.classList.add("active"), r = T), k.appendChild(T), v.appendChild(k);
        }), t.innerHTML = "", t.appendChild(v);
      }
      c();
      const u = t.querySelectorAll(".toc-link");
      function p(v) {
        l || r === v || (l = !0, requestAnimationFrame(() => {
          r && r.classList.remove("active"), v && v.classList.add("active"), r = v, l = !1;
        }));
      }
      u.forEach((v) => {
        v.addEventListener("click", function(x) {
          x.preventDefault();
          const b = this.getAttribute("href").substring(1), k = document.getElementById(b);
          k && k.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });
      });
      let g = !1;
      function F() {
        g || (g = !0, requestAnimationFrame(() => {
          const v = window.scrollY;
          let x = null;
          for (let b = a.length - 1; b >= 0; b--) {
            const k = a[b], T = k.offsetTop;
            if (v >= T - 100) {
              x = k;
              break;
            }
          }
          if (!x && a.length > 0) {
            const b = a[0];
            v < b.offsetTop - 100 && (x = b);
          }
          if (x) {
            const b = t.querySelector(
              `.toc-link[href="#${x.getAttribute("id")}"]`
            );
            p(b);
          }
          g = !1;
        }));
      }
      window.addEventListener("scroll", F, { passive: !0 });
    }));
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", s) : s();
}
function xt() {
  const s = document.querySelectorAll("[data-tab-for]");
  if (s.length === 0) return;
  const o = /* @__PURE__ */ new Map();
  s.forEach((e) => {
    let t = e.closest('[role="tablist"]') || e.closest(".hero-tabs") || e.closest(".pricing-card-toggle") || e.parentElement;
    o.has(t) || o.set(t, []), o.get(t).push(e);
  }), St();
  let n = 0;
  o.forEach((e, t) => {
    Ct(t, e, n++);
  });
}
function St() {
  const s = document.querySelectorAll("[data-tab-for]"), o = [], n = /* @__PURE__ */ new Set();
  s.forEach((e) => {
    const t = e.getAttribute("data-tab-for");
    t && !n.has(t) && (o.push(t), n.add(t));
  }), o.forEach((e, t) => {
    const i = document.querySelectorAll(
      `[data-tab-container="${e}"]`
    ), a = t === 0;
    i.forEach((r) => {
      r.style.display = a ? "block" : "none", r.setAttribute("aria-hidden", a ? "false" : "true");
    });
  });
}
function Ct(s, o, n) {
  if (o.length === 0) return;
  const e = `hero-tabs-${n}`, t = `${e}-tablist`;
  s.getAttribute("role") || s.setAttribute("role", "tablist"), s.getAttribute("id") || s.setAttribute("id", t), s.getAttribute("aria-label") || s.setAttribute("aria-label", "Tab navigation"), o.forEach((i, a) => {
    const r = i.getAttribute("data-tab-for"), l = document.querySelector(
      `[data-tab-container="${r}"]`
    );
    if (!l) return;
    const c = `${e}-tab-${a}`, u = `${e}-panel-${a}`;
    i.getAttribute("role") || i.setAttribute("role", "tab"), i.getAttribute("id") || i.setAttribute("id", c), i.setAttribute("aria-controls", u);
    const p = l.style.display !== "none";
    i.setAttribute("tabindex", p ? "0" : "-1"), i.setAttribute("aria-selected", p ? "true" : "false"), i.classList.toggle("hero-tabs-item-active", p), l.setAttribute("role", "tabpanel"), l.setAttribute("id", u), l.setAttribute(
      "aria-labelledby",
      i.getAttribute("id") || c
    ), l.setAttribute("tabindex", "0"), i.addEventListener("click", (g) => {
      g.preventDefault(), J(i.getAttribute("data-tab-for"), s);
    }), i.addEventListener(
      "keydown",
      (g) => At(g, s, o, a)
    ), i.addEventListener("focus", () => {
      i.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
}
function J(s, o = null) {
  const n = document.querySelectorAll("[data-tab-for]"), e = document.querySelectorAll("[data-tab-container]");
  let t = null, i = null;
  e.forEach((a) => {
    const l = a.getAttribute("data-tab-container") === s;
    a.style.display = l ? "block" : "none", a.setAttribute("aria-hidden", l ? "false" : "true");
  }), n.forEach((a) => {
    const l = a.getAttribute("data-tab-for") === s;
    a.classList.toggle("hero-tabs-item-active", l), a.setAttribute("aria-selected", l ? "true" : "false"), a.setAttribute("tabindex", l ? "0" : "-1"), l && (t = a, o && (a.closest('[role="tablist"]') === o || a.closest(".hero-tabs") === o || a.closest(".pricing-card-toggle") === o || a.parentElement === o) && (i = a));
  }), t && Et(t), i && i.focus();
}
function At(s, o, n, e) {
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
      s.preventDefault(), J(
        n[e].getAttribute("data-tab-for"),
        o
      );
      return;
    default:
      return;
  }
  n[t].focus();
}
function Et(s) {
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
function V() {
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
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", V) : V();
function Tt() {
  console.log("🔍 Case Study Filter: Starting...");
  const s = ".case-study-cards-grid", o = ".case-study-card", n = "data-filter-control", e = "case-study-items", t = "posts-pagination", i = document.querySelector(s);
  if (!i) {
    console.warn(
      `⚠️ Case Study Filter: Container "${s}" not found`
    );
    return;
  }
  const a = Array.from(i.querySelectorAll(o)).map(
    (d) => {
      const h = d.closest(".w-dyn-item");
      return { card: d, parent: h };
    }
  );
  if (a.length === 0) {
    console.warn(
      `⚠️ Case Study Filter: No cards found with selector "${o}"`
    );
    return;
  }
  console.log(`📊 Case Study Filter: Found ${a.length} cards`);
  const r = document.querySelector(`[${e}]`);
  r || console.warn(
    `⚠️ Case Study Filter: Scroll container with attribute "${e}" not found. Using default.`
  );
  const l = r ? r.getAttribute(e) : null, c = l ? parseInt(l, 10) : 12;
  console.log(`📄 Case Study Filter: Items per page: ${c}`);
  let u = 1, p = i.parentElement?.querySelector(
    `.${t}`
  );
  p || (p = document.createElement("div"), p.className = `w-pagination-wrapper ${t}`, p.setAttribute("role", "navigation"), p.setAttribute("aria-label", "List"), i.parentElement?.insertBefore(
    p,
    i.nextSibling
  ), console.log("📄 Case Study Filter: Created pagination container"));
  const g = {}, F = Array.from(
    document.querySelectorAll(`[${n}]`)
  );
  if (F.length === 0) {
    console.warn(
      `⚠️ Case Study Filter: No filter controls found with attribute "${n}"`
    ), L(), console.log("✅ Case Study Filter: Complete (pagination only, no filters)");
    return;
  }
  console.log(
    `🎛️ Case Study Filter: Found ${F.length} filter control(s)`
  ), F.forEach((d) => {
    const h = d.getAttribute(n);
    h && (g[h] = "");
  }), F.forEach((d) => {
    const h = d.getAttribute(n);
    h && P(d, h);
  });
  const v = "case-study-initial-hide", x = document.createElement("style");
  x.id = v, x.textContent = `
    .case-study-cards-grid .w-dyn-item:nth-child(n+${c + 1}) {
      display: none !important;
    }
  `, document.head.appendChild(x), console.log(`🎨 Applied initial CSS hide for items beyond ${c}`);
  function b() {
    const d = document.getElementById(v);
    d && (d.remove(), console.log(
      "🗑️ Removed initial CSS hide rule, JS pagination taking over"
    ));
  }
  function k() {
    b();
    const d = document.createElement("style");
    d.id = v, d.textContent = `
      .case-study-cards-grid .w-dyn-item:nth-child(n+${c + 1}) {
        display: none !important;
      }
    `, document.head.appendChild(d), console.log("🎨 Reapplied initial CSS hide rule");
  }
  function T() {
    return Object.values(g).every((d) => d === "");
  }
  D(Math.ceil(a.length / c));
  function P(d, h) {
    const C = `data-filter-${h}`;
    console.log(`🔧 Setting up filter: ${h} (${C})`);
    const y = /* @__PURE__ */ new Set();
    a.forEach(({ card: m }) => {
      if (h === "use-case") {
        const f = m.querySelector('[fs-list-nest="use-cases"]');
        f && f.querySelectorAll(
          '[role="listitem"].w-dyn-item'
        ).forEach((q) => {
          const A = q.textContent.trim();
          A && y.add(A);
        });
      } else {
        const f = m.getAttribute(C);
        f && f.trim() && y.add(f.trim());
      }
    });
    const w = Array.from(y).sort(
      (m, f) => m.localeCompare(f)
    );
    console.log(`   Found ${w.length} unique values:`, w);
    const S = Array.from(d.options);
    for (let m = S.length - 1; m >= 0; m--)
      m === 0 && (!S[m].value || S[m].value === "") || d.remove(m);
    w.forEach((m) => {
      const f = document.createElement("option");
      f.value = m, f.textContent = m, d.appendChild(f);
    }), d.addEventListener("change", function() {
      g[h] = this.value, console.log(`🔄 Filter changed: ${h} = "${this.value}"`), this.value ? this.style.color = "var(--_colors---primary--dark-blue)" : this.style.color = "", u = 1, T() ? (console.log("🔄 All filters reset, reapplying CSS pagination"), k(), a.forEach(({ card: m, parent: f }) => {
        const E = f || m;
        E.style.display = "";
      }), D(Math.ceil(a.length / c))) : (b(), L());
    });
  }
  function L() {
    console.log("🎯 Applying filters:", g);
    const d = [];
    a.forEach(({ card: E, parent: q }) => {
      let A = !0;
      for (const [N, I] of Object.entries(g)) {
        if (!I) continue;
        let B = !1;
        if (N === "use-case") {
          const R = E.querySelector('[fs-list-nest="use-cases"]');
          if (R) {
            const Q = R.querySelectorAll(
              '[role="listitem"].w-dyn-item'
            );
            for (const K of Q)
              if (K.textContent.trim() === I) {
                B = !0;
                break;
              }
          }
        } else {
          const R = `data-filter-${N}`;
          B = E.getAttribute(R) === I;
        }
        if (!B) {
          A = !1;
          break;
        }
      }
      A && d.push({ card: E, parent: q });
    });
    const h = d.length, C = Math.ceil(h / c);
    u > C && C > 0 && (u = C), u < 1 && (u = 1);
    const y = (u - 1) * c, w = y + c;
    console.log(
      `📄 Pagination: Page ${u}/${C}, showing items ${y + 1}-${Math.min(w, h)} of ${h}`
    );
    let S = 0, m = 0;
    a.forEach(({ card: E, parent: q }) => {
      const A = d.findIndex((B) => B.card === E), N = A >= 0 && A >= y && A < w, I = q || E;
      N ? (I.style.display = "", S++) : (I.style.display = "none", m++);
    }), console.log(
      `✅ Filter applied: ${S} visible, ${m} hidden`
    ), D(C);
    const f = new CustomEvent("caseStudyFiltersApplied", {
      detail: {
        activeFilters: g,
        visibleCount: S,
        hiddenCount: m,
        totalCount: a.length,
        currentPage: u,
        totalPages: C,
        totalFilteredItems: h
      }
    });
    document.dispatchEvent(f);
  }
  function D(d) {
    if (d <= 1) {
      p.style.display = "none";
      return;
    }
    p.style.display = "";
    const h = u === 1, C = u === d;
    let y = `
      <a 
        aria-label="Pagination Left arrow" 
        href="#" 
        class="w-pagination-previous pagination-item pagination-left ${h ? "is-list-pagination-disabled" : ""}" 
        aria-disabled="${h}" 
        tabindex="${h ? "-1" : "0"}"
        data-pagination-prev
      >
        <svg class="w-pagination-previous-icon pagination-icon" height="12px" width="12px"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" transform="translate(0, 1)">
          <path fill="none" stroke="currentColor" fill-rule="evenodd" d="M8 10L4 6l4-4"></path>
        </svg>
      </a>
      <div class="pagination-pages-list">
    `;
    for (let w = 1; w <= d; w++) {
      const S = w === u;
      y += `
        <a 
          href="#" 
          class="pagination-item pagination-page ${S ? "w--current" : ""}" 
          ${S ? 'aria-current="page"' : ""}
          data-pagination-page="${w}"
        >${w}</a>
      `;
    }
    y += `
      </div>
      <a 
        aria-label="Pagination Right arrow" 
        href="#" 
        class="w-pagination-next pagination-item pagination-right ${C ? "is-list-pagination-disabled" : ""}" 
        aria-disabled="${C}" 
        tabindex="${C ? "-1" : "0"}"
        data-pagination-next
      >
        <svg class="w-pagination-next-icon pagination-icon" height="12px" width="12px"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" transform="translate(0, 1)">
          <path fill="none" stroke="currentColor" fill-rule="evenodd" d="M4 2l4 4-4 4"></path>
        </svg>
      </a>
    `, p.innerHTML = y, X();
  }
  function X() {
    const d = p.querySelector(
      "[data-pagination-prev]"
    );
    d && d.addEventListener("click", (y) => {
      y.preventDefault(), u > 1 && (b(), u--, L(), O());
    });
    const h = p.querySelector(
      "[data-pagination-next]"
    );
    h && h.addEventListener("click", (y) => {
      y.preventDefault(), b();
      const w = a.filter(({ card: m }) => {
        for (const [f, E] of Object.entries(
          g
        )) {
          if (!E) continue;
          let q = !1;
          if (f === "use-case") {
            const A = m.querySelector(
              '[fs-list-nest="use-cases"]'
            );
            if (A) {
              const N = A.querySelectorAll(
                '[role="listitem"].w-dyn-item'
              );
              for (const I of N)
                if (I.textContent.trim() === E) {
                  q = !0;
                  break;
                }
            }
          } else {
            const A = `data-filter-${f}`;
            q = m.getAttribute(A) === E;
          }
          if (!q) return !1;
        }
        return !0;
      }).length, S = Math.ceil(w / c);
      u < S && (u++, L(), O());
    }), p.querySelectorAll(
      "[data-pagination-page]"
    ).forEach((y) => {
      y.addEventListener("click", (w) => {
        w.preventDefault(), b();
        const S = parseInt(y.getAttribute("data-pagination-page"), 10);
        S !== u && (u = S, L(), O());
      });
    });
  }
  function O() {
    r && r.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  console.log("✅ Case Study Filter: Complete");
}
function kt() {
  console.log("🎴 Post Card Attribution: Starting...");
  const s = document.querySelectorAll(
    ".post-card-attribution"
  );
  if (s.length === 0) {
    console.log("ℹ️ Post Card Attribution: No attribution containers found");
    return;
  }
  console.log(
    `📝 Post Card Attribution: Found ${s.length} container(s)`
  ), s.forEach((o, n) => {
    const e = o.querySelector("[post-card-author-pos]"), t = o.querySelector(
      "[post-card-author-company]"
    ), i = o.querySelector("[post-card-author-sep]"), a = o.querySelector("[post-card-author-of]"), r = e && e.textContent.trim() !== "", l = t && t.textContent.trim() !== "";
    r || (i && (i.style.display = "none"), e && (e.style.display = "none")), l || (a && (a.style.display = "none"), t && (t.style.display = "none")), console.log(
      `  ${n + 1}. Position: ${r ? "✓" : "✗"}, Company: ${l ? "✓" : "✗"}`
    );
  }), console.log("✅ Post Card Attribution: Complete");
}
function Lt() {
  console.log("🚀 Topics Navigation: Starting...");
  const s = document.querySelectorAll(".topics-bar-select");
  if (s.length === 0) {
    console.log("ℹ️ Topics Navigation: No .topics-bar-select elements found");
    return;
  }
  s.forEach((o) => {
    try {
      const n = o.closest("*")?.parentElement?.querySelector(".w-dyn-list") || document.querySelector(".w-dyn-list");
      if (!n) {
        console.warn("⚠️ Topics Navigation: No .w-dyn-list found near select");
        return;
      }
      const e = n.querySelectorAll(".w-dyn-item a[href]");
      if (e.length === 0) {
        console.warn("⚠️ Topics Navigation: No topic links found in collection list");
        return;
      }
      const t = document.createElement("option");
      t.value = "", t.textContent = "Select a topic...", t.disabled = !0, t.selected = !0, o.appendChild(t), e.forEach((i) => {
        const a = document.createElement("option");
        a.value = i.getAttribute("href"), a.textContent = i.textContent.trim(), o.appendChild(a);
      }), console.log(`✅ Topics Navigation: Populated select with ${e.length} topics`), o.addEventListener("change", (i) => {
        const a = i.target.value;
        a && (console.log(`🔗 Topics Navigation: Navigating to ${a}`), window.location.href = a);
      }), n.remove(), console.log("🗑️ Topics Navigation: Removed source collection list");
    } catch (n) {
      console.error("❌ Topics Navigation: Error processing select", n);
    }
  }), console.log("✅ Topics Navigation: Complete");
}
function qt() {
  console.log("🔍 Search Popup: Initializing...");
  const s = document.querySelector("footer .search");
  if (!s) {
    console.warn("⚠️ Search Popup: Footer search form not found");
    return;
  }
  const o = document.createElement("div");
  o.id = "search-popup-modal", o.className = "search-popup-modal", o.setAttribute("role", "dialog"), o.setAttribute("aria-modal", "true"), o.setAttribute("aria-label", "Search");
  const n = document.createElement("button");
  n.className = "search-popup-close", n.innerHTML = "×", n.setAttribute("aria-label", "Close search");
  const e = document.createElement("div");
  e.className = "search-popup-content";
  const t = s.parentElement, i = s.nextSibling;
  s.addEventListener("submit", (c) => {
    c.preventDefault();
    const u = s.querySelector('input[type="search"]'), p = u ? u.value.trim() : "";
    if (p) {
      const g = `https://www.crunchbase.com/textsearch?q=${encodeURIComponent(p)}`;
      window.location.href = g;
    }
  }), o.appendChild(n), e.appendChild(s), o.appendChild(e), document.body.appendChild(o);
  function a() {
    o.style.display = "flex", document.body.style.overflow = "hidden", setTimeout(() => {
      const c = o.querySelector('input[type="search"]');
      c && c.focus();
    }, 100), console.log("🔍 Search Popup: Opened");
  }
  function r() {
    o.style.display = "none", document.body.style.overflow = "", i ? t.insertBefore(s, i) : t.appendChild(s), setTimeout(() => {
      e.appendChild(s);
    }, 50), console.log("🔍 Search Popup: Closed");
  }
  n.addEventListener("click", r), o.addEventListener("click", (c) => {
    c.target === o && r();
  }), document.addEventListener("keydown", (c) => {
    c.key === "Escape" && o.style.display === "flex" && r();
  });
  const l = document.querySelectorAll(
    ".navigation-cta .icon-search"
  );
  l.length === 0 ? console.warn(
    "⚠️ Search Popup: No search triggers found (.navigation-cta .icon-search)"
  ) : console.log(
    `🔍 Search Popup: Found ${l.length} search trigger(s)`
  ), l.forEach((c) => {
    c.style.cursor = "pointer", c.addEventListener("click", (u) => {
      u.preventDefault(), a();
    });
  }), console.log("✅ Search Popup: Complete");
}
function It() {
  console.log("🚀 Nav Height: Starting...");
  const s = document.querySelector(".navbar.w-nav");
  if (!s) {
    console.warn("⚠️ Nav Height: .navbar.w-nav not found");
    return;
  }
  function o() {
    const n = s.clientHeight;
    document.body.style.setProperty("--nav-height", `${n}px`);
  }
  o(), window.addEventListener("resize", o), console.log("✅ Nav Height: Complete");
}
const G = {
  demo: Y,
  logoSlider: Z,
  quotesSlider: tt,
  starRating: et,
  comparisonTableToggler: it,
  tabsSelect: nt,
  tabbedCards: st,
  marketoForms: bt,
  relatedArticlesSlider: yt,
  readingTimeEstimate: vt,
  tableOfContents: wt,
  heroTabs: xt,
  caseStudyFilter: Tt,
  postCardAttribution: kt,
  topicsNavigation: Lt,
  searchPopup: qt,
  navHeight: It
  // Add more features here as you create them
  // myFeature: initMyFeature,
};
function Ft(s = ["demo"]) {
  s.forEach((o) => {
    if (G[o])
      try {
        G[o]();
      } catch (n) {
        console.error(`❌ Error initializing feature '${o}':`, n);
      }
    else
      console.warn(`⚠️ Feature '${o}' not found`);
  });
}
if (typeof window < "u" && !window.__CRUNCHBASE_SHOULD_RUN_PROD__) {
  const s = setInterval(() => {
    window.__CRUNCHBASE_SHOULD_RUN_PROD__ && (clearInterval(s), H());
  }, 50);
  setTimeout(() => {
    clearInterval(s), window.__CRUNCHBASE_SHOULD_RUN_PROD__ || (console.log(
      "⏰ Timeout waiting for wrapper, running production code anyway..."
    ), H());
  }, 5e3);
} else
  H();
function H() {
  console.log("🚀 Crunchbase Webflow script loaded"), Ft([
    "navHeight",
    // Navbar height CSS variable
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
    "caseStudyFilter",
    // Case study filtering system
    "postCardAttribution",
    // Post card author metadata visibility
    "topicsNavigation",
    // Topics navigation dropdown from collection lists
    "searchPopup"
    // Full-screen search popup modal
  ]);
}
