import './App.css';
import Button from "./components/Button/Button";
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
    Philadelphia Built. Precision Printed.</p>

          <div className="hero__services" aria-label="Printing services">
            <span>Screen Printing</span>
            <span>DTF Printing</span>
            <span>Heat Transfer Vinyl</span>
          </div>

          <Button>
  Request a Quote
</Button>
        </div>
      </section>
    </main>
  );
}

export default App;