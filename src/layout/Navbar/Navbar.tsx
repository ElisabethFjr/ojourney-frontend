import './Navbar.scss';

function Navbar() {
  return (
    <nav className="header-navbar">
      <ul className="header-navbar-list">
        <li>
          <a className="header-navbar-list-link" href="/profil">
            Mes voyages
          </a>
        </li>
        <li>
          <a className="header-navbar-list-link" href="/voyages">
            Nouveau voyage
          </a>
        </li>
        <li>
          <a className="header-navbar-list-link" href="/voyages">
            Profil
          </a>
        </li>
        <li>
          <a className="header-navbar-list-link" href="/avion">
            Se déconnecter
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
