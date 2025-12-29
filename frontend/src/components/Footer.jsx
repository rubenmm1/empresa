import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        Trabajo realizado por <strong>Rubén Martín Méndez</strong>
      </p>

      <div className="footer-info">
        <p>📧 Email: rubenmartin2512@gmail.com</p>
        <p>📞 Teléfono: 652 55 94 81</p>
      </div>

      <div className="footer-social">
        <span>🌐 Redes sociales:</span>
        <a
          href="https://www.linkedin.com/in/rubenmartin2512/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/rubenmm1"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
