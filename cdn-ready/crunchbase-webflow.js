function v() {
  console.log("🎨 Demo Feature: Adding black border to body"), document.body.style.border = "5px solid navy", document.body.style.margin = "0", document.body.style.boxSizing = "border-box", console.log("✅ Demo Feature: Black border applied");
}
const x = () => {
  const n = document.querySelectorAll('[data-logo-slider="true"]'), s = 7;
  !n || n.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches || n.forEach((e) => {
    const i = e.querySelectorAll(":scope > *");
    i.length === 0 || i.length < s || (e.setAttribute("data-logo-slider-init", "true"), e.style.setProperty("--ls-items", i.length), i.forEach((t, o) => {
      t.style.setProperty("--ls-item-index", o + 1);
    }));
  });
};
function A() {
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
    getCSSVariable(t, o) {
      return getComputedStyle(document.documentElement).getPropertyValue(
        t
      ).trim() || o;
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
      const o = window.matchMedia("(max-width: 991px)").matches;
      let r = 0;
      this.quoteData = this.quotes.map((a, l) => {
        let c;
        o ? (c = this.containerWidth, a.style.width = `${this.containerWidth}px`) : a.classList.contains("quote-card-featured") ? (c = 862, a.style.width = "862px") : a.classList.contains("quote-card") ? (c = 410, a.style.width = "410px") : c = a.getBoundingClientRect().width;
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
      const t = this.navContainer.style.justifyContent === "center", o = window.matchMedia("(max-width: 991px)").matches;
      this.calculateDimensions(), t !== o && (this.navContainer && this.navContainer.parentNode && this.navContainer.parentNode.removeChild(this.navContainer), this.createNavigation()), this.updateNavigationState(), this.updateProgress();
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
            const o = Math.max(0, this.currentIndex - 2);
            this.currentIndex = o, this.scrollToQuote(this.currentIndex);
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
      let o = 0;
      for (let l = t; l < this.totalQuotes; l++)
        o += this.quoteData[l].width, l < this.totalQuotes - 1 && (o += this.gap);
      return o <= this.containerWidth + 40;
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
      for (let o = this.totalQuotes - 1; o >= 0; o--)
        if (this.quoteData[o].offsetLeft <= t + 10)
          return o;
      return this.totalQuotes - 1;
    }
    updateCurrentIndexFromScroll() {
      if (this.isAdaptiveAligning)
        return;
      const t = this.container.scrollLeft;
      for (let o = 0; o < this.totalQuotes; o++) {
        const r = this.quoteData[o], a = r.offsetLeft, l = r.offsetLeft + r.width, c = t + this.containerWidth, h = Math.max(a, t), b = Math.min(l, c);
        if (Math.max(0, b - h) / r.width >= 0.3 || a >= t && a < c) {
          this.currentIndex !== o && (this.currentIndex = o, this.updateNavigationState(), this.updateProgress());
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
      const o = t.querySelector("path");
      t.disabled ? (t.style.background = "transparent", t.style.cursor = "not-allowed", t.style.opacity = "0.5", o && o.setAttribute("stroke", "#146AFF")) : (t.style.background = "#146AFF", t.style.cursor = "pointer", t.style.opacity = "1", o && o.setAttribute("stroke", "white"));
    }
    isAtScrollEnd() {
      const t = this.container.scrollLeft, o = this.container.scrollWidth - this.container.clientWidth;
      return Math.abs(t - o) < 5;
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
    const t = new n(i);
    t.shouldEnable() || t.disable(), e.push(t);
  }), window.quotesSliders = e, e;
}
function S() {
  class n {
    constructor() {
      this.init();
    }
    init() {
      this.processRatingElements();
    }
    processRatingElements() {
      const e = document.querySelectorAll("[rating-value]");
      console.log(`⭐ Star Rating: Found ${e.length} elements`), e.forEach((i, t) => {
        const o = i.getAttribute("rating-value"), r = this.snapToNearestTenth(parseFloat(o) || 0);
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
        const o = this.createStar(t, e);
        i.appendChild(o);
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
      const o = this.getStarFillState(e, i), r = this.createStarSvg(o);
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
        const o = `partial-fill-${e.percentage}`;
        t.setAttribute("fill", `url(#${o})`), this.ensurePartialFillGradient(i, e.percentage, o);
      }
      return i.appendChild(t), i;
    }
    ensurePartialFillGradient(e, i, t) {
      if (!document.getElementById(t)) {
        const o = document.createElementNS(
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
        l.setAttribute("offset", `${i}%`), l.setAttribute("stop-color", "#dcdfe1"), r.appendChild(a), r.appendChild(l), o.appendChild(r), e.appendChild(o);
      }
    }
  }
  new n();
}
function C() {
  class n {
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
        const t = i.getAttribute("data-cmp-table-trigger"), o = i.closest(".comparison-table-container");
        o && (t === "first-column" ? this.activateFirstColumn(o) : t === "last-column" && this.activateLastColumn(o));
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
      ).forEach((o) => {
        o.style.display = "flex";
      }), e.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      ).forEach((o) => {
        o.style.display = "none";
      });
    }
    showLastColumn(e) {
      e.querySelectorAll(
        ".cmp-table-row.cmp-table-column-last"
      ).forEach((o) => {
        o.style.display = "flex";
      }), e.querySelectorAll(
        ".cmp-table-row.cmp-table-row-first"
      ).forEach((o) => {
        o.style.display = "none";
      });
    }
  }
  new n();
}
function k() {
  const n = document.querySelectorAll(".tabs.w-tabs");
  n.length !== 0 && (console.log(`📱 Tabs Select: Found ${n.length} tab containers`), n.forEach((s) => {
    const e = s.querySelectorAll(".tab-link");
    if (e.length === 0 || s.querySelector(".tabs-select"))
      return;
    const i = document.createElement("select");
    i.className = "tabs-select";
    const t = document.createElement("option");
    t.value = "", t.textContent = "Select a tab...", t.disabled = !0, i.appendChild(t), e.forEach((o, r) => {
      const a = document.createElement("option");
      a.value = r, a.textContent = o.textContent.trim() || `Tab ${r + 1}`, o.classList.contains("w--current") && (a.selected = !0, t.disabled = !1, t.selected = !1), i.appendChild(a);
    }), i.addEventListener("change", function() {
      const o = parseInt(this.value);
      !isNaN(o) && e[o] && e[o].click();
    }), s.insertBefore(i, s.firstChild);
  }), T(), console.log("✅ Tabs Select: Mobile tab selectors initialized"));
}
function T() {
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
function E() {
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", f) : f();
}
function f() {
  const n = document.querySelectorAll(".tabbed-cards");
  n.length !== 0 && (console.log(
    `🎴 Tabbed Cards: Found ${n.length} containers`
  ), n.forEach((s) => {
    L(s);
  }), console.log("✅ Tabbed Cards: All containers initialized"));
}
function L(n) {
  const s = n.querySelector(".tabbed-cards-image"), e = n.querySelectorAll(".tabbed-card.w-dropdown");
  !s || e.length === 0 || (q(e), F(e, s), e.forEach((i, t) => {
    I(i, t, n, s);
  }), N(e, s), B());
}
function q(n) {
  n.forEach((s, e) => {
    const t = s.querySelector(".tabbed-card-image-wrapper")?.querySelector("img");
    if (!t) return;
    const o = document.createElement("div");
    o.className = "tabbed-card-mobile-image", o.dataset.cardIndex = e;
    const r = t.cloneNode(!0);
    o.appendChild(r), s.parentNode.insertBefore(o, s.nextSibling);
  });
}
function F(n, s) {
  s.innerHTML = "";
  const e = document.createElement("img");
  e.style.width = "100%", e.style.height = "auto", e.style.display = "block", e.style.transition = "opacity 0.2s ease", e.className = "tabbed-card-main-image", s.appendChild(e), n.forEach((i) => {
    const t = i.querySelector(".tabbed-card-image-wrapper img");
    if (t?.src) {
      const o = new Image();
      o.src = t.src;
    }
  });
}
function I(n, s, e, i) {
  const t = n.querySelector(".tabbed-card-toggler");
  if (!t) return;
  t.addEventListener("click", () => {
    t.getAttribute("aria-expanded") === "true" || (M(n, e), setTimeout(() => {
      g(s, i), p(s, e);
    }, 100));
  }), new MutationObserver((r) => {
    r.forEach((a) => {
      a.attributeName === "aria-expanded" && t.getAttribute("aria-expanded") === "true" && (g(s, i), p(s, e));
    });
  }).observe(t, {
    attributes: !0,
    attributeFilter: ["aria-expanded"]
  });
}
function M(n, s) {
  s.querySelectorAll(".tabbed-card.w-dropdown").forEach((i) => {
    if (i !== n) {
      const t = i.querySelector(".tabbed-card-toggler");
      t && t.getAttribute("aria-expanded") === "true" && (t.click(), setTimeout(() => {
        if (t.getAttribute("aria-expanded") === "true") {
          t.setAttribute("aria-expanded", "false");
          const o = i.querySelector(".w-dropdown"), r = i.querySelector(".w-dropdown-list"), a = i.querySelector(".w-dropdown-toggle");
          o?.classList.remove("w--open"), r?.classList.remove("w--open"), a?.classList.remove("w--open");
        }
      }, 50));
    }
  });
}
function g(n, s) {
  const e = s.querySelector(".tabbed-card-main-image");
  if (!e) return;
  const t = s.closest(".tabbed-cards").querySelectorAll(".tabbed-card.w-dropdown")[n];
  if (!t) return;
  const o = t.querySelector(".tabbed-card-image-wrapper img");
  o && e.src !== o.src && (e.style.opacity = "0.5", e.src = o.src, e.alt = o.alt || "", e.onload = () => {
    e.style.opacity = "1";
  });
}
function p(n, s) {
  s.querySelectorAll(
    ".tabbed-card-mobile-image"
  ).forEach((t) => {
    t.style.display = "none";
  });
  const i = s.querySelector(
    `[data-card-index="${n}"]`
  );
  i && (i.style.display = "block");
}
function B() {
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
function N(n, s) {
  if (n.length === 0) return;
  const e = n[0], i = e.querySelector(".tabbed-card-toggler");
  i && (n.forEach((t, o) => {
    if (o !== 0) {
      const r = t.querySelector(".tabbed-card-toggler");
      r?.getAttribute("aria-expanded") === "true" && r.click();
    }
  }), setTimeout(() => {
    i.getAttribute("aria-expanded") === "true" || (i.click(), setTimeout(() => {
      if (i.getAttribute("aria-expanded") !== "true") {
        i.setAttribute("aria-expanded", "true");
        const o = e.querySelector(".w-dropdown"), r = e.querySelector(".w-dropdown-list"), a = e.querySelector(".w-dropdown-toggle");
        o?.classList.add("w--open"), r?.classList.add("w--open"), a?.classList.add("w--open");
      }
    }, 100)), g(0, s), p(0, e.closest(".tabbed-cards"));
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
function D() {
  return new Promise((n) => {
    if (d.css || document.querySelector(`link[href="${u.cssUrl}"]`)) {
      d.css = !0, n();
      return;
    }
    const s = document.createElement("link");
    s.rel = "stylesheet", s.href = u.cssUrl, s.onload = () => {
      d.css = !0, console.log("✅ Marketo CSS loaded"), n();
    }, s.onerror = () => {
      console.error("❌ Failed to load Marketo CSS"), n();
    }, document.head.appendChild(s);
  });
}
function $() {
  return new Promise((n) => {
    if (d.js || window.MktoForms2) {
      d.js = !0, n();
      return;
    }
    const s = document.createElement("script");
    s.src = u.jsUrl, s.onload = () => {
      d.js = !0, console.log("✅ Marketo JS loaded"), n();
    }, s.onerror = () => {
      console.error("❌ Failed to load Marketo JS"), n();
    }, document.head.appendChild(s);
  });
}
function O(n) {
  try {
    const s = n.getFormElem()[0], e = Array.from(
      s.querySelectorAll(".mktoFormRow")
    ).filter((i) => !i.querySelector('input[type="hidden"]'));
    s.querySelectorAll(".is-odd-last").forEach((i) => i.classList.remove("is-odd-last")), e.length % 2 === 1 && e[e.length - 1].classList.add("is-odd-last"), console.log(
      `✅ Layout applied to form with ${e.length} visible rows`
    );
  } catch (s) {
    console.error("❌ Error applying layout:", s);
  }
}
let y = 0;
function m(n, s) {
  try {
    if (n.hasAttribute("data-marketo-initialized")) {
      console.log(
        `ℹ️ Marketo form ${s} already initialized in this container`
      );
      return;
    }
    y++;
    const e = `mktoForm_${s}_${y}`;
    n.innerHTML = "";
    const i = document.createElement("form");
    i.id = e, n.appendChild(i), n.setAttribute("data-marketo-initialized", "true"), n.setAttribute("data-marketo-unique-id", e), console.log(
      `🎯 Initializing Marketo form ${s} with unique ID: ${e}`
    ), window.MktoForms2.loadForm(
      u.baseUrl,
      u.munchkinId,
      parseInt(s),
      function(t) {
        console.log(`✅ Marketo form ${s} loaded successfully`);
        const o = t.getFormElem()[0];
        o && (i.parentNode.replaceChild(o, i), o.id = e, console.log(`🎯 Form rendered in container with ID: ${e}`)), setTimeout(() => O(t), 100);
        const r = new CustomEvent("marketoFormLoaded", {
          detail: { form: t, formId: s, container: n, uniqueId: e }
        });
        n.dispatchEvent(r);
      }
    );
  } catch (e) {
    console.error(`❌ Error initializing Marketo form ${s}:`, e);
  }
}
function P() {
  const n = document.querySelectorAll("[data-marketo-id]");
  if (n.length === 0) {
    console.log(
      "ℹ️ No Marketo form containers found (looking for [data-marketo-id])"
    );
    return;
  }
  console.log(`🎯 Found ${n.length} Marketo form container(s)`), n.forEach((s, e) => {
    const i = s.getAttribute("data-marketo-id");
    if (!i) {
      console.warn(
        `⚠️ Container ${e + 1} has data-marketo-id but no value`
      );
      return;
    }
    setTimeout(() => {
      m(s, i);
    }, e * 100);
  });
}
function Q() {
  console.log("🚀 Marketo Forms: Starting initialization..."), Promise.all([D(), $()]).then(() => {
    setTimeout(() => {
      window.MktoForms2 ? (P(), new MutationObserver((s) => {
        s.forEach((e) => {
          e.addedNodes.forEach((i) => {
            if (i.nodeType === 1) {
              if (i.hasAttribute && i.hasAttribute("data-marketo-id")) {
                const o = i.getAttribute("data-marketo-id");
                setTimeout(() => m(i, o), 100);
              }
              (i.querySelectorAll ? i.querySelectorAll("[data-marketo-id]") : []).forEach((o, r) => {
                const a = o.getAttribute("data-marketo-id");
                a && setTimeout(
                  () => m(o, a),
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
  }).catch((n) => {
    console.error("❌ Error loading Marketo resources:", n);
  });
}
function R() {
  console.log("🚀 Pricing Card Toggler: Starting...");
  const n = document.querySelectorAll(".pricing-card-details");
  if (n.length === 0) {
    console.log("ℹ️ Pricing Card Toggler: No pricing card details found");
    return;
  }
  console.log(
    `📊 Pricing Card Toggler: Found ${n.length} pricing card(s)`
  ), n.forEach((s, e) => {
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
      monthlyLink: o,
      annualOption: r,
      monthlyOption: a
    } = this.elements, l = this.generateIds();
    s.setAttribute("role", "tablist"), s.setAttribute("aria-label", "Pricing period selection"), s.id = l.toggle, e.setAttribute("role", "tab"), e.id = l.annual, e.setAttribute("aria-selected", "true"), e.setAttribute("aria-controls", l.annualOption), e.setAttribute("tabindex", "0"), i.setAttribute("role", "tab"), i.id = l.monthly, i.setAttribute("aria-selected", "false"), i.setAttribute("aria-controls", l.monthlyOption), i.setAttribute("tabindex", "-1"), t.setAttribute("tabindex", "-1"), o.setAttribute("tabindex", "-1"), t.setAttribute("aria-hidden", "true"), o.setAttribute("aria-hidden", "true"), r && (r.setAttribute("role", "tabpanel"), r.id = l.annualOption, r.setAttribute("aria-labelledby", l.annual), r.setAttribute("aria-hidden", "false")), a && (a.setAttribute("role", "tabpanel"), a.id = l.monthlyOption, a.setAttribute("aria-labelledby", l.monthly), a.setAttribute("aria-hidden", "true"));
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
    const o = (r) => this.handleKeyNavigation(r);
    i.addEventListener("keydown", o), t.addEventListener("keydown", o), s.addEventListener("click", (r) => r.preventDefault()), e.addEventListener("click", (r) => r.preventDefault());
  }
  handleKeyNavigation(s) {
    const { key: e, target: i } = s, { annualToggle: t, monthlyToggle: o } = this.elements;
    switch (e) {
      case "ArrowLeft":
      case "ArrowUp":
        s.preventDefault(), i === o && (t.focus(), this.setActiveState("annual"));
        break;
      case "ArrowRight":
      case "ArrowDown":
        s.preventDefault(), i === t && (o.focus(), this.setActiveState("monthly"));
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
        s.preventDefault(), o.focus(), this.setActiveState("monthly");
        break;
    }
  }
  setActiveState(s) {
    const e = s === "annual", { annualToggle: i, monthlyToggle: t } = this.elements;
    i.setAttribute("aria-selected", e.toString()), t.setAttribute("aria-selected", (!e).toString()), i.setAttribute("tabindex", e ? "0" : "-1"), t.setAttribute("tabindex", e ? "-1" : "0"), this.updateToggleClasses(e), this.updateTextColors(e), this.updateOptionVisibility(e), W(
      `${e ? "Annual" : "Monthly"} pricing selected`
    );
  }
  updateToggleClasses(s) {
    const { annualToggle: e, monthlyToggle: i } = this.elements;
    e.classList.toggle("pricing-card-toggle-dark", s), e.classList.toggle("pricing-card-toggle-light", !s), i.classList.toggle("pricing-card-toggle-dark", !s), i.classList.toggle("pricing-card-toggle-light", s);
  }
  updateTextColors(s) {
    const { annualLink: e, monthlyLink: i } = this.elements, t = "white", o = "var(--_colors---primary--dark-blue)";
    e.style.color = s ? t : o, i.style.color = s ? o : t;
  }
  updateOptionVisibility(s) {
    const { annualOption: e, monthlyOption: i } = this.elements;
    e && (e.setAttribute("aria-hidden", (!s).toString()), e.style.display = s ? "flex" : "none"), i && (i.setAttribute("aria-hidden", s.toString()), i.style.display = s ? "none" : "flex");
  }
}
function W(n) {
  const s = document.createElement("div");
  s.setAttribute("aria-live", "polite"), s.setAttribute("aria-atomic", "true"), s.style.position = "absolute", s.style.left = "-10000px", s.style.width = "1px", s.style.height = "1px", s.style.overflow = "hidden", document.body.appendChild(s), s.textContent = n, setTimeout(() => {
    document.body.removeChild(s);
  }, 1e3);
}
const w = {
  demo: v,
  logoSlider: x,
  quotesSlider: A,
  starRating: S,
  comparisonTableToggler: C,
  tabsSelect: k,
  tabbedCards: E,
  marketoForms: Q,
  pricingCardToggler: R
  // Add more features here as you create them
  // myFeature: initMyFeature,
};
function j(n = ["demo"]) {
  console.log("🎯 Initializing features:", n), n.forEach((s) => {
    if (w[s])
      try {
        w[s]();
      } catch (e) {
        console.error(`❌ Error initializing feature '${s}':`, e);
      }
    else
      console.warn(`⚠️ Feature '${s}' not found`);
  });
}
console.log("🚀 Crunchbase Webflow script loaded");
j([
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
