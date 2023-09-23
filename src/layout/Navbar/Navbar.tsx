import { NavLink } from 'react-router-dom';

import './Navbar.scss';

function Navbar() {
  return (
    <nav className="header-navbar">
      <ul className="header-navbar-list">
        <li>
          <NavLink to="/my-trips" className="header-navbar-list-link">
            Mes voyages
          </NavLink>
        </li>
        <li>
          <NavLink to="/new-trip" className="header-navbar-list-link">
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
        <li>
          <NavLink
            to="/signin-signup"
            className="header-navbar-list-link signin-signup"
          >
            Se Connecter/S&apos;inscrire
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
