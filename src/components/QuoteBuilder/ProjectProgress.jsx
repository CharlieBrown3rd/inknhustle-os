function ProjectProgress() {
  const steps = [
    "Project Details",
    "Artwork",
    "Review",
    "Submit",
  ];

  return (
    <div className="project-progress">
      {steps.map((step, index) => (
        <div
          className="project-progress-step"
          key={step}
        >
          <span className="project-progress-number">
            {index + 1}
          </span>

          <span className="project-progress-label">
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ProjectProgress;