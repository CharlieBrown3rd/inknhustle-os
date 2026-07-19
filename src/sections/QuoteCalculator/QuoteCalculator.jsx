import { useMemo, useState } from "react";
import "./QuoteCalculator.css";

const serviceRates = {
  screenPrint: {
    label: "Screen Printing",
    baseRate: 8,
  },
  dtf: {
    label: "DTF Printing",
    baseRate: 10,
  },
  htv: {
    label: "Heat Transfer Vinyl",
    baseRate: 12,
  },
};

function QuoteCalculator() {
  const [service, setService] = useState("screenPrint");
  const [quantity, setQuantity] = useState(12);
  const [printLocations, setPrintLocations] = useState(1);
  const [colors, setColors] = useState(1);

  const estimate = useMemo(() => {
    const safeQuantity = Math.max(Number(quantity) || 1, 1);
    const selectedService = serviceRates[service];

    let pricePerShirt = selectedService.baseRate;

    if (service === "screenPrint") {
      pricePerShirt += Math.max(colors - 1, 0) * 1.5;
    }

    pricePerShirt += Math.max(printLocations - 1, 0) * 4;

    if (safeQuantity >= 24) {
      pricePerShirt *= 0.92;
    }

    if (safeQuantity >= 48) {
      pricePerShirt *= 0.88;
    }

    if (safeQuantity >= 100) {
      pricePerShirt *= 0.82;
    }

    const setupFee = service === "screenPrint" ? colors * 20 : 15;
    const subtotal = safeQuantity * pricePerShirt;
    const total = subtotal + setupFee;

    return {
      pricePerShirt,
      setupFee,
      total,
    };
  }, [service, quantity, printLocations, colors]);

  return (
    <section className="quote-calculator" id="quote">
      <div className="quote-calculator-container">
        <div className="quote-heading">
          <span className="quote-eyebrow">INSTANT ESTIMATE</span>
          <h2>Build Your Quote</h2>
          <p>
            Select your printing options to receive a preliminary project
            estimate.
          </p>
        </div>

        <div className="quote-layout">
          <div className="quote-form">
            <label>
              Printing Method
              <select
                value={service}
                onChange={(event) => setService(event.target.value)}
              >
                <option value="screenPrint">Screen Printing</option>
                <option value="dtf">DTF Printing</option>
                <option value="htv">Heat Transfer Vinyl</option>
              </select>
            </label>

            <label>
              Quantity
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </label>

            <label>
              Print Locations
              <select
                value={printLocations}
                onChange={(event) =>
                  setPrintLocations(Number(event.target.value))
                }
              >
                <option value="1">One location</option>
                <option value="2">Two locations</option>
                <option value="3">Three locations</option>
              </select>
            </label>

            {service === "screenPrint" && (
              <label>
                Number of Ink Colors
                <select
                  value={colors}
                  onChange={(event) => setColors(Number(event.target.value))}
                >
                  <option value="1">1 color</option>
                  <option value="2">2 colors</option>
                  <option value="3">3 colors</option>
                  <option value="4">4 colors</option>
                </select>
              </label>
            )}
          </div>

          <div className="quote-result">
            <span>Estimated Project Total</span>

            <h3>${estimate.total.toFixed(2)}</h3>

            <div className="quote-breakdown">
              <p>
                Estimated price per shirt:
                <strong>${estimate.pricePerShirt.toFixed(2)}</strong>
              </p>

              <p>
                Estimated setup fee:
                <strong>${estimate.setupFee.toFixed(2)}</strong>
              </p>

              <p>
                Quantity:
                <strong>{quantity || 1}</strong>
              </p>
            </div>

            <a className="quote-button" href="#contact">
              Request Final Quote
            </a>

            <small>
              This estimate does not include garment costs, taxes, rush fees,
              specialty materials, artwork preparation, or shipping.
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuoteCalculator;