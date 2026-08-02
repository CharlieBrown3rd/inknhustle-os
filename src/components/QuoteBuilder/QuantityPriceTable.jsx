

function QuantityPriceTable({
  quantityEstimates = [],
  currentQuantity,
  onQuantityChange,
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
     {quantityEstimates.map(({ quantity, estimate }) => {
  const isBestValue =
    quantity === quantityEstimates.at(-1)?.quantity;

  return (
    <button
  type="button"
  className={`quantity-price-table-row ${
    quantity === currentQuantity
      ? "active"
      : ""
  }`}
  key={quantity}
  onClick={() => onQuantityChange(quantity)}
  aria-pressed={quantity === currentQuantity}
>
          <span>{quantity} shirts</span>

          <span>
            ${estimate.pricePerShirt.toFixed(2)} each
          </span>

          <div className="quantity-price-table-total">
  <strong>
    ${estimate.total.toFixed(2)}
  </strong>

  {quantity === currentQuantity && (
    <span className="current-badge">
      CURRENT
    </span>
  )}

  {isBestValue && (
    <span className="best-value-badge">
      BEST VALUE
    </span>
  )}
</div>
          </button>
  );
})}
    </div>
  </>
)}
    </div>
  );
}

export default QuantityPriceTable;