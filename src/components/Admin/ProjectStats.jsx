function ProjectStats({ statusCounts }) {
  return (
    <div className="admin-dashboard-stats">
      <div className="admin-stat-card">
        <span>New Projects</span>
        <strong>{statusCounts.new}</strong>
      </div>

      <div className="admin-stat-card">
        <span>In Review</span>
        <strong>{statusCounts.reviewing}</strong>
      </div>

      <div className="admin-stat-card">
        <span>Quoted</span>
        <strong>{statusCounts.quoted}</strong>
      </div>

      <div className="admin-stat-card">
        <span>Approved</span>
        <strong>{statusCounts.approved}</strong>
      </div>

      <div className="admin-stat-card">
        <span>In Production</span>
        <strong>{statusCounts.production}</strong>
      </div>

      <div className="admin-stat-card">
        <span>Completed</span>
        <strong>{statusCounts.completed}</strong>
      </div>
    </div>
  );
}

export default ProjectStats;