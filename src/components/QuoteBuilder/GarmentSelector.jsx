function GarmentSelector({
  garmentRates,
  selectedGarment,
  customerSupplied,
  onGarmentChange,
}) {
  return (
    <div className="garment-selector">
      <h3>Select Your Garment</h3>

      <div className="garment-grid">
        {Object.entries(garmentRates).map(
          ([garmentId, garmentItem]) => {
            const isSelected =
              selectedGarment === garmentId;

            return (
              <button
                key={garmentId}
                type="button"
                disabled={customerSupplied}
                className={`garment-card ${
                  isSelected ? "active" : ""
                }`}
                aria-pressed={isSelected}
                onClick={() =>
                  onGarmentChange(garmentId)
                }
              >
                <span
                  className="garment-icon"
                  aria-hidden="true"
                >
                  {garmentItem.icon}
                </span>

                <h4>{garmentItem.label}</h4>

                <span className="garment-card-price">
                  ${garmentItem.price.toFixed(2)} per piece
                </span>
              </button>
            );
          }
        )}
      </div>

      {customerSupplied && (
        <p className="garment-supplied-message">
          Garment pricing has been removed because the
          customer will provide the apparel.
        </p>
      )}
    </div>
  );
}

export default GarmentSelector;