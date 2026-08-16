import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProject, setSelectedProject] =
    useState(null);
    const [officialQuoteTotal, setOfficialQuoteTotal] =
  useState("");

const [quoteNotes, setQuoteNotes] =
  useState("");

const saveOfficialQuote = async () => {
  console.log("SAVE QUOTE CLICKED", {
  selectedProject,
  officialQuoteTotal,
  quoteNotes,
});

  const quoteTotal = Number(officialQuoteTotal);

  if (!Number.isFinite(quoteTotal) || quoteTotal <= 0) {
    console.error(
      "Enter a valid official quote total before issuing the quote."
    );
    return;
  }

  const issuedAt = new Date().toISOString();

  const { data, error } = await supabase
    .from("projects")
    .update({
      official_quote_total: quoteTotal,
      quote_notes: quoteNotes.trim() || null,
      quoted_at: issuedAt,
      status: "quoted",
    })
    .eq("id", selectedProject.id)
    .select()
    .single();

  if (error) {
    console.error(
      "Failed to issue official quote:",
      error
    );
    return;
  }

  setProjects((currentProjects) =>
    currentProjects.map((project) =>
      project.id === selectedProject.id
        ? data
        : project
    )
  );

  setSelectedProject(data);

  setOfficialQuoteTotal(
    data.official_quote_total ?? ""
  );

  setQuoteNotes(data.quote_notes || "");
};
const issueOfficialQuote = async () => {
  if (!selectedProject) {
    return;
  }
  if (!selectedProject) {
    return;
  }

  
  const quoteTotal = Number(officialQuoteTotal);

  if (!Number.isFinite(quoteTotal) || quoteTotal <= 0) {
    console.error("Enter a valid official quote total.");
    return;
  }

  const { data, error } = await supabase
    .from("projects")
    .update({
      official_quote_total: quoteTotal,
      quote_notes: quoteNotes.trim() || null,
      quoted_at: selectedProject.quoted_at || null,
    })
    .eq("id", selectedProject.id)
    .select()
    .single();

  if (error) {
    console.error(
      "Failed to save official quote:",
      error
    );
    return;
  }

  setProjects((currentProjects) =>
    currentProjects.map((project) =>
      project.id === selectedProject.id
        ? data
        : project
    )
  );

  setSelectedProject(data);
  setOfficialQuoteTotal(
    data.official_quote_total ?? ""
  );
  setQuoteNotes(data.quote_notes || "");
};

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

const nextProjectStatus = {
  new: "reviewing",
  reviewing: "quoted",
  quoted: "approved",
  approved: "production",
  production: "completed",
};

const saveAdminNotes = async () => {
  if (!selectedProject) {
    return;
  }

  const { data, error } = await supabase
    .from("projects")
    .update({
      admin_notes: adminNotes.trim() || null,
    })
    .eq("id", selectedProject.id)
    .select()
    .single();

  if (error) {
    console.error(
      "Failed to save admin notes:",
      error
    );
    return;
  }

  setProjects((currentProjects) =>
    currentProjects.map((project) =>
      project.id === selectedProject.id
        ? data
        : project
    )
  );

  setSelectedProject(data);
  setAdminNotes(data.admin_notes || "");
};
const getDueDateMessage = (project) => {
  if (!project.due_date || project.status === "completed") {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(`${project.due_date}T00:00:00`);

  const differenceInDays = Math.round(
    (dueDate - today) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays < 0) {
    const daysOverdue = Math.abs(differenceInDays);

    return `${daysOverdue} ${
      daysOverdue === 1 ? "day" : "days"
    } overdue`;
  }

  if (differenceInDays === 0) {
    return "Due today";
  }

  if (differenceInDays === 1) {
    return "1 day left";
  }

  return `${differenceInDays} days left`;
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

  quoted: projects.filter(
  (project) => project.status === "quoted"
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

const moveProjectToNextStage = async (project) => {
  if (!project) {
    return;
  }

  const nextStatus = nextProjectStatus[project.status];

  if (!nextStatus) {
    return;
  }

  await updateProjectStatus(
    project.id,
    nextStatus
  );
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

const sortedProjects = [...filteredProjects].sort((a, b) => {
  // Completed projects always go to the bottom.
  if (a.status === "completed" && b.status !== "completed") {
    return 1;
  }

  if (a.status !== "completed" && b.status === "completed") {
    return -1;
  }

  // Among active projects, RUSH projects come first.
  if (a.rush_order && !b.rush_order) {
    return -1;
  }

  if (!a.rush_order && b.rush_order) {
    return 1;
  }

  const aDue = a.due_date
  ? new Date(a.due_date).getTime()
  : Infinity;

const bDue = b.due_date
  ? new Date(b.due_date).getTime()
  : Infinity;

return aDue - bDue;
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

  const getDueDateStatus = (project) => {
  if (!project.due_date || project.status === "completed") {
    return null;
  }

  const getDueDateMessage = (project) => {
  if (!project.due_date || project.status === "completed") {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(`${project.due_date}T00:00:00`);

  const differenceInDays = Math.round(
    (dueDate - today) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays < 0) {
    const daysOverdue = Math.abs(differenceInDays);

    return `${daysOverdue} ${
      daysOverdue === 1 ? "day" : "days"
    } overdue`;
  }

  if (differenceInDays === 0) {
    return "Due today";
  }

  if (differenceInDays === 1) {
    return "1 day left";
  }

  return `${differenceInDays} days left`;
};

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(`${project.due_date}T00:00:00`);

  const differenceInDays = Math.ceil(
    (dueDate - today) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays < 0) {
    return "overdue";
  }

  if (differenceInDays <= 3) {
    return "due-soon";
  }

  return null;
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
           {sortedProjects.map((project) => (
              <article
                className="admin-project-card"
                key={project.id}
                role="button"
                tabIndex="0"
                onClick={() => {
  setSelectedProject(project);
  setAdminNotes(project.admin_notes || "");

  setOfficialQuoteTotal(
    project.official_quote_total ?? ""
  );

  setQuoteNotes(
    project.quote_notes || ""
  );
}}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                     setSelectedProject(project);
  setAdminNotes(project.admin_notes || "");

  setOfficialQuoteTotal(
    project.official_quote_total ?? ""
  );

  setQuoteNotes(
    project.quote_notes || ""
  );
                    
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

                  {getDueDateStatus(project) === "overdue" && (
  <span className="admin-project-overdue">
    OVERDUE
  </span>
)}

{getDueDateStatus(project) === "due-soon" && (
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

  {getDueDateMessage(project) && (
    <small className="admin-project-due-message">
      {getDueDateMessage(project)}
    </small>
  )}
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
              <div className="admin-project-admin-notes">
  <span>Internal Production Notes</span>

  <textarea
    value={adminNotes}
    onChange={(event) =>
      setAdminNotes(event.target.value)
    }
    placeholder="Add internal production notes..."
    rows="5"
  />
</div>
     <button
  type="button"
  className="admin-project-save-notes"
  onClick={saveAdminNotes}
>
  Save Notes
</button>
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


{nextProjectStatus[selectedProject.status] && (
  <button
    type="button"
    className="admin-project-next-stage"
    onClick={() =>
      moveProjectToNextStage(selectedProject)
    }
  >
    Move to{" "}
    {projectStatusLabels[
      nextProjectStatus[selectedProject.status]
    ]}
  </button>
  
)}         
<div className="admin-project-official-quote">
  <span>Official Quote</span>

  <div className="admin-project-quote-grid">
    <label>
      Official Quote Total

      <input
        type="number"
        min="0"
        step="0.01"
        value={officialQuoteTotal}
        onChange={(event) =>
          setOfficialQuoteTotal(event.target.value)
        }
        placeholder="0.00"
      />
    </label>

    <label>
      Quote Notes

      <textarea
        rows="4"
        value={quoteNotes}
        onChange={(event) =>
          setQuoteNotes(event.target.value)
        }
        placeholder="Add customer-facing quote details..."
      />
    </label>
  </div>

   <button
    type="button"
    className="admin-project-save-quote"
    onClick={() => {
  alert("Calling saveOfficialQuote now");
  saveOfficialQuote();
}}
  >
    Save Official Quote
  </button>
  <button
  type="button"
  className="admin-project-issue-quote"
  onClick={issueOfficialQuote}
>
  Issue Official Quote
</button>
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