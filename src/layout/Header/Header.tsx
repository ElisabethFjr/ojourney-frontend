import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';

import logo from '../../assets/logo/logo.png';

import './Header.scss';

function Header() {
  return (
    <header className="header">
      <Link className="header-logo-link" to="/">
        <img src={logo} className="header-logo" alt="O'Journey Logo" />
      </Link>
      <Navbar />
    </header>
  );
}

export default Header;
