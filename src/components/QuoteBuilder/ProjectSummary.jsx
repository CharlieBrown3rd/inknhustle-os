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
      Project Review
    </span>

    <h3 className="project-summary-title">
      Your Project Summary
    </h3>

    <p className="project-summary-description">
      Review your selections before submitting your
      project request.
    </p>
  </div>

  <span className="project-summary-status">
    Live Estimate
  </span>
</div>

      <div className="project-summary">
        <div className="project-summary-row">
  <div className="summary-label">
    🎨 Decoration Method
  </div>

  <strong>{selectedServiceLabel}</strong>
</div>

        <div className="project-summary-row">
  <div className="summary-label">
    👕 Garment Style
  </div>

  <strong>{selectedGarmentLabel}</strong>
</div>

        <div className="project-summary-row">
  <div className="summary-label">
   📦 Order Quantity
  </div>

  <strong>
  {displayQuantity.toLocaleString()} Pieces
</strong>
</div>
        <div className="project-summary-row">
  <div className="summary-label">
   📐 Decoration Size
  </div>

  <strong>{selectedPrintSizeLabel}</strong>
</div>

        {service === "screenPrint" && (
         <div className="project-summary-row">
  <div className="summary-label">
    🎨 Ink Colors
  </div>

  <strong>
  {colors} {colors === 1 ? "Color" : "Colors"}
</strong>
</div>
        )}

        <div className="project-summary-row">
  <div className="summary-label">
    ⚡ Turnaround
  </div>

 <strong>
  {rushOrder ? "Rush Order" : "Standard"}
</strong>
</div>
      </div>

      <div className="selected-location-summary">
        <div className="selected-location-header">
          <span>Decoration Locations</span>

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
  Complete your decoration locations to unlock
  project submission.
</div>
      )}
<div className="estimate-total">
  <span>PROJECT TOTAL</span>

  <strong>${estimate.total.toFixed(2)}</strong>

  <p>
    ${estimate.pricePerShirt.toFixed(2)} per garment
  </p>
</div>

      <div className="quote-breakdown">
  <div className="quote-breakdown-row">
    <span>Garments</span>

    <strong>
      ${estimate.garmentCost.toFixed(2)}
    </strong>
  </div>

  <div className="quote-breakdown-row">
    <span>Decoration</span>

    <strong>
      ${estimate.decorationCost.toFixed(2)}
    </strong>
  </div>

  <div className="quote-breakdown-row">
    <span>Setup</span>

    <strong>
      ${estimate.setupFee.toFixed(2)}
    </strong>
  </div>

  {rushOrder && (
    <div className="quote-breakdown-row">
      <span>Rush</span>

      <strong>
        ${estimate.rushFee.toFixed(2)}
      </strong>
    </div>
  )}

  <div className="quote-breakdown-total">
    <span>Total</span>

    <strong>
      ${estimate.total.toFixed(2)}
    </strong>
  </div>
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
        Review & Submit Project →
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