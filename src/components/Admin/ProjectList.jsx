import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProject, setSelectedProject] =
    useState(null);

  const projectStatuses = [
    "new",
    "reviewing",
    "quoted",
    "approved",
    "production",
    "completed",
  ];

  const projectStatusLabels = {
  new: "New",
  reviewing: "Reviewing",
  quoted: "Quoted",
  approved: "Approved",
  production: "In Production",
  completed: "Completed",
};
  const openArtwork = async (artworkPath) => {
  if (!artworkPath) {
    return;
  }

  const { data, error } = await supabase.storage
    .from("project-artwork")
    .createSignedUrl(artworkPath, 60);

  if (error) {
    console.error(
      "Failed to open artwork:",
      error
    );
    return;
  }

  window.open(data.signedUrl, "_blank");
};

  const statusCounts = {
  new: projects.filter(
    (project) => project.status === "new"
  ).length,

  reviewing: projects.filter(
    (project) => project.status === "reviewing"
  ).length,

  approved: projects.filter(
    (project) => project.status === "approved"
  ).length,

  production: projects.filter(
    (project) => project.status === "production"
  ).length,

  completed: projects.filter(
    (project) => project.status === "completed"
  ).length,
};
const filteredProjects = projects.filter((project) => {
  const searchValue = searchTerm.toLowerCase();

  const matchesSearch =
    project.customer_name
      ?.toLowerCase()
      .includes(searchValue) ||
    project.reference
      ?.toLowerCase()
      .includes(searchValue) ||
    project.customer_email
      ?.toLowerCase()
      .includes(searchValue);

  const matchesStatus =
    statusFilter === "all" ||
    project.status === statusFilter;

  return matchesSearch && matchesStatus;
});



  useEffect(() => {
    const loadProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(
          "Failed to load projects:",
          error
        );

        setLoading(false);
        return;
      }

      setProjects(data ?? []);
      setLoading(false);
    };

    loadProjects();
  }, []);

  const updateProjectStatus = async (
    projectId,
    newStatus
  ) => {
    const { data, error } = await supabase
      .from("projects")
      .update({ status: newStatus })
      .eq("id", projectId)
      .select()
      .single();

    if (error) {
      console.error(
        "Failed to update project status:",
        error
      );
      return;
    }

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? data
          : project
      )
    );

    setSelectedProject(data);
  };

  return (
    
    <section className="admin-project-list">
      <div className="admin-project-header">
        <span>Admin Dashboard</span>

        <h2>Incoming Projects</h2>

        <p>
          Review customer project requests and
          production details.
        </p>
      </div>
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
      {loading && (
        <p className="admin-project-message">
          Loading projects...
        </p>
      )}

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
      {!loading && filteredProjects.length === 0 && (
        <p className="admin-project-message">
          No projects found.
        </p>
      )}

      {!loading && projects.length > 0 && (
        <>
          <div className="admin-project-count">
  {filteredProjects.length} project
  {filteredProjects.length === 1 ? "" : "s"} found
</div>

          <div className="admin-project-grid">
           {filteredProjects.map((project) => (
              <article
                className="admin-project-card"
                key={project.id}
                role="button"
                tabIndex="0"
                onClick={() =>
                  setSelectedProject(project)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    setSelectedProject(project);
                  }
                }}
              >
                
                <div className="admin-project-card-header">
                  <div>
                    <span className="admin-project-reference">
                      {project.reference}
                    </span>

                    <h3>{project.customer_name}</h3>
                  </div>

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

                <div className="admin-project-details">
                  <div>
                    <span>Decoration</span>
                    <strong>
                      {project.decoration_method ||
                        "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Garment</span>
                    <strong>
                      {project.garment_style ||
                        "Not provided"}
                    </strong>
                  </div>

                  <div>
                    <span>Quantity</span>
                    <strong>
                      {project.quantity ?? "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Estimated Total</span>
                    <strong>
                      {project.estimated_total != null
                        ? `$${Number(
                            project.estimated_total
                          ).toFixed(2)}`
                        : "—"}
                    </strong>
                  </div>

                  <div>
                    <span>Due Date</span>
                    <strong>
                      {project.due_date ||
                        "Not specified"}
                    </strong>
                  </div>

                  <div>
                    <span>Submitted</span>
                    <strong>
                      {project.created_at
                        ? new Date(
                            project.created_at
                          ).toLocaleDateString()
                        : "—"}
                    </strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {selectedProject && (
        <div className="admin-project-detail-panel">
          <div className="admin-project-detail-header">
            <div>
              <span className="admin-project-reference">
                {selectedProject.reference}
              </span>

              <h3>
                {selectedProject.customer_name}
              </h3>
            </div>

            <button
              type="button"
              className="admin-project-close"
              onClick={() =>
                setSelectedProject(null)
              }
            >
              Close
            </button>
          </div>
<div className="admin-project-status-control">
  <label htmlFor="project-status">
    Project Status
  </label>

  <select
    id="project-status"
    value={selectedProject.status}
    onChange={(event) =>
      updateProjectStatus(
        selectedProject.id,
        event.target.value
      )
    }
  >
    {projectStatuses.map((status) => (
      <option
        key={status}
        value={status}
      >
        {projectStatusLabels[status]}
      </option>
    ))}
  </select>
</div>
          <div className="admin-project-detail-grid">
            <div>
              <span>Email</span>
              <strong>
                {selectedProject.customer_email}
              </strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>
                {selectedProject.customer_phone}
              </strong>
            </div>

            <div>
              <span>Business</span>
              <strong>
                {selectedProject.business_name ||
                  "Not provided"}
              </strong>
            </div>

            <div>
              <span>Decoration Method</span>
              <strong>
                {selectedProject.decoration_method ||
                  "Not provided"}
              </strong>
            </div>

            <div>
              <span>Garment Style</span>
              <strong>
                {selectedProject.garment_style ||
                  "Not provided"}
              </strong>
            </div>

            <div>
              <span>Quantity</span>
              <strong>
                {selectedProject.quantity ?? "—"}
              </strong>
            </div>

            <div>
              <span>Decoration Size</span>
              <strong>
                {selectedProject.decoration_size ||
                  "Not provided"}
              </strong>
            </div>

            <div>
              <span>Ink Colors</span>
              <strong>
                {selectedProject.ink_colors ??
                  "Not applicable"}
              </strong>
            </div>

            <div>
              <span>Rush Order</span>
              <strong>
                {selectedProject.rush_order
                  ? "Yes"
                  : "No"}
              </strong>
            </div>

            <div>
              <span>Due Date</span>
              <strong>
                {selectedProject.due_date ||
                  "Not specified"}
              </strong>
            </div>

            <div>
              <span>Estimated Total</span>
              <strong>
                {selectedProject.estimated_total != null
                  ? `$${Number(
                      selectedProject.estimated_total
                    ).toFixed(2)}`
                  : "—"}
              </strong>
            </div>

            <div>
              <span>Price Per Garment</span>
              <strong>
                {selectedProject.price_per_garment != null
                  ? `$${Number(
                      selectedProject.price_per_garment
                    ).toFixed(2)}`
                  : "—"}
              </strong>
            </div>
          </div>
<div className="admin-project-artwork">
  <span>Artwork</span>

  {selectedProject.artwork_path ? (
    <button
      type="button"
      className="admin-project-action"
      onClick={() =>
        openArtwork(selectedProject.artwork_path)
      }
    >
      View Artwork
    </button>
  ) : (
    <p>No artwork submitted.</p>
  )}
</div>
          <div className="admin-project-notes">
            <span>Project Notes</span>

            <p>
              {selectedProject.project_notes ||
                "No project notes provided."}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProjectList;