function ProjectStatusControl({
  status,
  disabled,
  projectStatuses,
  projectStatusLabels,
  onStatusChange,
}) {
  return (
    <div className="admin-project-status-control">
      <label htmlFor="project-status">
        Project Status
      </label>

      <select
        id="project-status"
        disabled={disabled}
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value)
        }
      >
        {projectStatuses.map((projectStatus) => (
          <option key={projectStatus} value={projectStatus}>
            {projectStatusLabels[projectStatus]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProjectStatusControl;