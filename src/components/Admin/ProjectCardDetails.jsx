import { getDueDateMessage } from "./projectUtils";

function ProjectCardDetails({ project }) {
  const dueDateMessage = getDueDateMessage(project);

  return (
    <div className="admin-project-details">
      <div>
        <span>Decoration</span>
        <strong>
          {project.decoration_method || "Not provided"}
        </strong>
      </div>

      <div>
        <span>Garment</span>
        <strong>
          {project.garment_style || "Not provided"}
        </strong>
      </div>

      <div>
        <span>Quantity</span>
        <strong>{project.quantity ?? "—"}</strong>
      </div>

      <div>
        <span>Estimated Total</span>
        <strong>
          {project.estimated_total != null
            ? `$${Number(project.estimated_total).toFixed(2)}`
            : "—"}
        </strong>
      </div>

      <div>
        <span>Due Date</span>
        <strong>{project.due_date || "Not specified"}</strong>

        {dueDateMessage && (
          <small className="admin-project-due-message">
            {dueDateMessage}
          </small>
        )}
      </div>

      <div>
        <span>Submitted</span>
        <strong>
          {project.created_at
            ? new Date(project.created_at).toLocaleDateString()
            : "—"}
        </strong>
      </div>
    </div>
  );
}

export default ProjectCardDetails;