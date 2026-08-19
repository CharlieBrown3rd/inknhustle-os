import './App.css';
import Button from "./components/Button/Button";
import Navbar from "./components/Navbar/Navbar";
import About from "./sections/About/About";
import Portfolio from './sections/Portfolio/Portfolio';
import QuoteCalculator from "./sections/QuoteCalculator/QuoteCalculator";
import Services from "./sections/Services/Services";
import Contact from "./sections/Contact/Contact";
import Footer from "./components/Footer/Footer";
import AdminDashboard from "./components/Admin/AdminDashboard";
import QuoteApprovalPage from "./components/QuoteApproval/QuoteApprovalPage";

function App() {
  const isAdminRoute =
  window.location.pathname === "/admin";
  
  const isQuoteApprovalRoute =
  window.location.pathname === "/quote-approval";

  if (isQuoteApprovalRoute) {
  return <QuoteApprovalPage />;
}

if (isAdminRoute) {
  return <AdminDashboard />;
}
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
      <About/>
      <Portfolio/>
      <QuoteCalculator />
      <Contact/>
      <Footer/>
    </main>
  );
}

export default App;