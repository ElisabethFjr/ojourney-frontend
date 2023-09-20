import './Footer.scss';

function Footer() {

  const now = new Date();
  const year = now.getFullYear();

  return (
    <footer className="footer">

      <a className="liens">

      <a href="propos">A propos</a>

      <a href="contact">Contact</a>

      <a href="MentionsLegales">Mentions légales</a>

      </a>

     <p href="copyright">@ {year} O'journey - tous droits réservés</p>

    </footer>
  );

}

export default Footer;
