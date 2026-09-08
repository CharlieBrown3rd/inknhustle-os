import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const paymentToken =
    sessionStorage.getItem(
      "inknhustle_payment_token"
    );

  const [paymentDetails, setPaymentDetails] =
    useState(null);

  useEffect(() => {
    const loadPaymentDetails = async () => {
      if (!paymentToken) {
        return;
      }

      const { data, error } = await supabase.rpc(
        "get_quote_by_token",
        {
          p_token: paymentToken,
        }
      );

      if (error) {
        console.error(
          "Failed to confirm payment details:",
          error
        );
        return;
      }

      if (data && data.length > 0) {
        setPaymentDetails(data[0]);
      }
    };

    loadPaymentDetails();
  }, [paymentToken]);

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

  const paidInFull =
    paymentDetails &&
    Number(paymentDetails.balance_due) <= 0;

  const depositPaid =
    paymentDetails?.deposit_status ===
    "deposit_paid";

  let heading = "Payment Received";

  let primaryMessage =
    "Your project payment has been successfully processed.";

  let secondaryMessage =
    "Thank you for choosing InknHustle.";

  if (paidInFull) {
    heading = "Payment Complete";

    primaryMessage =
      "Your remaining project balance has been successfully processed.";

    secondaryMessage =
      "Your project is now paid in full. Thank you for choosing InknHustle.";
  } else if (depositPaid) {
    heading = "Deposit Received";

    primaryMessage =
      "Your project deposit has been successfully processed.";

    secondaryMessage =
      "InknHustle will continue preparing your project for production.";
  }

  return (
    <section className="payment-success-page">
      <div className="payment-success-card">
        <span className="payment-success-eyebrow">
          PAYMENT CONFIRMED
        </span>

        <h1>{heading}</h1>

        <p>{primaryMessage}</p>

        <p>{secondaryMessage}</p>

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