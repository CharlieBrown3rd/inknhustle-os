import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import QuoteApproval from "./QuoteApproval";

function QuoteApprovalPage() {
  // ======================================================
  // STATE
  // ======================================================

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");


  // ======================================================
  // LOAD QUOTE
  // ======================================================

  useEffect(() => {
    const loadQuote = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setErrorMessage("This quote link is missing its approval token.");
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
        console.error("Failed to load quote:", error);
        setErrorMessage("We could not load this quote.");
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        setErrorMessage(
          "This quote link is invalid, expired, or not available."
        );
        setLoading(false);
        return;
      }

      setQuote(data[0]);
      setLoading(false);
    };

    loadQuote();
  }, []);


  // ======================================================
  // LOADING STATE
  // ======================================================

  if (loading) {
    return (
      <section className="quote-approval">
        <div className="quote-approval-card">
          <p>Loading your quote...</p>
        </div>
      </section>
    );
  }


  // ======================================================
  // ERROR STATE
  // ======================================================

  if (errorMessage) {
    return (
      <section className="quote-approval">
        <div className="quote-approval-card">
          <h1>Quote Unavailable</h1>
          <p>{errorMessage}</p>
        </div>
      </section>
    );
  }


  // ======================================================
  // TEMPORARY ACTIONS
  // ======================================================

  const handleApprove = async () => {
  if (!quote) return;

  const confirmed = window.confirm(
    `Approve this official quote for $${Number(
      quote.official_quote_total
    ).toFixed(2)}?\n\n` +
      "Once approved, InknHustle can move your project toward production."
  );

  if (!confirmed) return;

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (!token) {
    window.alert("This quote link is missing its approval token.");
    return;
  }

  const { data, error } = await supabase.rpc(
    "respond_to_quote",
    {
      p_token: token,
      p_response: "approved",
    }
  );

  if (error) {
    console.error("Failed to approve quote:", error);

    window.alert(
      "We could not approve your quote. Please try again."
    );

    return;
  }

  if (!data || data.length === 0) {
    window.alert(
      "This quote could not be approved. It may already have been responded to or is no longer available."
    );

    return;
  }

  const response = data[0];

  setQuote((currentQuote) => ({
    ...currentQuote,
    customer_approval_status:
      response.customer_approval_status,
    approved_at: response.approved_at,
  }));

  window.alert(
    "Your quote has been approved successfully."
  );
};

  const handleRequestChanges = async () => {
  if (!quote) return;

  const confirmed = window.confirm(
    "Request changes to this quote?\n\n" +
      "This will return your project to review so InknHustle can prepare a revised quote."
  );

  if (!confirmed) return;

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (!token) {
    window.alert("This quote link is missing its approval token.");
    return;
  }

  const { data, error } = await supabase.rpc(
    "respond_to_quote",
    {
      p_token: token,
      p_response: "changes_requested",
    }
  );

  if (error) {
    console.error("Failed to request quote changes:", error);

    window.alert(
      "We could not submit your change request. Please try again."
    );

    return;
  }

  if (!data || data.length === 0) {
    window.alert(
      "This quote could not be updated. It may already have been responded to or is no longer available."
    );

    return;
  }

  const response = data[0];

  setQuote((currentQuote) => ({
    ...currentQuote,
    customer_approval_status:
      response.customer_approval_status,
    approved_at: response.approved_at,
  }));

  window.alert(
    "Your request for changes has been submitted."
  );
};

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <QuoteApproval
      projectReference={quote.reference}
      customerName={quote.customer_name}
      officialQuoteTotal={quote.official_quote_total}
      quoteNotes={quote.quote_notes}
      approvalStatus={quote.customer_approval_status}
      onApprove={handleApprove}
      onRequestChanges={handleRequestChanges}
    />
  );
}

export default QuoteApprovalPage;