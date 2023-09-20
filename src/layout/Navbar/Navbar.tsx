import { NavLink } from 'react-router-dom';
import './Navbar.scss';

interface NavbarProps {
  homePageStyle: boolean;
}

function Navbar({ homePageStyle }: NavbarProps) {
  return (
    <nav className="header-navbar">
      <ul className="header-navbar-list">
        <li>
          <NavLink
            to="/"
            className={
              homePageStyle
                ? 'header-navbar-list-link header-navbar-list-link--white'
                : 'header-navbar-list-link'
            }
          >
            Mes voyages
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={
              homePageStyle
                ? 'header-navbar-list-link header-navbar-list-link--white'
                : 'header-navbar-list-link'
            }
          >
            Nouveau voyage
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={
              homePageStyle
                ? 'header-navbar-list-link header-navbar-list-link--white'
                : 'header-navbar-list-link'
            }
          >
            Profil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={
              homePageStyle
                ? 'header-navbar-list-link header-navbar-list-link--white'
                : 'header-navbar-list-link'
            }
          >
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
