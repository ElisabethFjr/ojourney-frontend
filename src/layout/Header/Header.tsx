// Import React-Router_dom
import { Link } from 'react-router-dom';
// Import Component NavBar
import Navbar from '../Navbar/Navbar';
// Import Logo
import logo from '../../assets/logo/logo.png';
// Import Styles
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
