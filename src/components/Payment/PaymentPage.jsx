import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import "./PaymentPage.css";

function PaymentPage() {
  const token =
    new URLSearchParams(
      window.location.search
    ).get("token");

  const [paymentDetails, setPaymentDetails] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [paymentLoading, setPaymentLoading] =
    useState(false);

useEffect(() => {
  const loadPaymentDetails = async () => {
    if (!token) {
      setErrorMessage(
        "This payment link is missing its project token."
      );
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.rpc(
      "get_quote_by_token",
      {
        p_token: token,
      }
    );

    if (error) {
      console.error("Failed to load payment details:");
      console.error("code:", error.code);
      console.error("message:", error.message);
      console.error("details:", error.details);
      console.error("hint:", error.hint);
      console.error("status:", error.status);

      setErrorMessage(
        "We could not load the payment details for this project."
      );
      setLoading(false);
      return;
    }

    if (!data || data.length === 0) {
      setErrorMessage(
        "This payment link is invalid or unavailable."
      );
      setLoading(false);
      return;
    }

    const project = data[0];

    if (
      project.customer_approval_status !==
      "approved"
    ) {
      setErrorMessage(
        "This project must be approved before payment can be submitted."
      );
      setLoading(false);
      return;
    }

    setPaymentDetails(project);

sessionStorage.setItem(
  "inknhustle_payment_token",
  token
);

setLoading(false);
  };

  loadPaymentDetails();
}, [token]);

const handlePayDeposit = async () => {
  if (!token || paymentLoading) {
    return;
  }


  setPaymentLoading(true);

  try {
    const { data, error } =
      await supabase.functions.invoke(
        "create-deposit-checkout",
        {
          body: { token },
        }
      );

    if (error) {
      console.error(
        "Failed to create deposit checkout:",
        error
      );

      alert(
        "We could not open the secure payment page. Please try again."
      );

      return;
    }

    if (!data?.checkoutUrl) {
      console.error(
        "Checkout URL was not returned:",
        data
      );

      alert(
        "We could not open the secure payment page. Please try again."
      );

      return;
    }
sessionStorage.setItem(
  "inknhustle_payment_token",
  token
);

    window.location.assign(data.checkoutUrl);
  } catch (error) {
    console.error(
      "Deposit checkout failed:",
      error
    );

    alert(
      "We could not open the secure payment page. Please try again."
    );
  } finally {
    setPaymentLoading(false);
  }
};
  const handlePayBalance = async () => {
  if (!token || paymentLoading) {
    return;
  }

  setPaymentLoading(true);

  try {
    const { data, error } =
      await supabase.functions.invoke(
        "create-balance-checkout",
        {
          body: { token },
        }
      );

    if (error) {
      console.error(
        "Failed to create balance checkout:",
        error
      );

      alert(
        "We could not open the secure balance payment page. Please try again."
      );

      return;
    }

    if (!data?.checkoutUrl) {
      console.error(
        "Balance checkout URL was not returned:",
        data
      );

      alert(
        "We could not open the secure balance payment page. Please try again."
      );

      return;
    }

    sessionStorage.setItem(
      "inknhustle_payment_token",
      token
    );

    window.location.assign(data.checkoutUrl);
  } catch (error) {
    console.error(
      "Balance checkout failed:",
      error
    );

    alert(
      "We could not open the secure balance payment page. Please try again."
    );
  } finally {
    setPaymentLoading(false);
  }
};


 if (loading) {
  return (
    <main className="payment-page">
      <section className="payment-page-card">
        <p className="payment-page-status">
          Loading payment details...
        </p>
      </section>
    </main>
  );
}

if (errorMessage) {
  return (
    <main className="payment-page">
      <section className="payment-page-card">
        <p className="payment-page-eyebrow">
          PAYMENT
        </p>

        <h1>Payment Unavailable</h1>

        <p className="payment-page-message">
          {errorMessage}
        </p>

        <a
          className="payment-page-return"
          href="/"
        >
          Return to InknHustle
        </a>
      </section>
    </main>
  );
}

return (
  <main className="payment-page">
    <section className="payment-page-card">
      <p className="payment-page-eyebrow">
        SECURE PROJECT PAYMENT
      </p>

      <h1>Project Payment</h1>

      <p className="payment-page-intro">
        Review your project payment details below.
      </p>

      <div className="payment-page-summary">
        <div>
          <span>Project Reference</span>
          <strong>
            {paymentDetails.reference}
          </strong>
        </div>

        <div>
          <span>Official Total</span>
          <strong>
            $
            {Number(
              paymentDetails.official_quote_total
            ).toFixed(2)}
          </strong>
        </div>

        <div>
          <span>Deposit Rate</span>
          <strong>
            {Number(
              paymentDetails.deposit_percentage
            ).toFixed(0)}
            %
          </strong>
        </div>

        <div>
          <span>Deposit Amount</span>
          <strong>
            $
            {Number(
              paymentDetails.deposit_amount
            ).toFixed(2)}
          </strong>
        </div>

        <div>
          <span>Amount Paid</span>
          <strong>
            $
            {Number(
              paymentDetails.amount_paid || 0
            ).toFixed(2)}
          </strong>
        </div>

        <div>
          <span>Balance Due</span>
          <strong>
            $
            {Number(
              paymentDetails.balance_due
            ).toFixed(2)}
          </strong>
        </div>
      </div>

      <div className="payment-page-deposit-status">
        Deposit Status:{" "}
        <strong>
          {paymentDetails.deposit_status ===
          "deposit_paid"
            ? "Paid"
            : "Pending"}
        </strong>
      </div>

      {paymentDetails.deposit_status !== "deposit_paid" &&
  Number(paymentDetails.deposit_amount) > 0 &&
  Number(paymentDetails.amount_paid || 0) <
    Number(paymentDetails.deposit_amount) && (
    <button
      type="button"
      className="payment-page-pay-button"
      onClick={handlePayDeposit}
      disabled={paymentLoading}
    >
      {paymentLoading
        ? "Opening Secure Checkout..."
        : `Pay $${Number(
            paymentDetails.deposit_amount
          ).toFixed(2)} Deposit`}
    </button>
  )}

{paymentDetails.deposit_status === "deposit_paid" &&
  paymentDetails.status === "production" &&
  Number(paymentDetails.balance_due) > 0 && (
    <button
      type="button"
      className="payment-page-pay-button"
      onClick={handlePayBalance}
      disabled={paymentLoading}
    >
      {paymentLoading
        ? "Opening Secure Checkout..."
        : `Pay $${Number(
            paymentDetails.balance_due
          ).toFixed(2)} Remaining Balance`}
    </button>
  )}

{Number(paymentDetails.balance_due) <= 0 && (
  <div className="payment-page-deposit-status">
    <strong>Paid in Full</strong>
  </div>
)}
    </section>
  </main>
);
}

export default PaymentPage;