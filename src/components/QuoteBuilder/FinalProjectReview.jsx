function FinalProjectReview({
  customerInfo,
  selectedServiceLabel,
  selectedGarmentLabel,
  displayQuantity,
  selectedPrintSizeLabel,
  selectedLocations,
  estimate,
  projectReady,
  onSubmit,
}) {
  return (
    <section className="final-project-review">
      <div className="final-project-review-header">
        <span>Final Review</span>

        <h3>Review & Submit Your Project</h3>

        <p>
          Confirm your project details before sending your request.
        </p>
      </div>

      <div className="final-review-section">
        <h4>Customer</h4>

        <div className="final-review-grid">
          <div>
            <span>Name</span>
            <strong>
              {customerInfo.fullName || "Not provided"}
            </strong>
          </div>

          <div>
            <span>Email</span>
            <strong>
              {customerInfo.email || "Not provided"}
            </strong>
          </div>

          <div>
            <span>Phone</span>
            <strong>
              {customerInfo.phone || "Not provided"}
            </strong>
          </div>

          <div>
            <span>Preferred Contact</span>
            <strong>
              {customerInfo.contactMethod || "Email"}
            </strong>
          </div>
        </div>
      </div>

      <div className="final-review-section">
        <h4>Project Details</h4>

        <div className="final-review-grid">
          <div>
            <span>Decoration Method</span>
            <strong>{selectedServiceLabel}</strong>
          </div>

          <div>
            <span>Garment Style</span>
            <strong>{selectedGarmentLabel}</strong>
          </div>

          <div>
            <span>Order Quantity</span>
            <strong>
              {displayQuantity.toLocaleString()} Pieces
            </strong>
          </div>

          <div>
            <span>Decoration Size</span>
            <strong>{selectedPrintSizeLabel}</strong>
          </div>
        </div>
      </div>

      <div className="final-review-section">
        <h4>Decoration Locations</h4>

        <div className="final-review-location-list">
          {selectedLocations.length > 0 ? (
            selectedLocations.map((location) => (
              <span key={location}>
                {location}
              </span>
            ))
          ) : (
            <span className="final-review-empty">
              No decoration locations selected
            </span>
          )}
        </div>
      </div>

      <div className="final-review-total">
        <span>Estimated Project Total</span>

        <strong>
          ${estimate.total.toFixed(2)}
        </strong>

        <p>
          ${estimate.pricePerShirt.toFixed(2)} per garment
        </p>
      </div>

      <button
        type="button"
        className={`final-submit-button ${
          projectReady ? "" : "disabled"
        }`}
        disabled={!projectReady}
        onClick={onSubmit}
      >
        Submit Project
      </button>

      {!projectReady && (
        <p className="final-submit-message">
          Complete the required customer information and select
          at least one decoration location to submit your project.
        </p>
      )}
    </section>
  );
}

export default FinalProjectReview;