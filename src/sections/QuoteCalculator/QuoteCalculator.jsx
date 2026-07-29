import { useMemo, useState } from "react";
import GarmentSelector from "../../components/QuoteBuilder/GarmentSelector";
import PrintLocationSelector from "../../components/QuoteBuilder/PrintLocationSelector";
import ProjectSummary from "../../components/QuoteBuilder/ProjectSummary";
import { calculateEstimate } from "../../utils/pricingEngine";
import {
  garmentRates,
  printLocationOptions,
  printSizeRates,
  serviceRates,
} from "../../data/pricingData";
import "./QuoteCalculator.css";



function QuoteCalculator() {
  const [service, setService] = useState("screenPrint");
  const [quantity, setQuantity] = useState(12);
  const [garment, setGarment] = useState("tshirt");
  const [customerSupplied, setCustomerSupplied] =
    useState(false);
  const [printSize, setPrintSize] = useState("standard");
  const [selectedLocations, setSelectedLocations] =
    useState([]);
  const [colors, setColors] = useState(1);
  const [rushOrder, setRushOrder] = useState(false);

  const togglePrintLocation = (location) => {
    setSelectedLocations((previousLocations) => {
      if (previousLocations.includes(location)) {
        return previousLocations.filter(
          (item) => item !== location
        );
      }

      return [...previousLocations, location];
    });
  };
const estimate = useMemo(
  () =>
    calculateEstimate({
      service,
      quantity,
      garment,
      customerSupplied,
      printSize,
      selectedLocations,
      colors,
      rushOrder,
    }),
  [
    service,
    quantity,
    garment,
    customerSupplied,
    printSize,
    selectedLocations,
    colors,
    rushOrder,
  ]
);

  const selectedServiceLabel =
  serviceRates[service].label;

const selectedGarmentLabel = customerSupplied
  ? "Customer-Supplied Garments"
  : garmentRates[garment].label;

const selectedPrintSizeLabel =
  printSizeRates[printSize].label;

const displayQuantity =
  estimate.calculationQuantity;



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

<GarmentSelector
  garmentRates={garmentRates}
  selectedGarment={garment}
  customerSupplied={customerSupplied}
  onGarmentChange={setGarment}
/>

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

            <PrintLocationSelector
  printLocationOptions={printLocationOptions}
  selectedLocations={selectedLocations}
  onToggleLocation={togglePrintLocation}
/>


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

         <ProjectSummary
  selectedServiceLabel={selectedServiceLabel}
  selectedGarmentLabel={selectedGarmentLabel}
  displayQuantity={displayQuantity}
  selectedPrintSizeLabel={selectedPrintSizeLabel}
  service={service}
  colors={colors}
  rushOrder={rushOrder}
  selectedLocations={selectedLocations}
  estimate={estimate}
/>
        </div>
        </div>
    </section>
  );
}

export default QuoteCalculator;