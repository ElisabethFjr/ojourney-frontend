// Import React Hooks
import React, { useState, useEffect } from 'react';
// Import React-Router-Dom
import { NavLink } from 'react-router-dom';
// Import Redux Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// Import Redux Actions
import { logout } from '../../store/reducers/user';

import './Navbar.scss';

function Navbar() {
  // Initialize Hooks
  const dispatch = useAppDispatch();
  // Declaration State Variables
  const [isOpen, setIsOpen] = useState(false);
  // Get the authentication status from Redux state
  const isAuth = useAppSelector((state) => state.user.isAuth);
  // Handle user logout
  const handleLogout = () => {
    dispatch(logout());
  };
  // Toggle the burger menu
  const toggleBurgerMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };
  // Close the burger menu
  const closeBurgerMenu = () => {
    setIsOpen(false);
  };
  // Add a click event listener to close the menu
  useEffect(() => {
    document.body.addEventListener('click', closeBurgerMenu);

    return () => {
      document.body.removeEventListener('click', closeBurgerMenu);
    };
  }, []);

  return (
    <div>
      {isAuth && (
        <nav className={`header-navbar ${isOpen ? 'active' : ''}`}>
          <ul className="header-navbar-list">
            <NavLink to="/my-trips" className="header-navbar-list-link">
              <li>Mes voyages</li>
            </NavLink>
            <NavLink to="/new-trip" className="header-navbar-list-link">
              <li>Nouveau voyage</li>
            </NavLink>
            <NavLink to="/profil" className="header-navbar-list-link">
              <li>Profil</li>
            </NavLink>
            <NavLink
              to="/"
              onClick={handleLogout}
              className="header-navbar-list-link--logout "
            >
              <li>Se déconnecter </li>
            </NavLink>
          </ul>
        </nav>
      )}
      {isAuth && (
        <button
          className="header-navbar-toggle"
          type="button"
          onClick={toggleBurgerMenu}
          aria-label="Menu des liens de navigations"
          title="Menu"
        >
          <i
            className={`header-navbar-toggle-icon fa-solid  ${
              isOpen ? 'fa-xmark' : 'fa-bars'
            }`}
          />
        </button>
      )}
      {!isAuth && (
        <div className="header-navbar-list-link">
          <NavLink
            to="/signin-signup"
            className="header-navbar-list-link--signin-signup none"
            aria-label="Se Connecter/S'inscrire"
            title="Se Connecter/S'inscrire"
          >
            <i className="fa-solid fa-right-to-bracket" />
            <span className="text-disconnected">
              Se Connecter/S &apos;inscrire
            </span>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Navbar;
