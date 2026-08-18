function SubmissionConfirmation({
  projectReference,
  estimatedTotal,
  customerName,
  customerEmail,
  artworkUploaded,
  onStartAnotherProject,
}) {
  return (
    <section className="submission-confirmation">
      <div className="submission-confirmation-card">

        <div className="submission-confirmation-header">
          <span className="submission-confirmation-eyebrow">
            PROJECT RECEIVED
          </span>

          <div className="submission-confirmation-icon">
            ✓
          </div>

          <h2>Project Submitted</h2>

          <p>
            Thank you, {customerName || "Customer"}. Your project has been
            received and is now in our review queue.
          </p>
        </div>

        <div className="submission-confirmation-summary">
          <h3>Project Summary</h3>

          <div className="submission-confirmation-summary-grid">

            <div className="submission-confirmation-summary-item">
              <span>Project Reference</span>
              <strong>
                {projectReference || "Pending"}
              </strong>
            </div>

            <div className="submission-confirmation-summary-item">
              <span>Estimated Total</span>
              <strong>
                {estimatedTotal != null
                  ? `$${Number(estimatedTotal).toFixed(2)}`
                  : "Pending"}
              </strong>
            </div>

            <div className="submission-confirmation-summary-item">
              <span>Email</span>
              <strong>
                {customerEmail || "Not provided"}
              </strong>
            </div>

            <div className="submission-confirmation-summary-item">
              <span>Artwork</span>

              <strong
                className={
                  artworkUploaded
                    ? "submission-confirmation-status success"
                    : "submission-confirmation-status pending"
                }
              >
                {artworkUploaded ? "Received" : "Not uploaded"}
              </strong>
            </div>

          </div>
        </div>

        <div className="submission-confirmation-next-steps">
          <div className="submission-confirmation-next-heading">
            <span>WHAT HAPPENS NEXT</span>
            <h3>Your Project Is Under Review</h3>
          </div>

          <div className="submission-confirmation-step">
            <span className="submission-confirmation-step-number">
              01
            </span>

            <div>
              <strong>Project Review</strong>
              <p>
                We will review your garment selection, quantity, decoration
                requirements, artwork, and requested production date.
              </p>
            </div>
          </div>

          <div className="submission-confirmation-step">
            <span className="submission-confirmation-step-number">
              02
            </span>

            <div>
              <strong>Official Quote</strong>
              <p>
                Your current estimate is not the final production price. An
                official quote will be prepared after your project has been
                reviewed.
              </p>
            </div>
          </div>

          <div className="submission-confirmation-step">
            <span className="submission-confirmation-step-number">
              03
            </span>

            <div>
              <strong>Approval & Production</strong>
              <p>
                Once your official quote is approved, your project can move
                into the production workflow.
              </p>
            </div>
          </div>
        </div>

        <div className="submission-confirmation-footer">
          <p>
            Keep your project reference number handy if you need to contact
            InknHustle about this request.
          </p>

          <button
            type="button"
            className="submission-confirmation-new-project"
            onClick={onStartAnotherProject}
          >
            Start Another Project
          </button>
        </div>

      </div>
    </section>
  );
}

export default SubmissionConfirmation;