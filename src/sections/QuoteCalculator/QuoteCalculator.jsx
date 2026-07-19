import { useMemo, useState } from "react";
import "./QuoteCalculator.css";

const serviceRates = {
  screenPrint: {
    label: "Screen Printing",
    decorationRate: 5,
    setupFee: 20,
  },
  dtf: {
    label: "DTF Printing",
    decorationRate: 7,
    setupFee: 15,
  },
  htv: {
    label: "Heat Transfer Vinyl",
    decorationRate: 9,
    setupFee: 15,
  },
};

const garmentRates = {
  tshirt: {
    label: "Standard T-Shirt",
    price: 4.5,
  },
  premiumTshirt: {
    label: "Premium Soft T-Shirt",
    price: 7,
  },
  longSleeve: {
    label: "Long-Sleeve Shirt",
    price: 8,
  },
  hoodie: {
    label: "Pullover Hoodie",
    price: 18,
  },
  polo: {
    label: "Polo Shirt",
    price: 13,
  },
};

const printSizeRates = {
  small: {
    label: "Small / Left Chest",
    price: 0,
  },
  standard: {
    label: "Standard Front",
    price: 2,
  },
  large: {
    label: "Large Front or Back",
    price: 4,
  },
  oversized: {
    label: "Oversized Print",
    price: 6,
  },
};

function QuoteCalculator() {
  const [service, setService] = useState("screenPrint");
  const [quantity, setQuantity] = useState(12);
  const [garment, setGarment] = useState("tshirt");
  const [customerSupplied, setCustomerSupplied] = useState(false);
  const [printSize, setPrintSize] = useState("standard");
  const [printLocations, setPrintLocations] = useState(1);
  const [colors, setColors] = useState(1);
  const [rushOrder, setRushOrder] = useState(false);

  const estimate = useMemo(() => {
    const safeQuantity = Math.max(Number(quantity) || 1, 1);
    const selectedService = serviceRates[service];
    const selectedGarment = garmentRates[garment];
    const selectedPrintSize = printSizeRates[printSize];

    const garmentCost = customerSupplied ? 0 : selectedGarment.price;

    let decorationCost =
      selectedService.decorationRate + selectedPrintSize.price;

    if (service === "screenPrint") {
      decorationCost += Math.max(colors - 1, 0) * 1.5;
    }

    decorationCost += Math.max(printLocations - 1, 0) * 4;

    let quantityDiscount = 1;

    if (safeQuantity >= 24) {
      quantityDiscount = 0.95;
    }

    if (safeQuantity >= 48) {
      quantityDiscount = 0.9;
    }

    if (safeQuantity >= 100) {
      quantityDiscount = 0.85;
    }

    const discountedDecorationCost =
      decorationCost * quantityDiscount;

    const pricePerShirt =
      garmentCost + discountedDecorationCost;

    const setupFee =
      service === "screenPrint"
        ? selectedService.setupFee * colors
        : selectedService.setupFee;

    const subtotal = safeQuantity * pricePerShirt + setupFee;
    const rushFee = rushOrder ? subtotal * 0.25 : 0;
    const total = subtotal + rushFee;

    return {
      garmentCost,
      decorationCost: discountedDecorationCost,
      pricePerShirt,
      setupFee,
      rushFee,
      total,
    };
  }, [
    service,
    quantity,
    garment,
    customerSupplied,
    printSize,
    printLocations,
    colors,
    rushOrder,
  ]);

  return (
    <section className="quote-calculator" id="quote">
      <div className="quote-calculator-container">
        <div className="quote-heading">
          <span className="quote-eyebrow">
            INSTANT ESTIMATE
          </span>

          <h2>Build Your Quote</h2>

          <p>
            Select your apparel and printing options to receive a
            preliminary project estimate.
          </p>
        </div>

        <div className="quote-layout">
          <div className="quote-form">
            <label>
              Printing Method

              <select
                value={service}
                onChange={(event) =>
                  setService(event.target.value)
                }
              >
                <option value="screenPrint">
                  Screen Printing
                </option>

                <option value="dtf">
                  DTF Printing
                </option>

                <option value="htv">
                  Heat Transfer Vinyl
                </option>
              </select>
            </label>

            <label>
              Quantity

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) =>
                  setQuantity(event.target.value)
                }
              />
            </label>

            <label>
              Garment Type

              <select
                value={garment}
                disabled={customerSupplied}
                onChange={(event) =>
                  setGarment(event.target.value)
                }
              >
                {Object.entries(garmentRates).map(
                  ([value, item]) => (
                    <option key={value} value={value}>
                      {item.label}
                    </option>
                  )
                )}
              </select>
            </label>

            <label className="quote-checkbox">
              <input
                type="checkbox"
                checked={customerSupplied}
                onChange={(event) =>
                  setCustomerSupplied(event.target.checked)
                }
              />

              Customer will supply the garments
            </label>

            <label>
              Print Size

              <select
                value={printSize}
                onChange={(event) =>
                  setPrintSize(event.target.value)
                }
              >
                {Object.entries(printSizeRates).map(
                  ([value, item]) => (
                    <option key={value} value={value}>
                      {item.label}
                    </option>
                  )
                )}
              </select>
            </label>

            <label>
              Print Locations

              <select
                value={printLocations}
                onChange={(event) =>
                  setPrintLocations(
                    Number(event.target.value)
                  )
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
                  onChange={(event) =>
                    setColors(Number(event.target.value))
                  }
                >
                  <option value="1">1 color</option>
                  <option value="2">2 colors</option>
                  <option value="3">3 colors</option>
                  <option value="4">4 colors</option>
                </select>
              </label>
            )}

            <label className="quote-checkbox">
              <input
                type="checkbox"
                checked={rushOrder}
                onChange={(event) =>
                  setRushOrder(event.target.checked)
                }
              />

              Rush order — adds 25%
            </label>
          </div>

          <div className="quote-result">
            <span>Estimated Project Total</span>

            <h3>${estimate.total.toFixed(2)}</h3>

            <div className="quote-breakdown">
              <p>
                Garment cost per piece
                <strong>
                  ${estimate.garmentCost.toFixed(2)}
                </strong>
              </p>

              <p>
                Printing cost per piece
                <strong>
                  ${estimate.decorationCost.toFixed(2)}
                </strong>
              </p>

              <p>
                Estimated price per piece
                <strong>
                  ${estimate.pricePerShirt.toFixed(2)}
                </strong>
              </p>

              <p>
                Setup fee
                <strong>
                  ${estimate.setupFee.toFixed(2)}
                </strong>
              </p>

              {rushOrder && (
                <p>
                  Rush fee
                  <strong>
                    ${estimate.rushFee.toFixed(2)}
                  </strong>
                </p>
              )}

              <p>
                Quantity
                <strong>{quantity || 1}</strong>
              </p>
            </div>

            <a className="quote-button" href="#contact">
              Request Final Quote
            </a>

            <small>
              This is a preliminary estimate. Final pricing may
              change based on garment brand, artwork condition,
              print complexity, specialty materials, taxes,
              shipping, and turnaround requirements.
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuoteCalculator;