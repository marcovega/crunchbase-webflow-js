import { useState } from "preact/hooks";
import "./QuoteCardBuilder.css";

const QuoteCardBuilder = () => {
  const [logoUrl, setLogoUrl] = useState(
    "https://cdn.prod.website-files.com/687e6d0359c517be389ea464/68dbdc434c8bbf85e9a0e0b1_Crunchbase%20Logo%20(Blue).png"
  );
  const [quoteText, setQuoteText] = useState(
    "Crunchbase Pro has become an utterly essential tool for me. I'm in and out of it every day."
  );
  const [quoteName, setQuoteName] = useState("Dmitry Shevelenko");
  const [quotePosition, setQuotePosition] = useState(
    "Chief Business Officer, Perplexity"
  );
  const [copied, setCopied] = useState(false);

  const generateHTML = () => {
    return `<div class="quote-card">
\t<div class="quote-logo">
\t\t<img src="${logoUrl}" loading="eager" width="Auto" data-wf--image--variant="base" alt="" class="image-element">
\t</div>
\t<div class="quote-card-container">
\t\t<div class="quote-text">"${quoteText}"</div>
\t\t<div class="quote-by">
\t\t\t<div class="quote-by-text">
\t\t\t\t<div class="quote-by-name">${quoteName}</div>
\t\t\t\t<div class="quote-by-position">${quotePosition}</div>
\t\t\t</div>
\t\t</div>
\t</div>
</div>`;
  };

  const copyToClipboard = () => {
    const html = generateHTML();
    navigator.clipboard.writeText(html).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="quote-builder">
      <div className="quote-builder-form">
        <h3 className="quote-builder-title">Quote Card Builder</h3>
        <p className="quote-builder-description">
          Build a custom quote card and copy the HTML to paste into Webflow Rich
          Text elements.
        </p>

        <div className="quote-field">
          <label className="quote-field-label">Logo URL</label>
          <input
            type="text"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="quote-field-input"
            placeholder="https://example.com/logo.png"
          />
        </div>

        <div className="quote-field">
          <label className="quote-field-label">Quote Text</label>
          <textarea
            value={quoteText}
            onChange={(e) => setQuoteText(e.target.value)}
            className="quote-field-textarea"
            placeholder="Enter the quote text..."
            rows="4"
          />
        </div>

        <div className="quote-field">
          <label className="quote-field-label">Quote By (Name)</label>
          <input
            type="text"
            value={quoteName}
            onChange={(e) => setQuoteName(e.target.value)}
            className="quote-field-input"
            placeholder="John Doe"
          />
        </div>

        <div className="quote-field">
          <label className="quote-field-label">Quote By (Position)</label>
          <input
            type="text"
            value={quotePosition}
            onChange={(e) => setQuotePosition(e.target.value)}
            className="quote-field-input"
            placeholder="CEO, Company Name"
          />
        </div>
      </div>

      <div className="quote-builder-output">
        <h4 className="quote-output-title">Preview</h4>
        <div
          className="quote-preview"
          dangerouslySetInnerHTML={{ __html: generateHTML() }}
        />

        <h4 className="quote-output-title">HTML Output</h4>
        <pre className="quote-html-output">{generateHTML()}</pre>

        <button
          onClick={copyToClipboard}
          className={`quote-copy-button ${copied ? "copied" : ""}`}
        >
          {copied ? "✓ Copied!" : "Copy HTML"}
        </button>
      </div>
    </div>
  );
};

export default QuoteCardBuilder;
