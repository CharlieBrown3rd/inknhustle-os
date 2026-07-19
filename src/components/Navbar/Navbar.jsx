function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        INKN<span>HUSTLE</span>
      </div>

      <div className="navbar__links">
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;