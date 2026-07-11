function Button({ children, href, type = "button", onClick }) {
  if (href) {
    return (
      <a className="hero__button" href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className="hero__button" type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;