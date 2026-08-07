function FinalProjectReview({
  customerInfo,
  selectedServiceLabel,
  selectedGarmentLabel,
  displayQuantity,
  selectedPrintSizeLabel,
  selectedLocations,
  estimate,
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
    </section>
  );
}

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

export default FinalProjectReview;