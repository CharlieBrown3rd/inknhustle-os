import "./ProductionTimeline.css";

function ProductionTimeline({
  productionStartedAt,
  completedAt,
}) {
  // ======================================================
  // DATE FORMATTING
  // ======================================================

  const formatDateTime = (dateValue) => {
    if (!dateValue) {
      return "Not recorded";
    }

    return new Date(dateValue).toLocaleString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };


  // ======================================================
  // PRODUCTION DURATION
  // ======================================================

  const getProductionDuration = () => {
    if (!productionStartedAt || !completedAt) {
      return null;
    }

    const started = new Date(productionStartedAt);
    const completed = new Date(completedAt);

    const differenceMs = completed - started;

    if (differenceMs < 0) {
      return null;
    }

    const totalMinutes = Math.floor(
      differenceMs / 60000
    );

    const days = Math.floor(
      totalMinutes / 1440
    );

    const hours = Math.floor(
      (totalMinutes % 1440) / 60
    );

    const minutes = totalMinutes % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    }

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes} min`;
  };

  const productionDuration =
    getProductionDuration();


  // ======================================================
  // RENDER
  // ======================================================

  return (
    <section className="production-timeline">
      <div className="production-timeline-header">
        <span>PRODUCTION</span>
        <h3>Production Timeline</h3>
      </div>

      <div className="production-timeline-grid">
        <div className="production-timeline-item">
          <span>Production Started</span>

          <strong>
            {formatDateTime(
              productionStartedAt
            )}
          </strong>
        </div>

        <div className="production-timeline-item">
          <span>Completed</span>

          <strong>
            {formatDateTime(completedAt)}
          </strong>
        </div>

        {productionDuration && (
          <div className="production-timeline-item">
            <span>Production Time</span>

            <strong>
              {productionDuration}
            </strong>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductionTimeline;