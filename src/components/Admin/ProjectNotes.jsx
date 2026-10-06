function ProjectNotes({ notes }) {
  return (
    <div className="admin-project-notes">
      <span>Project Notes</span>
      <p>{notes || "No project notes provided."}</p>
    </div>
  );
}

export default ProjectNotes;