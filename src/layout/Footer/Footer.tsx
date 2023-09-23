import { Link } from 'react-router-dom';

import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-nav">
        <Link className="footer-nav-link" to="/about">
          A propos
        </Link>

        <Link className="footer-nav-link" to="/contact">
          Contact
        </Link>

        <Link className="footer-nav-link" to="/terms">
          Mentions légales
        </Link>
      </div>

      <p className="footer-copyright">
        @ 2023 O&apos;journey - Tous droits réservés
      </p>
    </footer>
  );
}

export default Footer;
