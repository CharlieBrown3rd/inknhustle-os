function ProjectSummary({
  selectedServiceLabel,
  selectedGarmentLabel,
  displayQuantity,
  selectedPrintSizeLabel,
  service,
  colors,
  rushOrder,
  selectedLocations,
  estimate,
}) {
  const locationSummary =
    selectedLocations.length > 0
      ? selectedLocations
      : ["No location selected"];

  const locationsSelected =
    selectedLocations.length > 0;

  return (
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
          <strong>{displayQuantity} pieces</strong>
        </div>

        <div className="project-summary-row">
          <span>Print Size</span>
          <strong>{selectedPrintSizeLabel}</strong>
        </div>

        {service === "screenPrint" && (
          <div className="project-summary-row">
            <span>Ink Colors</span>

            <strong>
              {colors}{" "}
              {colors === 1 ? "color" : "colors"}
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

          <strong>{selectedLocations.length}</strong>
        </div>

        <div className="selected-location-list">
          {locationSummary.map((location) => (
            <span
              key={location}
              className={`selected-location-chip ${
                locationsSelected ? "" : "empty"
              }`}
            >
              {locationsSelected && (
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

      {!locationsSelected && (
        <div className="project-summary-warning">
          Select at least one print location before
          requesting your final quote.
        </div>
      )}

      <div className="estimate-total">
        <span>Estimated Project Total</span>

        <strong>${estimate.total.toFixed(2)}</strong>

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
          locationsSelected ? "" : "disabled"
        }`}
        href={locationsSelected ? "#contact" : undefined}
        aria-disabled={!locationsSelected}
        onClick={(event) => {
          if (!locationsSelected) {
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
  );
}

export default ProjectSummary;