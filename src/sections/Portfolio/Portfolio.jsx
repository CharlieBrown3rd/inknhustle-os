import "./Portfolio.css";

const projects = [
  {
    title: "Screen Printing",
    description: "High-quality multi-color apparel printing.",
  },
  {
    title: "DTF Printing",
    description: "Full-color transfers with vibrant detail.",
  },
  {
    title: "Heat Transfer Vinyl",
    description:
      "Durable custom names, numbers, and specialty graphics.",
  },
];

function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-container">
        <span className="portfolio-eyebrow">OUR WORK</span>

        <h2>Portfolio</h2>

        <p className="portfolio-intro">
          Every project represents our commitment to quality,
          precision, and craftsmanship. More featured work is coming
          soon.
        </p>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <article className="portfolio-card" key={project.title}>
              <div className="portfolio-image">Coming Soon</div>

              <h3>{project.title}</h3>

              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Portfolio;