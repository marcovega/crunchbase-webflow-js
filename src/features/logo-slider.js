/*
Assumes markup of:

<div data-logo-slider="true">
	<img src="logo.png">
	<img src="logo.png">
</div>

Doesn't have to be <img>, slides are simply direct children of the slider.
*/

/**
 * Init Logo Slider.
 *
 * @returns {void}
 */
const init = () => {
	const logoSlider = document.querySelectorAll(`[data-logo-slider="true"]`);
	const minItems = 7;

	if (!logoSlider || logoSlider.length === 0) {
		return;
	}

	// If user prefers reduced motion, don't init.
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		return;
	}

	logoSlider.forEach((slider) => {
		const items = slider.querySelectorAll(":scope > *");

		if (items.length === 0 || items.length < minItems) {
			return;
		}

		slider.setAttribute("data-logo-slider-init", "true");
		slider.style.setProperty("--ls-items", items.length);

		items.forEach((slide, index) => {
			slide.style.setProperty("--ls-item-index", index + 1);
		});
	});
};

export default init;
