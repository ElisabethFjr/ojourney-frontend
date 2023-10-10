import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/reducers/user';

import './Navbar.scss';

function Navbar() {
  // Initialize Hooks
  const dispatch = useAppDispatch();

  // Declaration state variable
  const [isOpen, setIsOpen] = useState(false);

  // Get state from Redux
  const isConnected = useAppSelector((state) => state.user.isConnected);

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  // Handle Toggle Menu Burger
  const toggleBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`header-navbar ${isOpen ? 'active' : ''}`}>
        <ul className="header-navbar-list">
          {isConnected ? (
            <>
              <li className="header-navbar-list-link">
                <NavLink to="/my-trips" onClick={toggleBurgerMenu}>
                  Mes voyages
                </NavLink>
              </li>
              <li className="header-navbar-list-link">
                <NavLink to="/new-trip" onClick={toggleBurgerMenu}>
                  Nouveau voyage
                </NavLink>
              </li>
              <li className="header-navbar-list-link">
                <NavLink
                  to="/profil"
                  className="header-navbar-list-link"
                  onClick={toggleBurgerMenu}
                >
                  Profil
                </NavLink>
              </li>
              <li className="header-navbar-list-link">
                <NavLink
                  to="/"
                  className="header-navbar-list-link"
                  onClick={handleLogout}
                >
                  Se déconnecter
                </NavLink>
              </li>
            </>
          ) : (
            <li className="header-navbar-list-link">
              <NavLink
                to="/signin-signup"
                className="header-navbar-list-link signin-signup"
              >
                Se Connecter/S&apos;inscrire
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <button
        className="header-navbar-toggle"
        type="button"
        onClick={toggleBurgerMenu}
      >
        <i
          className={`header-navbar-toggle-icon fa-solid  ${
            isOpen ? 'fa-xmark' : 'fa-bars'
          }`}
        />
      </button>
    </>
  );
}

export default Navbar;
