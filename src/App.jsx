import './App.css';

function App() {
  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Premium Custom Apparel</p>

          <h1 className="hero__title">
            INKN<span>HUSTLE</span>
          </h1>

          <p className="hero__tagline">
            Ink your vision. We print your hustle.
          </p>

          <div className="hero__services" aria-label="Printing services">
            <span>Screen Printing</span>
            <span>DTF Printing</span>
            <span>Heat Transfer Vinyl</span>
          </div>

          <a className="hero__button" href="#contact">
            Request a Quote
          </a>
        </div>
      </section>
    </main>
  );
}

export default App;