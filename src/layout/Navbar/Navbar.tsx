import { NavLink } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  return (
    <nav className="header-navbar">
      <ul className="header-navbar-list">
        <li>
          <NavLink to="/signInSignUp">S&apos;inscrire/Se Connecter</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
