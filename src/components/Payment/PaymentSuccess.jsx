import "./PaymentSuccess.css";

function PaymentSuccess() {
  const paymentToken =
    sessionStorage.getItem(
      "inknhustle_payment_token"
    );

  const paymentDetailsHref =
    paymentToken
      ? `/payment?token=${encodeURIComponent(
          paymentToken
        )}`
      : null;

  const projectStatusHref =
    paymentToken
      ? `/project-status?token=${encodeURIComponent(
          paymentToken
        )}`
      : null;

  return (
    <section className="payment-success-page">
      <div className="payment-success-card">
        <span className="payment-success-eyebrow">
          PAYMENT CONFIRMED
        </span>

        <h1>Deposit Received</h1>

        <p>
          Your project deposit has been successfully
          processed.
        </p>

        <p>
          InknHustle will continue preparing your
          project for production.
        </p>

        <div className="payment-success-actions">
          {paymentDetailsHref && (
            <a
              className="payment-success-link"
              href={paymentDetailsHref}
            >
              View Payment Details
            </a>
          )}

          {projectStatusHref && (
            <a
              className="payment-success-secondary-link"
              href={projectStatusHref}
            >
              View Project Status
            </a>
          )}

          <a
            className="payment-success-home-link"
            href="/"
          >
            Return to InknHustle
          </a>
        </div>
      </div>
    </section>
  );
}

export default PaymentSuccess;