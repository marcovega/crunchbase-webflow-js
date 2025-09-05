function k() {
  console.log("🎨 Demo Feature: Adding black border to body"), document.body.style.border = "5px solid navy", document.body.style.margin = "0", document.body.style.boxSizing = "border-box", console.log("✅ Demo Feature: Black border applied");
}
const q = () => {
  const o = document.querySelectorAll('[data-logo-slider="true"]'), r = 7;
  !o || o.length === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches || o.forEach((e) => {
    const i = e.querySelectorAll(":scope > *");
    i.length === 0 || i.length < r || (e.setAttribute("data-logo-slider-init", "true"), e.style.setProperty("--ls-items", i.length), i.forEach((t, s) => {
      t.style.setProperty("--ls-item-index", s + 1);
    }));
  });
};
function F() {
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
      let n = 0;
      this.quoteData = this.quotes.map((a, l) => {
        let c;
        s ? (c = this.containerWidth, a.style.width = `${this.containerWidth}px`) : a.classList.contains("quote-card-featured") ? (c = 862, a.style.width = "862px") : a.classList.contains("quote-card") ? (c = 410, a.style.width = "410px") : c = a.getBoundingClientRect().width;
        const d = {
          element: a,
          width: c,
          offsetLeft: n,
          index: l
        };
        return n += c + (l < this.totalQuotes - 1 ? this.gap : 0), d;
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
      const n = this.quoteData[t].offsetLeft;
      this.container.scrollTo({
        left: n,
        behavior: "smooth"
      }), this.updateNavigationState(), setTimeout(() => {
        this.updateProgress();
      }, 50);
    }
    scrollToRightAlignment() {
      const t = this.quoteData[this.totalQuotes - 1], n = t.offsetLeft + t.width - this.containerWidth;
      this.currentIndex = this.totalQuotes - 1, this.isAdaptiveAligning = !0, this.container.scrollTo({
        left: Math.max(0, n),
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
        const n = this.quoteData[s], a = n.offsetLeft, l = n.offsetLeft + n.width, c = t + this.containerWidth, d = Math.max(a, t), h = Math.min(l, c);
        if (Math.max(0, h - d) / n.width >= 0.3 || a >= t && a < c) {
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
  const r = document.querySelectorAll(".quotes-slider-container"), e = [];
  return console.log(`📊 Quotes Slider: Found ${r.length} containers`), r.forEach((i) => {
    const t = new o(i);
    t.shouldEnable() || t.disable(), e.push(t);
  }), window.quotesSliders = e, e;
}
function I() {
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
        const s = i.getAttribute("rating-value"), n = this.snapToNearestTenth(parseFloat(s) || 0);
        i.innerHTML = "";
        const a = this.createStarContainer(n);
        i.appendChild(a), i.setAttribute("rating-value", n.toString());
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
      const s = this.getStarFillState(e, i), n = this.createStarSvg(s);
      return t.appendChild(n), t;
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
        ), n = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "linearGradient"
        );
        n.setAttribute("id", t), n.setAttribute("gradientUnits", "objectBoundingBox"), n.setAttribute("x1", "0%"), n.setAttribute("y1", "0%"), n.setAttribute("x2", "100%"), n.setAttribute("y2", "0%");
        const a = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        a.setAttribute("offset", `${i}%`), a.setAttribute("stop-color", "var(--_colors---utility--color)");
        const l = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        l.setAttribute("offset", `${i}%`), l.setAttribute("stop-color", "#dcdfe1"), n.appendChild(a), n.appendChild(l), s.appendChild(n), e.appendChild(s);
      }
    }
  }
  new o();
}
function M() {
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
  new o();
}
function L() {
  const o = document.querySelectorAll(".tabs.w-tabs");
  o.length !== 0 && (console.log(`📱 Tabs Select: Found ${o.length} tab containers`), o.forEach((r) => {
    const e = r.querySelectorAll(".tab-link");
    if (e.length === 0 || r.querySelector(".tabs-select"))
      return;
    const i = document.createElement("select");
    i.className = "tabs-select";
    const t = document.createElement("option");
    t.value = "", t.textContent = "Select a tab...", t.disabled = !0, i.appendChild(t), e.forEach((s, n) => {
      const a = document.createElement("option");
      a.value = n, a.textContent = s.textContent.trim() || `Tab ${n + 1}`, s.classList.contains("w--current") && (a.selected = !0, t.disabled = !1, t.selected = !1), i.appendChild(a);
    }), i.addEventListener("change", function() {
      const s = parseInt(this.value);
      !isNaN(s) && e[s] && e[s].click();
    }), r.insertBefore(i, r.firstChild);
  }), T(), console.log("✅ Tabs Select: Mobile tab selectors initialized"));
}
function T() {
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
function N() {
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", v) : v();
}
function v() {
  const o = document.querySelectorAll(".tabbed-cards");
  o.length !== 0 && (console.log(
    `🎴 Tabbed Cards: Found ${o.length} containers`
  ), o.forEach((r) => {
    B(r);
  }), console.log("✅ Tabbed Cards: All containers initialized"));
}
function B(o) {
  const r = o.querySelector(".tabbed-cards-image"), e = o.querySelectorAll(".tabbed-card.w-dropdown");
  !r || e.length === 0 || ($(e), P(e, r), e.forEach((i, t) => {
    Q(i, t, o, r);
  }), z(e, r), R());
}
function $(o) {
  o.forEach((r, e) => {
    const t = r.querySelector(".tabbed-card-image-wrapper")?.querySelector("img");
    if (!t) return;
    const s = document.createElement("div");
    s.className = "tabbed-card-mobile-image", s.dataset.cardIndex = e;
    const n = t.cloneNode(!0);
    s.appendChild(n), r.parentNode.insertBefore(s, r.nextSibling);
  });
}
function P(o, r) {
  r.innerHTML = "";
  const e = document.createElement("img");
  e.style.width = "100%", e.style.height = "auto", e.style.display = "block", e.style.transition = "opacity 0.2s ease", e.className = "tabbed-card-main-image", r.appendChild(e), o.forEach((i) => {
    const t = i.querySelector(".tabbed-card-image-wrapper img");
    if (t?.src) {
      const s = new Image();
      s.src = t.src;
    }
  });
}
function Q(o, r, e, i) {
  const t = o.querySelector(".tabbed-card-toggler");
  if (!t) return;
  t.addEventListener("click", () => {
    t.getAttribute("aria-expanded") === "true" || (D(o, e), setTimeout(() => {
      m(r, i), f(r, e);
    }, 100));
  }), new MutationObserver((n) => {
    n.forEach((a) => {
      a.attributeName === "aria-expanded" && t.getAttribute("aria-expanded") === "true" && (m(r, i), f(r, e));
    });
  }).observe(t, {
    attributes: !0,
    attributeFilter: ["aria-expanded"]
  });
}
function D(o, r) {
  r.querySelectorAll(".tabbed-card.w-dropdown").forEach((i) => {
    if (i !== o) {
      const t = i.querySelector(".tabbed-card-toggler");
      t && t.getAttribute("aria-expanded") === "true" && (t.click(), setTimeout(() => {
        if (t.getAttribute("aria-expanded") === "true") {
          t.setAttribute("aria-expanded", "false");
          const s = i.querySelector(".w-dropdown"), n = i.querySelector(".w-dropdown-list"), a = i.querySelector(".w-dropdown-toggle");
          s?.classList.remove("w--open"), n?.classList.remove("w--open"), a?.classList.remove("w--open");
        }
      }, 50));
    }
  });
}
function m(o, r) {
  const e = r.querySelector(".tabbed-card-main-image");
  if (!e) return;
  const t = r.closest(".tabbed-cards").querySelectorAll(".tabbed-card.w-dropdown")[o];
  if (!t) return;
  const s = t.querySelector(".tabbed-card-image-wrapper img");
  s && e.src !== s.src && (e.style.opacity = "0.5", e.src = s.src, e.alt = s.alt || "", e.onload = () => {
    e.style.opacity = "1";
  });
}
function f(o, r) {
  r.querySelectorAll(
    ".tabbed-card-mobile-image"
  ).forEach((t) => {
    t.style.display = "none";
  });
  const i = r.querySelector(
    `[data-card-index="${o}"]`
  );
  i && (i.style.display = "block");
}
function R() {
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
function z(o, r) {
  if (o.length === 0) return;
  const e = o[0], i = e.querySelector(".tabbed-card-toggler");
  i && (o.forEach((t, s) => {
    if (s !== 0) {
      const n = t.querySelector(".tabbed-card-toggler");
      n?.getAttribute("aria-expanded") === "true" && n.click();
    }
  }), setTimeout(() => {
    i.getAttribute("aria-expanded") === "true" || (i.click(), setTimeout(() => {
      if (i.getAttribute("aria-expanded") !== "true") {
        i.setAttribute("aria-expanded", "true");
        const s = e.querySelector(".w-dropdown"), n = e.querySelector(".w-dropdown-list"), a = e.querySelector(".w-dropdown-toggle");
        s?.classList.add("w--open"), n?.classList.add("w--open"), a?.classList.add("w--open");
      }
    }, 100)), m(0, r), f(0, e.closest(".tabbed-cards"));
  }, 200));
}
const g = {
  baseUrl: "https://pages.crunchbase.com",
  munchkinId: "976-JJA-800",
  cssUrl: "https://app-sj22.marketo.com/js/forms2/css/forms2.css",
  jsUrl: "https://pages.crunchbase.com/js/forms2/js/forms2.min.js"
};
let p = {
  css: !1,
  js: !1
};
function W() {
  return new Promise((o) => {
    if (p.css || document.querySelector(`link[href="${g.cssUrl}"]`)) {
      p.css = !0, o();
      return;
    }
    const r = document.createElement("link");
    r.rel = "stylesheet", r.href = g.cssUrl, r.onload = () => {
      p.css = !0, console.log("✅ Marketo CSS loaded"), o();
    }, r.onerror = () => {
      console.error("❌ Failed to load Marketo CSS"), o();
    }, document.head.appendChild(r);
  });
}
function j() {
  return new Promise((o) => {
    if (p.js || window.MktoForms2) {
      p.js = !0, o();
      return;
    }
    const r = document.createElement("script");
    r.src = g.jsUrl, r.onload = () => {
      p.js = !0, console.log("✅ Marketo JS loaded"), o();
    }, r.onerror = () => {
      console.error("❌ Failed to load Marketo JS"), o();
    }, document.head.appendChild(r);
  });
}
function U(o) {
  try {
    const r = o.getFormElem()[0], e = Array.from(
      r.querySelectorAll(".mktoFormRow")
    ).filter((i) => !i.querySelector('input[type="hidden"]'));
    r.querySelectorAll(".is-odd-last").forEach((i) => i.classList.remove("is-odd-last")), e.length % 2 === 1 && e[e.length - 1].classList.add("is-odd-last"), console.log(
      `✅ Layout applied to form with ${e.length} visible rows`
    );
  } catch (r) {
    console.error("❌ Error applying layout:", r);
  }
}
let x = 0;
function b(o, r) {
  try {
    if (o.hasAttribute("data-marketo-initialized")) {
      console.log(
        `ℹ️ Marketo form ${r} already initialized in this container`
      );
      return;
    }
    x++;
    const e = `mktoForm_${r}_${x}`;
    o.innerHTML = "";
    const i = document.createElement("form");
    i.id = e, o.appendChild(i), o.setAttribute("data-marketo-initialized", "true"), o.setAttribute("data-marketo-unique-id", e), console.log(
      `🎯 Initializing Marketo form ${r} with unique ID: ${e}`
    ), window.MktoForms2.loadForm(
      g.baseUrl,
      g.munchkinId,
      parseInt(r),
      function(t) {
        console.log(`✅ Marketo form ${r} loaded successfully`);
        const s = t.getFormElem()[0];
        s && (i.parentNode.replaceChild(s, i), s.id = e, console.log(`🎯 Form rendered in container with ID: ${e}`)), setTimeout(() => U(t), 100);
        const n = new CustomEvent("marketoFormLoaded", {
          detail: { form: t, formId: r, container: o, uniqueId: e }
        });
        o.dispatchEvent(n);
      }
    );
  } catch (e) {
    console.error(`❌ Error initializing Marketo form ${r}:`, e);
  }
}
function V() {
  const o = document.querySelectorAll("[data-marketo-id]");
  if (o.length === 0) {
    console.log(
      "ℹ️ No Marketo form containers found (looking for [data-marketo-id])"
    );
    return;
  }
  console.log(`🎯 Found ${o.length} Marketo form container(s)`), o.forEach((r, e) => {
    const i = r.getAttribute("data-marketo-id");
    if (!i) {
      console.warn(
        `⚠️ Container ${e + 1} has data-marketo-id but no value`
      );
      return;
    }
    setTimeout(() => {
      b(r, i);
    }, e * 100);
  });
}
function H() {
  console.log("🚀 Marketo Forms: Starting initialization..."), Promise.all([W(), j()]).then(() => {
    setTimeout(() => {
      window.MktoForms2 ? (V(), new MutationObserver((r) => {
        r.forEach((e) => {
          e.addedNodes.forEach((i) => {
            if (i.nodeType === 1) {
              if (i.hasAttribute && i.hasAttribute("data-marketo-id")) {
                const s = i.getAttribute("data-marketo-id");
                setTimeout(() => b(i, s), 100);
              }
              (i.querySelectorAll ? i.querySelectorAll("[data-marketo-id]") : []).forEach((s, n) => {
                const a = s.getAttribute("data-marketo-id");
                a && setTimeout(
                  () => b(s, a),
                  (n + 1) * 100
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
  ), o.forEach((r, e) => {
    J(r, e);
  }), console.log("✅ Pricing Card Toggler: Complete");
}
function J(o, r) {
  const e = o.querySelector(".pricing-card-toggle"), i = o.querySelector(".pricing-card-toggle-dark"), t = o.querySelector(".pricing-card-toggle-light"), s = o.querySelector(
    ".pricing-card-toggle-dark-text"
  ), n = o.querySelector(
    ".pricing-card-toggle-light-text"
  ), a = o.querySelectorAll(".pricing-card-option"), l = a[0], c = a[1];
  if (!e || !i || !t || !s || !n) {
    console.warn(
      `⚠️ Pricing Card Toggler: Missing toggle elements in card ${r + 1}`
    );
    return;
  }
  const d = `pricing-card-${r}`, h = `${d}-toggle`, w = `${d}-annual`, y = `${d}-monthly`, C = `${d}-annual-option`, E = `${d}-monthly-option`;
  G(
    e,
    i,
    t,
    s,
    n,
    l,
    c,
    h,
    w,
    y,
    C,
    E
  ), u(
    i,
    t,
    s,
    n,
    l,
    c,
    "annual"
  ), X(
    s,
    n,
    i,
    t,
    l,
    c
  );
}
function G(o, r, e, i, t, s, n, a, l, c, d, h) {
  o.setAttribute("role", "tablist"), o.setAttribute("aria-label", "Pricing period selection"), o.id = a, r.setAttribute("role", "tab"), r.id = l, r.setAttribute("aria-selected", "true"), r.setAttribute("aria-controls", d), r.setAttribute("tabindex", "0"), e.setAttribute("role", "tab"), e.id = c, e.setAttribute("aria-selected", "false"), e.setAttribute("aria-controls", h), e.setAttribute("tabindex", "-1"), i.setAttribute("tabindex", "-1"), t.setAttribute("tabindex", "-1"), i.setAttribute("aria-hidden", "true"), t.setAttribute("aria-hidden", "true"), s && (s.setAttribute("role", "tabpanel"), s.id = d, s.setAttribute("aria-labelledby", l), s.setAttribute("aria-hidden", "false")), n && (n.setAttribute("role", "tabpanel"), n.id = h, n.setAttribute("aria-labelledby", c), n.setAttribute("aria-hidden", "true"));
}
function X(o, r, e, i, t, s) {
  e.addEventListener("click", (n) => {
    n.preventDefault(), u(
      e,
      i,
      o,
      r,
      t,
      s,
      "annual"
    );
  }), i.addEventListener("click", (n) => {
    n.preventDefault(), u(
      e,
      i,
      o,
      r,
      t,
      s,
      "monthly"
    );
  }), e.addEventListener("keydown", (n) => {
    A(
      n,
      e,
      i,
      o,
      r,
      t,
      s
    );
  }), i.addEventListener("keydown", (n) => {
    A(
      n,
      e,
      i,
      o,
      r,
      t,
      s
    );
  }), o.addEventListener("click", (n) => n.preventDefault()), r.addEventListener("click", (n) => n.preventDefault());
}
function A(o, r, e, i, t, s, n) {
  const { key: a, target: l } = o;
  switch (a) {
    case "ArrowLeft":
    case "ArrowUp":
      o.preventDefault(), l === e && (r.focus(), u(
        r,
        e,
        i,
        t,
        s,
        n,
        "annual"
      ));
      break;
    case "ArrowRight":
    case "ArrowDown":
      o.preventDefault(), l === r && (e.focus(), u(
        r,
        e,
        i,
        t,
        s,
        n,
        "monthly"
      ));
      break;
    case "Enter":
    case " ":
      o.preventDefault(), l === r ? u(
        r,
        e,
        i,
        t,
        s,
        n,
        "annual"
      ) : l === e && u(
        r,
        e,
        i,
        t,
        s,
        n,
        "monthly"
      );
      break;
    case "Home":
      o.preventDefault(), r.focus(), u(
        r,
        e,
        i,
        t,
        s,
        n,
        "annual"
      );
      break;
    case "End":
      o.preventDefault(), e.focus(), u(
        r,
        e,
        i,
        t,
        s,
        n,
        "monthly"
      );
      break;
  }
}
function u(o, r, e, i, t, s, n) {
  const a = n === "annual";
  o.setAttribute("aria-selected", a ? "true" : "false"), r.setAttribute("aria-selected", a ? "false" : "true"), o.setAttribute("tabindex", a ? "0" : "-1"), r.setAttribute("tabindex", a ? "-1" : "0"), a ? (o.classList.contains("pricing-card-toggle-dark") || (o.className = o.className.replace(
    "pricing-card-toggle-light",
    "pricing-card-toggle-dark"
  )), r.classList.contains("pricing-card-toggle-light") || (r.className = r.className.replace(
    "pricing-card-toggle-dark",
    "pricing-card-toggle-light"
  ))) : (r.classList.contains("pricing-card-toggle-dark") || (r.className = r.className.replace(
    "pricing-card-toggle-light",
    "pricing-card-toggle-dark"
  )), o.classList.contains("pricing-card-toggle-light") || (o.className = o.className.replace(
    "pricing-card-toggle-dark",
    "pricing-card-toggle-light"
  ))), a ? (e.style.color = "white", i.style.color = "var(--_colors---primary--dark-blue)") : (i.style.color = "white", e.style.color = "var(--_colors---primary--dark-blue)"), t && (t.setAttribute("aria-hidden", a ? "false" : "true"), t.style.display = a ? "flex" : "none"), s && (s.setAttribute("aria-hidden", a ? "true" : "false"), s.style.display = a ? "none" : "flex"), K(`${a ? "Annual" : "Monthly"} pricing selected`);
}
function K(o) {
  const r = document.createElement("div");
  r.setAttribute("aria-live", "polite"), r.setAttribute("aria-atomic", "true"), r.style.position = "absolute", r.style.left = "-10000px", r.style.width = "1px", r.style.height = "1px", r.style.overflow = "hidden", document.body.appendChild(r), r.textContent = o, setTimeout(() => {
    document.body.removeChild(r);
  }, 1e3);
}
const S = {
  demo: k,
  logoSlider: q,
  quotesSlider: F,
  starRating: I,
  comparisonTableToggler: M,
  tabsSelect: L,
  tabbedCards: N,
  marketoForms: H,
  pricingCardToggler: _
  // Add more features here as you create them
  // myFeature: initMyFeature,
};
function Z(o = ["demo"]) {
  console.log("🎯 Initializing features:", o), o.forEach((r) => {
    if (S[r])
      try {
        S[r]();
      } catch (e) {
        console.error(`❌ Error initializing feature '${r}':`, e);
      }
    else
      console.warn(`⚠️ Feature '${r}' not found`);
  });
}
console.log("🚀 Crunchbase Webflow script loaded");
Z([
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
