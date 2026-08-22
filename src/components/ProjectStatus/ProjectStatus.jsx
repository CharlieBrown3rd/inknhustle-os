import "./ProjectStatus.css";

function ProjectStatus({
  projectReference,
  customerName,
  projectStatus,
  productionStartedAt,
  completedAt,
}) {
  // ======================================================
  // STATUS LABELS
  // ======================================================

  const statusLabels = {
    quoted: "Quote Issued",
    approved: "Quote Approved",
    production: "In Production",
    completed: "Completed",
  };

  const currentStatusLabel =
    statusLabels[projectStatus] || "Project Status";


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
  // PROGRESS STATES
  // ======================================================

  const quoteApproved =
    projectStatus === "approved" ||
    projectStatus === "production" ||
    projectStatus === "completed";

  const productionStarted =
    projectStatus === "production" ||
    projectStatus === "completed";

  const projectCompleted =
    projectStatus === "completed";


  // ======================================================
  // RENDER
  // ======================================================

  return (
    <section className="project-status-page">
      <div className="project-status-card">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="project-status-header">
          <span className="project-status-eyebrow">
            PROJECT STATUS
          </span>

          <h1>
            {currentStatusLabel}
          </h1>

          <p>
            Hello {customerName || "Customer"}, here is the
            current status of your InknHustle project.
          </p>
        </header>


        {/* =================================================
            PROJECT REFERENCE
        ================================================= */}

        <div className="project-status-reference">
          <span>Project Reference</span>

          <strong>
            {projectReference || "Pending"}
          </strong>
        </div>


        {/* =================================================
            PROGRESS
        ================================================= */}

        <div className="project-status-progress">

          <div
            className={
              quoteApproved
                ? "project-status-step complete"
                : "project-status-step"
            }
          >
            <span>01</span>

            <div>
              <strong>Quote Approved</strong>
              <p>
                Your official project quote has been approved.
              </p>
            </div>
          </div>


          <div
            className={
              productionStarted
                ? "project-status-step complete"
                : "project-status-step"
            }
          >
            <span>02</span>

            <div>
              <strong>Production Started</strong>
              <p>
                Your project has entered the production workflow.
              </p>
            </div>
          </div>


          <div
            className={
              projectCompleted
                ? "project-status-step complete"
                : "project-status-step"
            }
          >
            <span>03</span>

            <div>
              <strong>Completed</strong>
              <p>
                Your project has been completed.
              </p>
            </div>
          </div>

        </div>


        {/* =================================================
            PRODUCTION DETAILS
        ================================================= */}

        {(productionStartedAt || completedAt) && (
          <div className="project-status-production">
            <div>
              <span>Production Started</span>

              <strong>
                {formatDateTime(
                  productionStartedAt
                )}
              </strong>
            </div>

            <div>
              <span>Completed</span>

              <strong>
                {formatDateTime(
                  completedAt
                )}
              </strong>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default ProjectStatus;