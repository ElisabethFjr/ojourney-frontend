import Navbar from '../Navbar/Navbar';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <h1 className="header-logo">O&apos;Journey</h1>
      <Navbar />
    </header>
  );
}

export default Header;
