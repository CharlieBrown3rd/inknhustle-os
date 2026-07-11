import './App.css';
import Button from "./components/Button/Button";
import Navbar from "./components/Navbar/Navbar";
import Portfolio from './sections/Portfolio/Portfolio';
import Services from "./sections/Services/Services";
import Contact from "./sections/Contact/Contact";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <main id="top">
      <Navbar/>

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

          <Button href="#contact">Request a Quote</Button>
        </div>
      </section>
      <Services/>
      <Portfolio/>
      <Contact/>
      <Footer/>
    </main>
  );
}

export default App;