function PrintLocationSelector({
  printLocationOptions,
  selectedLocations,
  onToggleLocation,
}) {
  return (
    <div className="print-location-selector">
      <div className="print-location-heading">
        <h3>Select Print Locations</h3>

        <span>
          {selectedLocations.length} selected
        </span>
      </div>

      <div className="print-location-groups">
        {printLocationOptions.map((group) => (
          <div
            className="print-location-group"
            key={group.category}
          >
            <h4>{group.category}</h4>

            <div className="print-location-grid">
              {group.locations.map((location) => {
                const isSelected =
                  selectedLocations.includes(location);

                return (
                  <button
                    key={location}
                    type="button"
                    className={`print-location-card ${
                      isSelected ? "active" : ""
                    }`}
                    aria-pressed={isSelected}
                    onClick={() =>
                      onToggleLocation(location)
                    }
                  >
                    <span
                      className="print-location-check"
                      aria-hidden="true"
                    >
                      {isSelected ? "✓" : "+"}
                    </span>

                    <span>{location}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedLocations.length === 0 && (
        <p className="print-location-message">
          Select at least one location.
          Pricing currently assumes one print
          location.
        </p>
      )}
    </div>
  );
}

export default PrintLocationSelector;