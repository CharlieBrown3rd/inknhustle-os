function ProjectFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  projectStatuses,
}) {
  return (
    <>
      <div className="admin-project-search">
        <label htmlFor="project-search">
          Search Projects
        </label>

        <input
          id="project-search"
          type="search"
          placeholder="Search by customer, reference, or email"
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />
      </div>

      <div className="admin-project-filter">
        <label htmlFor="status-filter">
          Filter by Status
        </label>

        <select
          id="status-filter"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="all">All Statuses</option>

          {projectStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default ProjectFilters;