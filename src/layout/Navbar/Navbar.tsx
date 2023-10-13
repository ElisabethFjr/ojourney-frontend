// Import React Hooks
import { useState, useEffect } from 'react';
// Import React-Router-Dom
import { NavLink } from 'react-router-dom';
// Import Redux Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// Import Redux Actions
import { checkUserAuth, logout } from '../../store/reducers/user';
// Import Styles
import './Navbar.scss';

function Navbar() {
  // Initialize Hooks
  const dispatch = useAppDispatch();

  // Declaration state variable
  const [isOpen, setIsOpen] = useState(false);

  // Check the connected user's information for authentication (token or cookies in headers), if ok dispatch the user's data
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  // Fetch Redux States
  const isAuth = useAppSelector((state) => state.user.isAuth);

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  // Handle Toggle Menu Burger
  const toggleBurgerMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Close the Burger Menu
  const closeBurgerMenu = () => {
    setIsOpen(false);
  };

  // Add a click outise to close the menu
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
          {isAuth ? (
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
        arial-label="Menu des liens de navigations"
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
