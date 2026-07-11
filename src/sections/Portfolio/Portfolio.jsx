const projects = [
  {
    category: "Screen Printing",
    title: "Bold brand apparel",
    description:
      "Clean, durable multi-color printing for clothing brands, businesses, and events.",
  },
  {
    category: "DTF Printing",
    title: "Full-color detail",
    description:
      "Vibrant artwork, gradients, and detailed graphics for short and medium runs.",
  },
  {
    category: "Heat Transfer Vinyl",
    title: "Precision personalization",
    description:
      "Names, numbers, uniforms, and specialty finishes with a sharp professional look.",
  },
];

function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio__container">
        <p className="portfolio__eyebrow">Selected Work</p>

        <div className="portfolio__header">
          <h2 className="portfolio__title">
            Apparel built to <span>stand out.</span>
          </h2>

          <p className="portfolio__intro">
            A growing collection of custom apparel produced with precision,
            consistency, and attention to detail.
          </p>
        </div>

        <div className="portfolio__grid">
          {projects.map((project, index) => (
            <article className="portfolio-card" key={project.category}>
              <div className={`portfolio-card__visual portfolio-card__visual--${index + 1}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{project.category}</strong>
              </div>

              <div className="portfolio-card__content">
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <small>{project.description}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;