import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <h1 className="header-logo">
        <Link className="header-logo-link" to="/">
          O&apos;Journey
        </Link>
      </h1>
      <Navbar />
    </header>
  );
}

export default Header;
