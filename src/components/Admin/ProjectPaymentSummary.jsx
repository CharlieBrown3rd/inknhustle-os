function ProjectPaymentSummary({
  project,
  onSendPaymentEmail,
  sendingPaymentEmail,
}) {
  const balanceDue = Number(project?.balance_due || 0);
  const amountPaid = Number(project?.amount_paid || 0);
  const depositAmount = Number(project?.deposit_amount || 0);

  return (
    <div className="admin-project-official-quote">
      <span>Project Payment</span>

      <div className="admin-project-detail-grid">
        <div>
          <span>Deposit Status</span>
          <strong>
            {project.deposit_status === "deposit_paid"
              ? "Paid"
              : project.deposit_status === "deposit_pending"
              ? "Pending"
              : project.deposit_status || "Not recorded"}
          </strong>
        </div>

        <div>
          <span>Deposit Rate</span>
          <strong>
            {project.deposit_percentage != null
              ? `${Number(project.deposit_percentage)}%`
              : "Not recorded"}
          </strong>
        </div>

        {[
          ["Deposit Amount", "deposit_amount"],
          ["Amount Paid", "amount_paid"],
          ["Balance Due", "balance_due"],
        ].map(([label, field]) => (
          <div key={field}>
            <span>{label}</span>
            <strong>
              {project[field] != null &&
              project[field] !== "" &&
              Number.isFinite(Number(project[field]))
                ? `$${Number(project[field]).toFixed(2)}`
                : "Not recorded"}
            </strong>
          </div>
        ))}
      </div>

      {project.approval_token ? (
        <>
          <a
            className="admin-project-payment-link"
            href={`/payment?token=${encodeURIComponent(
              project.approval_token
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Customer Payment Page
          </a>

          <button
            type="button"
            className="admin-project-action admin-project-payment-email"
            onClick={onSendPaymentEmail}
            disabled={sendingPaymentEmail || balanceDue <= 0}
          >
            {sendingPaymentEmail
              ? "Sending..."
              : balanceDue <= 0
              ? "Payment Complete"
              : amountPaid >= depositAmount && depositAmount > 0
              ? "Send Balance Payment Link"
              : "Send Payment Link"}
          </button>
        </>
      ) : (
        <p>No customer payment token is available for this project.</p>
      )}

      {project.customer_approval_status !== "approved" && (
        <p>Customer approval is required before deposit payment.</p>
      )}
    </div>
  );
}

export default ProjectPaymentSummary;