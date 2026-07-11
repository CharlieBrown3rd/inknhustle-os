const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <a className="footer__logo" href="#top">
            INKN<span>HUSTLE</span>
          </a>

          <p>
            Premium custom apparel built with precision, craftsmanship, and
            hustle.
          </p>
        </div>

        <div className="footer__column">
          <h3>Explore</h3>

          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#contact">Request a Quote</a>
        </div>

        <div className="footer__column">
          <h3>Contact</h3>

          <a href="mailto:hustlehrdr75@gmail.com">
            hustlehrdr75@gmail.com
          </a>

          <span>Philadelphia, Pennsylvania</span>
          <span>INKNHustle.com</span>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {currentYear} InknHustle. All rights reserved.</p>
        <p>Print with Precision. Build with Purpose.</p>
      </div>
    </footer>
  );
}

export default Footer;