import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../store/reducers/user'; 

import './Navbar.scss';

function Navbar() {
  // Initialize Hooks
  const dispatch = useAppDispatch();

  // Get state from Redux 
  const pseudo = useAppSelector((state) => state.user.data.pseudo) as string | null;
  console.log("Valeur actuelle du pseudo:", pseudo);

  
  // Handle Logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="header-navbar">
      <ul className="header-navbar-list">
      {pseudo ? ( 
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
            <NavLink to="/signin-signOut" className="header-navbar-list-link signin-signup" onClick={handleLogout}>
              Se déconnecter
            </NavLink>
          </li>
          </>
        ) : (
          <li>
            <NavLink to="/signin-signup" className="header-navbar-list-link signin-signup">
              Se Connecter/S'inscrire
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;