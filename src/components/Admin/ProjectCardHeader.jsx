import {
  getDueDateStatus,
  projectStatusLabels,
} from "./projectUtils";

function ProjectCardHeader({ project }) {
  const dueDateStatus = getDueDateStatus(project);

  return (
    <div className="admin-project-card-header">
      <div>
        <span className="admin-project-reference">
          {project.reference}
        </span>

        <h3>{project.customer_name}</h3>
      </div>

      {dueDateStatus === "overdue" && (
        <span className="admin-project-overdue">
          OVERDUE
        </span>
      )}

      {dueDateStatus === "due-soon" && (
        <span className="admin-project-due-soon">
          DUE SOON
        </span>
      )}

      <div className="admin-project-badges">
        {project.rush_order && (
          <span className="admin-project-rush">
            RUSH
          </span>
        )}

        <span
          className={`admin-project-status status-${project.status}`}
        >
          {projectStatusLabels[project.status] || project.status}
        </span>
      </div>
    </div>
  );
}

export default ProjectCardHeader;