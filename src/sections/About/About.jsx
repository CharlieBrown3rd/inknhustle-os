import "./About.css";
import About from "./sections/About/About";
function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-heading">
          <span className="about-eyebrow">ABOUT INKNHUSTLE</span>

          <h2>
            Built on Hustle.
            <br />
            Driven by Precision.
          </h2>
        </div>

        <div className="about-content">
          <p>
            InknHustle is a Philadelphia-based custom apparel studio
            specializing in screen printing, DTF printing, and heat transfer
            vinyl.
          </p>

          <p>
            We help businesses, clothing brands, organizations, and
            individuals turn their ideas into professionally printed apparel.
            Every project is approached with careful preparation, accurate
            placement, strong color, and close attention to detail.
          </p>

          <p>
            Whether you need a small custom order, merchandise for your brand,
            uniforms for your team, or apparel for an upcoming event, our goal
            is simple: deliver dependable service and finished products you are
            proud to wear.
          </p>

          <p className="about-statement">
            Your vision. Your hustle. Printed with purpose.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;