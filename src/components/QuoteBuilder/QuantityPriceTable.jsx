import { calculateEstimate } from "../../utils/pricingEngine";

function QuantityPriceTable({
  quantityOptions = [],
  service,
  garment,
  customerSupplied,
  selectedPrintSize,
  colors,
  rushOrder,
  selectedLocations,
}) {
  const hasQuantityOptions =
    quantityOptions.length > 0;

  const quantityEstimates = quantityOptions.map(
  (quantity) => ({
    quantity,
    estimate: calculateEstimate({
      service,
      garment,
      customerSupplied,
      quantity,
      printSize: selectedPrintSize,
      colors,
      rushOrder,
      selectedLocations,
    }),
  })
);

  return (
    <div className="quantity-price-table">
      <div className="quantity-price-table-header">
        <span>Save More When You Order More</span>

        <h3>Quantity Pricing</h3>
      </div>

      {hasQuantityOptions && (
  <div className="quantity-price-table-body">
   {quantityEstimates.map(({ quantity, estimate }) => (
  <div
    className="quantity-price-table-row"
    key={quantity}
  >
    <span>{quantity} shirts</span>

    <span>
      ${estimate.pricePerShirt.toFixed(2)} each
    </span>

    <strong>
      ${estimate.total.toFixed(2)}
    </strong>
  </div>
))}
  </div>
)}
    </div>
  );
}

export default QuantityPriceTable;