import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-nav">
        <a className="footer-nav-link" href="/about">
          A propos
        </a>

        <a className="footer-nav-link" href="/contact">
          Contact
        </a>

        <a className="footer-nav-link" href="/legalNotice">
          Mentions légales
        </a>
      </div>

      <p className="footer-copyright">
        @ 2023 O&apos;journey - Tous droits réservés
      </p>
    </footer>
  );
}

export default Footer;
