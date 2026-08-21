import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ProjectStatus from "./ProjectStatus";


function ProjectStatusPage() {
  // ======================================================
  // STATE
  // ======================================================

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");


  // ======================================================
  // LOAD PROJECT STATUS
  // ======================================================

  useEffect(() => {
    const loadProjectStatus = async () => {
      const params = new URLSearchParams(
        window.location.search
      );

      const token = params.get("token");


      if (!token) {
        setErrorMessage(
          "This project status link is missing its secure token."
        );

        setLoading(false);
        return;
      }


      const { data, error } = await supabase.rpc(
        "get_project_status_by_token",
        {
          p_token: token,
        }
      );


      if (error) {
        console.error(
          "Failed to load project status:",
          error
        );

        setErrorMessage(
          "We could not load this project status."
        );

        setLoading(false);
        return;
      }


      if (!data || data.length === 0) {
        setErrorMessage(
          "This project status link is invalid or the project is not available for tracking yet."
        );

        setLoading(false);
        return;
      }


      setProject(data[0]);
      setLoading(false);
    };


    loadProjectStatus();
  }, []);


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <section className="project-status-page">
        <div className="project-status-card">
          <p>Loading project status...</p>
        </div>
      </section>
    );
  }


  // ======================================================
  // ERROR
  // ======================================================

  if (errorMessage) {
    return (
      <section className="project-status-page">
        <div className="project-status-card">
          <h1>Project Status</h1>

          <p>{errorMessage}</p>
        </div>
      </section>
    );
  }


  // ======================================================
  // PROJECT STATUS
  // ======================================================

  return (
    <ProjectStatus
      projectReference={project.reference}
      customerName={project.customer_name}
      projectStatus={project.project_status}
      productionStartedAt={
        project.production_started_at
      }
      completedAt={
        project.completed_at
      }
    />
  );
}


export default ProjectStatusPage;