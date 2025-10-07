import { d as a, u as e, G as v, a as b } from "./jsxRuntime.module-Dy4jXDNb.js";
const f = () => {
  const [o, l] = a(
    "https://cdn.prod.website-files.com/687e6d0359c517be389ea464/68dbdc434c8bbf85e9a0e0b1_Crunchbase%20Logo%20(Blue).png"
  ), [u, m] = a(
    "Crunchbase Pro has become an utterly essential tool for me. I'm in and out of it every day."
  ), [r, h] = a("Dmitry Shevelenko"), [d, p] = a(
    "Chief Business Officer, Perplexity"
  ), [n, s] = a(!1), i = () => `<div class="quote-card">
	<div class="quote-logo">
		<img src="${o}" loading="eager" width="Auto" data-wf--image--variant="base" alt="" class="image-element">
	</div>
	<div class="quote-card-container">
		<div class="quote-text">"${u}"</div>
		<div class="quote-by">
			<div class="quote-by-text">
				<div class="quote-by-name">${r}</div>
				<div class="quote-by-position">${d}</div>
			</div>
		</div>
	</div>
</div>`, q = () => {
    const t = i();
    navigator.clipboard.writeText(t).then(() => {
      s(!0), setTimeout(() => s(!1), 2e3);
    });
  };
  return /* @__PURE__ */ e("div", { className: "quote-builder", children: [
    /* @__PURE__ */ e("div", { className: "quote-builder-form", children: [
      /* @__PURE__ */ e("h3", { className: "quote-builder-title", children: "Quote Card Builder" }),
      /* @__PURE__ */ e("p", { className: "quote-builder-description", children: "Build a custom quote card and copy the HTML to paste into Webflow Rich Text elements." }),
      /* @__PURE__ */ e("div", { className: "quote-field", children: [
        /* @__PURE__ */ e("label", { className: "quote-field-label", children: "Logo URL" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            value: o,
            onChange: (t) => l(t.target.value),
            className: "quote-field-input",
            placeholder: "https://example.com/logo.png"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "quote-field", children: [
        /* @__PURE__ */ e("label", { className: "quote-field-label", children: "Quote Text" }),
        /* @__PURE__ */ e(
          "textarea",
          {
            value: u,
            onChange: (t) => m(t.target.value),
            className: "quote-field-textarea",
            placeholder: "Enter the quote text...",
            rows: "4"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "quote-field", children: [
        /* @__PURE__ */ e("label", { className: "quote-field-label", children: "Quote By (Name)" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            value: r,
            onChange: (t) => h(t.target.value),
            className: "quote-field-input",
            placeholder: "John Doe"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "quote-field", children: [
        /* @__PURE__ */ e("label", { className: "quote-field-label", children: "Quote By (Position)" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            value: d,
            onChange: (t) => p(t.target.value),
            className: "quote-field-input",
            placeholder: "CEO, Company Name"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "quote-builder-output", children: [
      /* @__PURE__ */ e("h4", { className: "quote-output-title", children: "Preview" }),
      /* @__PURE__ */ e(
        "div",
        {
          className: "quote-preview",
          dangerouslySetInnerHTML: { __html: i() }
        }
      ),
      /* @__PURE__ */ e("h4", { className: "quote-output-title", children: "HTML Output" }),
      /* @__PURE__ */ e("pre", { className: "quote-html-output", children: i() }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: q,
          className: `quote-copy-button ${n ? "copied" : ""}`,
          children: n ? "✓ Copied!" : "Copy HTML"
        }
      )
    ] })
  ] });
};
function c(o = "#quote-card-builder") {
  console.log("🚀 Quote Card Builder: Starting initialization...");
  try {
    const l = document.querySelector(o);
    if (!l) {
      console.error(
        `❌ Quote Card Builder: Container "${o}" not found`
      );
      return;
    }
    return console.log(`✅ Quote Card Builder: Found container "${o}"`), v(b(f), l), console.log("✅ Quote Card Builder: Component rendered successfully"), l;
  } catch (l) {
    console.error("❌ Quote Card Builder: Error during initialization:", l);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#quote-card-builder") ? c() : console.log(
    "💡 Quote Card Builder: No #quote-card-builder container found. Use initQuoteCardBuilder('#your-selector') to initialize manually."
  );
});
window.initQuoteCardBuilder = c;
export {
  c as default,
  c as initQuoteCardBuilder
};
