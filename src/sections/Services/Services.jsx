const services = [
  {
    title: "Screen Printing",
    description:
      "Professional bulk apparel printing with bold color, strong durability, and consistent results.",
    bestFor: "Best for teams, businesses, events, and clothing brands.",
  },
  {
    title: "DTF Printing",
    description:
      "Vibrant full-color printing for detailed artwork, gradients, and smaller production runs.",
    bestFor: "Best for custom graphics, photos, and short-run orders.",
  },
  {
    title: "Heat Transfer Vinyl",
    description:
      "Clean, durable vinyl decoration for names, numbers, uniforms, and specialty finishes.",
    bestFor: "Best for personalization and athletic apparel.",
  },
];

function Services() {
  return (
    <section className="services" id="services">
      <div className="services__container">
        <p className="services__eyebrow">What We Do</p>

        <h2 className="services__title">
          Printing built for your <span>vision.</span>
        </h2>

        <p className="services__intro">
          From one-off custom pieces to full production runs, InknHustle
          delivers apparel printing with precision and attention to detail.
        </p>

        <div className="services__grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <span className="service-card__number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <div className="service-card__divider" />

              <small>{service.bestFor}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;