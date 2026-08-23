
import "./PaymentCancelled.css";

function PaymentCancelled() {
  return (
    <section className="payment-cancelled-page">
      <div className="payment-cancelled-card">
        <span className="payment-cancelled-eyebrow">
          PAYMENT NOT COMPLETED
        </span>

        <h1>Deposit Not Submitted</h1>

        <p>
          Your payment was cancelled and no deposit
          was processed.
        </p>

        <p>
          Your project quote is still available when
          you are ready to continue.
        </p>

        <a
          className="payment-cancelled-link"
          href="/"
        >
          Return to InknHustle
        </a>
      </div>
    </section>
  );
}

export default PaymentCancelled;