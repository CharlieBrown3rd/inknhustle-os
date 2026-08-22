import "./QuoteApproval.css";


function QuoteApproval({
  projectReference,
  customerName,
  officialQuoteTotal,
  quoteNotes,
  approvalStatus,
  approvalToken,
  onApprove,
  onRequestChanges,
}) {
  // ======================================================
  // DERIVED DISPLAY VALUES
  // ======================================================

  const formattedQuoteTotal =
    officialQuoteTotal != null
      ? `$${Number(officialQuoteTotal).toFixed(2)}`
      : "Pending";


  // ======================================================
  // RENDER
  // ======================================================

  return (
    <section className="quote-approval">
      <div className="quote-approval-card">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="quote-approval-header">
          <span className="quote-approval-eyebrow">
            OFFICIAL PROJECT QUOTE
          </span>

          <h1>Review Your Quote</h1>

          <p>
            Hello {customerName || "Customer"}, please review your official
            InknHustle project quote below.
          </p>
        </header>


        {/* =================================================
            PROJECT SUMMARY
        ================================================= */}

        <div className="quote-approval-summary">
          <div>
            <span>Project Reference</span>
            <strong>{projectReference || "Pending"}</strong>
          </div>

          <div>
            <span>Official Total</span>
            <strong>{formattedQuoteTotal}</strong>
          </div>
        </div>


        {/* =================================================
            QUOTE NOTES
        ================================================= */}

        <div className="quote-approval-notes">
          <span>Quote Notes</span>

          <p>
            {quoteNotes || "No additional quote notes were provided."}
          </p>
        </div>


        {/* =================================================
            APPROVAL ACTIONS
        ================================================= */}

        {approvalStatus === "pending" && (
  <div className="quote-approval-actions">
    <button
      type="button"
      className="quote-approval-approve"
      onClick={onApprove}
    >
      Approve Quote
    </button>

    <button
      type="button"
      className="quote-approval-request-changes"
      onClick={onRequestChanges}
    >
      Request Changes
    </button>
  </div>
)}


        {/* =================================================
            STATUS
        ================================================= */}

       {approvalStatus && (
  <div className="quote-approval-status">
    Current Response:{" "}
    <strong>
      {approvalStatus === "changes_requested"
        ? "Changes Requested"
        : approvalStatus.charAt(0).toUpperCase() +
          approvalStatus.slice(1)}
    </strong>
  </div>
)}

{approvalStatus === "approved" && approvalToken && (
  <a
    className="quote-approval-status-link"
    href={`/project-status?token=${approvalToken}`}
  >
    View Project Status
  </a>
)}

      </div>
    </section>
  );
}

export default QuoteApproval;