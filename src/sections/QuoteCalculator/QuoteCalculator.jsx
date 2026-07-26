import { useMemo, useState } from "react";
import "./QuoteCalculator.css";

const serviceRates = {
  screenPrint: {
    label: "Screen Printing",
    decorationRate: 5,
    setupFee: 20,
  },
  dtf: {
    label: "DTF Printing",
    decorationRate: 7,
    setupFee: 15,
  },
  htv: {
    label: "Heat Transfer Vinyl",
    decorationRate: 9,
    setupFee: 15,
  },
};

const garmentRates = {
  tshirt: {
    label: "Standard T-Shirt",
    price: 4.5,
  },
  premiumTshirt: {
    label: "Premium Soft T-Shirt",
    price: 7,
  },
  longSleeve: {
    label: "Long-Sleeve Shirt",
    price: 8,
  },
  hoodie: {
    label: "Pullover Hoodie",
    price: 18,
  },
  polo: {
    label: "Polo Shirt",
    price: 13,
  },
};

const printLocationOptions = [
  {
    category: "Front",
    locations: [
      "Left Chest",
      "Full Front",
      "Right Chest"
    ]
  },
  {
    category: "Back",
    locations: [
      "Full Back",
      "Upper Back",
      "Neck Tag"
    ]
  },
  {
    category: "Sleeves",
    locations: [
      "Left Sleeve",
      "Right Sleeve"
    ]
  }
];

const printSizeRates = {
  small: {
    label: "Small / Left Chest",
    price: 0,
  },
  standard: {
    label: "Standard Front",
    price: 2,
  },
  large: {
    label: "Large Front or Back",
    price: 4,
  },
  oversized: {
    label: "Oversized Print",
    price: 6,
  },
};

function QuoteCalculator() {
  const [service, setService] = useState("screenPrint");
  const [quantity, setQuantity] = useState(12);
  const [garment, setGarment] = useState("tshirt");
  const [customerSupplied, setCustomerSupplied] =
    useState(false);
  const [printSize, setPrintSize] = useState("standard");
  const [selectedLocations, setSelectedLocations] =
    useState([]);
  const [colors, setColors] = useState(1);
  const [rushOrder, setRushOrder] = useState(false);

  const togglePrintLocation = (location) => {
    setSelectedLocations((previousLocations) => {
      if (previousLocations.includes(location)) {
        return previousLocations.filter(
          (item) => item !== location
        );
      }

      return [...previousLocations, location];
    });
  };

  const estimate = useMemo(() => {
    const safeQuantity = Math.max(
      Number(quantity) || 1,
      1
    );

    const selectedService = serviceRates[service];
    const selectedGarment = garmentRates[garment];
    const selectedPrintSize = printSizeRates[printSize];

    const garmentCost = customerSupplied
      ? 0
      : selectedGarment.price;

    let decorationCost =
      selectedService.decorationRate +
      selectedPrintSize.price;

    if (service === "screenPrint") {
      decorationCost +=
        Math.max(colors - 1, 0) * 1.5;
    }

    const locationCount = Math.max(
      selectedLocations.length,
      1
    );

    decorationCost +=
      Math.max(locationCount - 1, 0) * 4;

    let quantityDiscount = 1;

    if (safeQuantity >= 24) {
      quantityDiscount = 0.95;
    }

    if (safeQuantity >= 48) {
      quantityDiscount = 0.9;
    }

    if (safeQuantity >= 100) {
      quantityDiscount = 0.85;
    }

    const discountedDecorationCost =
      decorationCost * quantityDiscount;

    const pricePerShirt =
      garmentCost + discountedDecorationCost;

    const setupFee =
      service === "screenPrint"
        ? selectedService.setupFee * colors
        : selectedService.setupFee;

    const subtotal =
      safeQuantity * pricePerShirt + setupFee;

    const rushFee = rushOrder
      ? subtotal * 0.25
      : 0;

    const total = subtotal + rushFee;

    const selectedServiceLabel =
  serviceRates[service].label;

const selectedGarmentLabel = customerSupplied
  ? "Customer-Supplied Garments"
  : garmentRates[garment].label;

const selectedPrintSizeLabel =
  printSizeRates[printSize].label;

const safeQuantity = Math.max(
  Number(quantity) || 1,
  1
);

const locationSummary =
  selectedLocations.length > 0
    ? selectedLocations
    : ["No location selected"];

    return {
      garmentCost,
      decorationCost: discountedDecorationCost,
      pricePerShirt,
      setupFee,
      rushFee,
      total,
    };
  }, [
    service,
    quantity,
    garment,
    customerSupplied,
    printSize,
    selectedLocations,
    colors,
    rushOrder,
  ]);

  return (
    <section className="quote-calculator" id="quote">
      <div className="quote-calculator-container">
        <div className="quote-heading">
          <span className="quote-eyebrow">
            INSTANT ESTIMATE
          </span>

          <h2>Build Your Quote</h2>

          <p>
            Select your apparel and printing options to receive a
            preliminary project estimate.
          </p>
        </div>

        <div className="quote-layout">
          <div className="quote-form">
            <label>
              Printing Method

              <select
                value={service}
                onChange={(event) =>
                  setService(event.target.value)
                }
              >
                <option value="screenPrint">
                  Screen Printing
                </option>

                <option value="dtf">
                  DTF Printing
                </option>

                <option value="htv">
                  Heat Transfer Vinyl
                </option>
              </select>
            </label>

            <label>
              Quantity

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) =>
                  setQuantity(event.target.value)
                }
              />
            </label>

<div className="garment-selector">
  <h3>Select Your Garment</h3>

  <div className="garment-grid">
    {Object.entries(garmentRates).map(([value, item]) => {
      const garmentIcons = {
        tshirt: "👕",
        premiumTshirt: "⭐",
        longSleeve: "👔",
        hoodie: "🧥",
        polo: "👕",
      };

      const isSelected = garment === value;

      return (
        <button
          key={value}
          type="button"
          disabled={customerSupplied}
          className={`garment-card ${
            isSelected ? "active" : ""
          }`}
          aria-pressed={isSelected}
          onClick={() => setGarment(value)}
        >
          <span
            className="garment-icon"
            aria-hidden="true"
          >
            {garmentIcons[value]}
          </span>

          <h4>{item.label}</h4>

          <span className="garment-card-price">
            ${item.price.toFixed(2)} per piece
          </span>
        </button>
      );
    })}
  </div>

  {customerSupplied && (
    <p className="garment-supplied-message">
      Garment pricing has been removed because the customer
      will provide the apparel.
    </p>
  )}
</div>

<label className="quote-checkbox">
  <input
    type="checkbox"
    checked={customerSupplied}
    onChange={(event) =>
      setCustomerSupplied(event.target.checked)
    }
  />

  Customer will supply the garments
</label>

            
            <label>
              Print Size

              <select
                value={printSize}
                onChange={(event) =>
                  setPrintSize(event.target.value)
                }
              >
                {Object.entries(printSizeRates).map(
                  ([value, item]) => (
                    <option key={value} value={value}>
                      {item.label}
                    </option>
                  )
                )}
              </select>
            </label>

            <div className="print-location-selector">
  <div className="print-location-heading">
    <h3>Select Print Locations</h3>

    <span>
      {selectedLocations.length} selected
    </span>
  </div>

  <div className="print-location-groups">
    {printLocationOptions.map((group) => (
      <div
        className="print-location-group"
        key={group.category}
      >
        <h4>{group.category}</h4>

        <div className="print-location-grid">
          {group.locations.map((location) => {
            const isSelected =
              selectedLocations.includes(location);

            return (
              <button
                key={location}
                type="button"
                className={`print-location-card ${
                  isSelected ? "active" : ""
                }`}
                aria-pressed={isSelected}
                onClick={() =>
                  togglePrintLocation(location)
                }
              >
                <span
                  className="print-location-check"
                  aria-hidden="true"
                >
                  {isSelected ? "✓" : "+"}
                </span>

                <span>{location}</span>
              </button>
            );
          })}
        </div>
      </div>
    ))}
  </div>

  {selectedLocations.length === 0 && (
    <p className="print-location-message">
      Select at least one location. Pricing currently
      assumes one print location.
    </p>
  )}
</div>

            {service === "screenPrint" && (
              <label>
                Number of Ink Colors

                <select
                  value={colors}
                  onChange={(event) =>
                    setColors(Number(event.target.value))
                  }
                >
                  <option value="1">1 color</option>
                  <option value="2">2 colors</option>
                  <option value="3">3 colors</option>
                  <option value="4">4 colors</option>
                </select>
              </label>
            )}

            <label className="quote-checkbox">
              <input
                type="checkbox"
                checked={rushOrder}
                onChange={(event) =>
                  setRushOrder(event.target.checked)
                }
              />

              Rush order — adds 25%
            </label>
          </div>

          <div className="quote-result">
  <div className="project-summary-header">
    <div>
      <span className="project-summary-eyebrow">
        Your Project
      </span>

      <h3 className="project-summary-title">
        Order Summary
      </h3>
    </div>

    <span className="project-summary-status">
      Live Estimate
    </span>
  </div>

  <div className="project-summary">
    <div className="project-summary-row">
      <span>Printing Method</span>
      <strong>{selectedServiceLabel}</strong>
    </div>

    <div className="project-summary-row">
      <span>Garment</span>
      <strong>{selectedGarmentLabel}</strong>
    </div>

    <div className="project-summary-row">
      <span>Quantity</span>
      <strong>{safeQuantity} pieces</strong>
    </div>

    <div className="project-summary-row">
      <span>Print Size</span>
      <strong>{selectedPrintSizeLabel}</strong>
    </div>

    {service === "screenPrint" && (
      <div className="project-summary-row">
        <span>Ink Colors</span>
        <strong>
          {colors} {colors === 1 ? "color" : "colors"}
        </strong>
      </div>
    )}

    <div className="project-summary-row">
      <span>Turnaround</span>
      <strong>
        {rushOrder ? "Rush Order" : "Standard"}
      </strong>
    </div>
  </div>

  <div className="selected-location-summary">
    <div className="selected-location-header">
      <span>Print Locations</span>

      <strong>
        {selectedLocations.length}
      </strong>
    </div>

    <div className="selected-location-list">
      {locationSummary.map((location) => (
        <span
          key={location}
          className={`selected-location-chip ${
            selectedLocations.length === 0
              ? "empty"
              : ""
          }`}
        >
          {selectedLocations.length > 0 && (
            <span
              className="selected-location-dot"
              aria-hidden="true"
            />
          )}

          {location}
        </span>
      ))}
    </div>
  </div>

  {selectedLocations.length === 0 && (
    <div className="project-summary-warning">
      Select at least one print location before
      requesting your final quote.
    </div>
  )}

  <div className="estimate-total">
    <span>Estimated Project Total</span>

    <strong>
      ${estimate.total.toFixed(2)}
    </strong>

    <p>
      Approximately $
      {estimate.pricePerShirt.toFixed(2)} per piece
    </p>
  </div>

  <div className="quote-breakdown">
    <p>
      Garment cost per piece
      <strong>
        ${estimate.garmentCost.toFixed(2)}
      </strong>
    </p>

    <p>
      Printing cost per piece
      <strong>
        ${estimate.decorationCost.toFixed(2)}
      </strong>
    </p>

    <p>
      Setup fee
      <strong>
        ${estimate.setupFee.toFixed(2)}
      </strong>
    </p>

    {rushOrder && (
      <p>
        Rush fee
        <strong>
          ${estimate.rushFee.toFixed(2)}
        </strong>
      </p>
    )}
  </div>

  <a
    className={`quote-button ${
      selectedLocations.length === 0
        ? "disabled"
        : ""
    }`}
    href={
      selectedLocations.length > 0
        ? "#contact"
        : undefined
    }
    aria-disabled={
      selectedLocations.length === 0
    }
    onClick={(event) => {
      if (selectedLocations.length === 0) {
        event.preventDefault();
      }
    }}
  >
    Request Final Quote
  </a>

  <small>
    This is a preliminary estimate. Final pricing may
    change based on garment brand, artwork condition,
    print complexity, specialty materials, taxes,
    shipping, and turnaround requirements.
  </small>
</div>
        </div>
      </div>
    </section>
  );
}

export default QuoteCalculator;