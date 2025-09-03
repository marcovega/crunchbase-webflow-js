import { useState, useEffect } from "preact/hooks";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./ROICalculator.css";

const ROICalculator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [winRate, setWinRate] = useState(25);
  const [dealSize, setDealSize] = useState(50000);
  const [companySizeRange, setCompanySizeRange] = useState([0, 10000]);
  const [selectedTerritories, setSelectedTerritories] = useState([]);
  const [territorySearch, setTerritorySearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  // Mock territory data
  const mockTerritories = [
    "North America",
    "Europe",
    "Asia Pacific",
    "Latin America",
    "Middle East",
    "Africa",
    "Canada",
    "United States",
    "United Kingdom",
    "Germany",
    "France",
    "Japan",
    "Australia",
    "Brazil",
    "India",
  ];

  const mockIndustries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Retail",
    "Manufacturing",
    "Education",
    "Real Estate",
    "Transportation",
    "Energy",
    "Media & Entertainment",
    "Agriculture",
    "Construction",
    "Professional Services",
    "Government",
    "Non-profit",
  ];

  useEffect(() => {
    // Mock network request - simulate loading data
    const loadFormData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load form data:", error);
        setIsLoading(false);
      }
    };

    loadFormData();
  }, []);

  const addTerritory = (territory) => {
    if (!selectedTerritories.includes(territory)) {
      setSelectedTerritories([...selectedTerritories, territory]);
      setTerritorySearch("");
    }
  };

  const removeTerritory = (territory) => {
    setSelectedTerritories(selectedTerritories.filter((t) => t !== territory));
  };

  const filteredTerritories = mockTerritories.filter(
    (territory) =>
      territory.toLowerCase().includes(territorySearch.toLowerCase()) &&
      !selectedTerritories.includes(territory)
  );

  return (
    <>
      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            border: 4px solid #146aff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          input[type="range"]::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            border: 4px solid #146aff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          /* Firefox styling */
          input[type="range"]::-moz-range-track {
            background: #E4EAEF;
            height: 4px;
            border-radius: 2px;
            border: none;
          }

          input[type="range"]::-moz-range-progress {
            background: #146aff;
            height: 4px;
            border-radius: 2px;
          }

          /* Webkit browsers */
          input[type="range"]::-webkit-slider-track {
            background: #E4EAEF;
            height: 4px;
            border-radius: 2px;
            border: none;
          }

          /* Webkit progress value (limited support) */
          input[type="range"]::-webkit-progress-value {
            background: #146aff;
          }
        `}
      </style>
      <div className="roi-form">
        <div className="roi-field">
          <div className="roi-field-title">Opportunity win rate</div>
          {isLoading ? (
            <div className="roi-field-skeleton"></div>
          ) : (
            <div className="roi-slider-input-group">
              <div className="roi-slider-wrapper-no-label">
                <Slider
                  value={winRate}
                  onChange={(value) => setWinRate(value)}
                  min={0}
                  max={100}
                  className="roi-rc-slider"
                />
              </div>
              <input
                type="text"
                value={`${winRate}%`}
                onChange={(e) => {
                  const value = e.target.value.replace("%", "");
                  const numValue = parseFloat(value);
                  if (!isNaN(numValue)) {
                    setWinRate(Math.max(0, Math.min(100, numValue)));
                  }
                }}
                className="roi-field-input roi-input-fixed"
                placeholder="25%"
              />
            </div>
          )}
        </div>
        <div className="roi-field">
          <div className="roi-field-title">Average deal size</div>
          {isLoading ? (
            <div className="roi-field-skeleton"></div>
          ) : (
            <div className="roi-slider-input-group">
              <div className="roi-slider-wrapper-no-label">
                <Slider
                  value={dealSize}
                  onChange={(value) => setDealSize(value)}
                  min={10000}
                  max={1000000}
                  step={10000}
                  className="roi-rc-slider"
                />
              </div>
              <input
                type="text"
                value={`$${dealSize.toLocaleString()}`}
                onChange={(e) => {
                  const value = e.target.value.replace(/[$,]/g, "");
                  const numValue = parseFloat(value);
                  if (!isNaN(numValue)) {
                    setDealSize(Math.max(10000, Math.min(1000000, numValue)));
                  }
                }}
                className="roi-field-input roi-input-fixed"
                placeholder="$50,000"
              />
            </div>
          )}
        </div>
        <div className="roi-field">
          <div className="roi-field-title">
            What company sizes do you sell to?
          </div>
          {isLoading ? (
            <div className="roi-field-skeleton"></div>
          ) : (
            <div className="roi-slider-wrapper">
              <Slider
                range
                value={companySizeRange}
                onChange={(value) => setCompanySizeRange(value)}
                min={0}
                max={10000}
                className="roi-rc-slider"
              />
              <span className="roi-slider-value-min">
                {companySizeRange[0].toLocaleString()}
              </span>
              <span className="roi-slider-value-max">
                {companySizeRange[1].toLocaleString()}+
              </span>
            </div>
          )}
        </div>
        <div className="roi-field">
          <div className="roi-field-title">
            What territories do you sell to?
          </div>
          {isLoading ? (
            <div className="roi-field-skeleton"></div>
          ) : (
            <div className="roi-autocomplete-container">
              <input
                type="text"
                value={territorySearch}
                onChange={(e) => setTerritorySearch(e.target.value)}
                className="roi-field-input"
                placeholder="Search territories..."
              />
              {territorySearch && filteredTerritories.length > 0 && (
                <div className="roi-autocomplete-dropdown">
                  {filteredTerritories.slice(0, 5).map((territory) => (
                    <div
                      key={territory}
                      className="roi-autocomplete-item"
                      onClick={() => addTerritory(territory)}
                    >
                      {territory}
                    </div>
                  ))}
                </div>
              )}
              {selectedTerritories.length > 0 && (
                <div className="roi-pills-container">
                  {selectedTerritories.map((territory) => (
                    <div key={territory} className="roi-pill">
                      {territory}
                      <button
                        onClick={() => removeTerritory(territory)}
                        className="roi-pill-remove"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="roi-field">
          <div className="roi-field-title">What industries do you sell to?</div>
          {isLoading ? (
            <div className="roi-field-skeleton"></div>
          ) : (
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="roi-field-input roi-select-full"
            >
              <option value="">Select industry</option>
              {mockIndustries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="roi-field">
          <a href="#" className="roi-submit w-button">
            Calculate
          </a>
        </div>
      </div>
      <div className="roi-results">
        <div className="roi-stats">
          <div className="roi-stats-number">—</div>
          <div className="roi-stats-title">
            Total accounts in your market in Crunchbase
          </div>
        </div>
        <div className="roi-stats-group">
          <div className="roi-stats-group-item">
            <div className="roi-item-title">
              Accounts with funding in the last 6 months
            </div>
            <div className="roi-item-value">—</div>
          </div>
          <div className="roi-stats-group-item">
            <div className="roi-item-title">
              Accounts with funding in the last 6 months
            </div>
            <div className="roi-item-value">—</div>
          </div>
        </div>
        <div className="roi-stats">
          <div className="roi-stats-number">—</div>
          <div className="roi-stats-title">Potential additional revenue</div>
        </div>
      </div>
    </>
  );
};

export default ROICalculator;
