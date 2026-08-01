

function QuantityPriceTable({
  quantityEstimates = [],
  currentQuantity,
}) {
  return (
    <div className="quantity-price-table">
      <div className="quantity-price-table-header">
        <span>Save More When You Order More</span>

        <h3>Quantity Pricing</h3>
      </div>

   {quantityEstimates.length > 0 && (
  <>
    <div className="quantity-price-table-columns">
      <span>Quantity</span>
      <span>Price Each</span>
      <span>Total</span>
    </div>

    <div className="quantity-price-table-body">
      {quantityEstimates.map(({ quantity, estimate }) => (
        <div
          className={`quantity-price-table-row ${
            quantity === currentQuantity
              ? "active"
              : ""
          }`}
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
  </>
)}
    </div>
  );
}

export default QuantityPriceTable;