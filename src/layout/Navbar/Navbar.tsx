// Import React Hooks
import React, { useState, useEffect } from 'react';
// Import React-Router-Dom
import { NavLink } from 'react-router-dom';
// Import Redux Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// Import Redux Actions
import { checkUserAuth, logout } from '../../store/reducers/user';

import './Navbar.scss';

function Navbar() {
  // Initialize Hooks
  const dispatch = useAppDispatch();
  // Declaration State Variables
  const [isOpen, setIsOpen] = useState(false);
  // Check user authentication status
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);
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
            <li className="header-navbar-list-link">
              <NavLink to="/my-trips">Mes voyages</NavLink>
            </li>
            <li className="header-navbar-list-link">
              <NavLink to="/new-trip">Nouveau voyage</NavLink>
            </li>
            <li className="header-navbar-list-link">
              <NavLink to="/profil">Profil</NavLink>
            </li>
            <li className="header-navbar-list-link">
              <NavLink
                to="/"
                onClick={handleLogout}
                className="header-navbar-list-link--logout"
              >
                Se déconnecter
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {isAuth && (
        <button
          className="header-navbar-toggle"
          type="button"
          onClick={toggleBurgerMenu}
          aria-label="Menu des liens de navigations"
        >
          <i
            className={`header-navbar-toggle-icon fa-solid  ${
              isOpen ? 'fa-xmark' : 'fa-bars'
            }`}
          />
        </button>
      )}
      {!isAuth && (
        <div className={`header-navbar-list-link ${isOpen ? '' : 'oui'}`}>
          <NavLink
            to="/signin-signup"
            className="header-navbar-list-link--signin-signup none"
          >
            <i className="fa-solid fa-right-to-bracket" />
            <span className="text-disconnected">
              &nbsp;Se Connecter/S &apos;inscrire
            </span>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Navbar;
