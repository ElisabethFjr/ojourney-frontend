import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkUserAuth, logout } from '../../store/reducers/user';

import './Navbar.scss';
import Button from '../../components/Button/Button';

function Navbar() {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const isAuth = useAppSelector((state) => state.user.isAuth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleBurgerMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const closeBurgerMenu = () => {
    setIsOpen(false);
  };

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
        <div className="header-navbar-list-link">
          <NavLink
            to="/signin-signup"
            className="header-navbar-list-link--signin-signup"
          >
            Se Connecter/S inscrire
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Navbar;
