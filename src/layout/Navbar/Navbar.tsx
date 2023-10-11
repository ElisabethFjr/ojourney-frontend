import { useState, useEffect } from 'react';
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
    <>
      <nav className={`header-navbar ${isOpen ? 'active' : ''}`}>
        <ul className="header-navbar-list">
          {isConnected ? (
            <>
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
            </>
          ) : (
            <li className="header-navbar-list-link">
              <NavLink
                to="/signin-signup"
                className="header-navbar-list-link--signin-signup"
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
