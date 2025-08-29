/*
 * Star Rating Feature
 * Finds elements with rating-value attribute and replaces text with star ratings
 * Supports 0.5 step ratings from 0 to 5
 */

export function initStarRating() {
  class StarRating {
    constructor() {
      this.init();
    }

    init() {
      this.processRatingElements();
    }

    processRatingElements() {
      const ratingElements = document.querySelectorAll("[rating-value]");

      console.log(`⭐ Star Rating: Found ${ratingElements.length} elements`);

      ratingElements.forEach((element, index) => {
        const rawValue = element.getAttribute("rating-value");
        const rating = this.snapToNearestTenth(parseFloat(rawValue) || 0);

        // Clear existing content
        element.innerHTML = "";

        // Create star container
        const starContainer = this.createStarContainer(rating);
        element.appendChild(starContainer);

        // Update the attribute to the snapped value
        element.setAttribute("rating-value", rating.toString());
      });
    }

    snapToNearestTenth(value) {
      // Ensure value is between 0 and 5
      const clamped = Math.max(0, Math.min(5, value));
      // Round to nearest 0.1
      return Math.round(clamped * 10) / 10;
    }

    createStarContainer(rating) {
      const container = document.createElement("div");
      container.style.cssText = `
        display: flex;
        gap: 2px;
        align-items: center;
      `;

      // Create 5 stars
      for (let i = 1; i <= 5; i++) {
        const star = this.createStar(i, rating);
        container.appendChild(star);
      }

      return container;
    }

    createStar(position, rating) {
      const starWrapper = document.createElement("div");
      starWrapper.style.cssText = `
        width: 19px;
        height: 19px;
        position: relative;
        display: inline-block;
      `;

      // Determine fill state
      const fillState = this.getStarFillState(position, rating);

      // Create the star SVG
      const starSvg = this.createStarSvg(fillState);
      starWrapper.appendChild(starSvg);

      return starWrapper;
    }

    getStarFillState(position, rating) {
      const starStart = position - 1;
      const starEnd = position;

      if (rating >= starEnd) {
        return "full"; // Fully filled
      } else if (rating > starStart) {
        // Calculate the fill percentage for partial stars
        const fillPercentage = ((rating - starStart) * 100).toFixed(0);
        return { type: "partial", percentage: fillPercentage };
      } else {
        return "empty"; // Empty
      }
    }

    createStarSvg(fillState) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("width", "19");
      svg.setAttribute("height", "19");
      svg.setAttribute("fill", "none");
      svg.setAttribute("viewBox", "0 0 19 19");

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        "M9.26.745a.41.41 0 0 1 .735 0l2.548 5.162a.41.41 0 0 0 .308.224l5.697.828a.41.41 0 0 1 .228.7l-4.123 4.018a.41.41 0 0 0-.118.363l.973 5.674a.41.41 0 0 1-.594.432l-5.096-2.68a.41.41 0 0 0-.382 0l-5.095 2.68a.41.41 0 0 1-.595-.432l.973-5.674a.41.41 0 0 0-.118-.363L.48 7.658a.41.41 0 0 1 .227-.699l5.697-.828a.41.41 0 0 0 .309-.224L9.26.745Z"
      );

      // Apply styling based on fill state
      if (fillState === "full") {
        path.setAttribute("fill", "var(--_colors---utility--color)");
      } else if (fillState === "empty") {
        path.setAttribute("fill", "#dcdfe1");
      } else if (fillState.type === "partial") {
        const gradientId = `partial-fill-${fillState.percentage}`;
        path.setAttribute("fill", `url(#${gradientId})`);
        this.ensurePartialFillGradient(svg, fillState.percentage, gradientId);
      }

      svg.appendChild(path);
      return svg;
    }

    ensurePartialFillGradient(svg, percentage, gradientId) {
      // Check if gradient already exists in document
      if (!document.getElementById(gradientId)) {
        const defs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs"
        );
        const gradient = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "linearGradient"
        );

        gradient.setAttribute("id", gradientId);
        gradient.setAttribute("gradientUnits", "objectBoundingBox");
        gradient.setAttribute("x1", "0%");
        gradient.setAttribute("y1", "0%");
        gradient.setAttribute("x2", "100%");
        gradient.setAttribute("y2", "0%");

        // Create gradient stops
        const stop1 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        stop1.setAttribute("offset", `${percentage}%`);
        stop1.setAttribute("stop-color", "var(--_colors---utility--color)");

        const stop2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "stop"
        );
        stop2.setAttribute("offset", `${percentage}%`);
        stop2.setAttribute("stop-color", "#dcdfe1");

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);
      }
    }
  }

  // Initialize star ratings
  new StarRating();
}

export default initStarRating;
