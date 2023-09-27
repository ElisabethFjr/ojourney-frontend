import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/reducers/user';

import './Navbar.scss';

function Navbar() {
  // Initialize Hooks
  const dispatch = useAppDispatch();

  // Get state from Redux
  const isConnected = useAppSelector((state) => state.user.isConnected);
  console.log('Est connecté !', isConnected);

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="header-navbar">
      <ul className="header-navbar-list">
        {isConnected ? (
          <>
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
              <NavLink
                to="/"
                className="header-navbar-list-link signin-signup"
                onClick={handleLogout}
              >
                Se déconnecter
              </NavLink>
            </li>
          </>
        ) : (
          <li>
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
  );
}

export default Navbar;
