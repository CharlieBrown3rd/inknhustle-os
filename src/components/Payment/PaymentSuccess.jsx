import "./PaymentSuccess.css";

function PaymentSuccess() {
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

        <a
          className="payment-success-link"
          href="/"
        >
          Return to InknHustle
        </a>
      </div>
    </section>
  );
}

export default PaymentSuccess;