import './Footer.scss';

interface FooterProps {
  homePageStyle: boolean;
}

function Footer({ homePageStyle }: FooterProps) {
  return (
    <footer className={homePageStyle ? 'footer footer--transparent' : 'footer'}>
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
