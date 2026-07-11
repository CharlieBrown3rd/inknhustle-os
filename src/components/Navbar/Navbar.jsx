import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <a className="navbar__logo" href="#top" onClick={closeMenu}>
        INKN<span>HUSTLE</span>
      </a>

      <button
        className="navbar__toggle"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="primary-navigation"
        className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
        aria-label="Primary navigation"
      >
        <a href="#services" onClick={closeMenu}>
          Services
        </a>

        <a href="#portfolio" onClick={closeMenu}>
          Portfolio
        </a>

        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Navbar;