import { NavLink } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  return (
    <nav className="header-navbar">
      <ul className="header-navbar-list">
        <li>
          <NavLink to="/signInSignUp" className="header-navbar-list-link">
            S&apos;inscrire/Se Connecter
          </NavLink>
        </li>
        <li>
          <NavLink to="/MyTrips" className="header-navbar-list-link">
            Mes voyages
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="header-navbar-list-link">
            Nouveau voyage
          </NavLink>
        </li>
        <li>
          <NavLink to="/profil" className="header-navbar-list-link">
            Profil
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="header-navbar-list-link">
            Se déconnecter
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
