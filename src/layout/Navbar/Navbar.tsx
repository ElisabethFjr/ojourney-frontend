import { NavLink } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  return (
    <nav className="header-navbar">
      <ul className="header-navbar-list">
        <li>
          <NavLink to="/myTrips" className="header-navbar-list-link">
            Mes voyages
          </NavLink>
        </li>
        <li>
          <NavLink to="/newTrip" className="header-navbar-list-link">
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
            to="/signInSignUp"
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
