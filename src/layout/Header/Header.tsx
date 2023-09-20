import { Link } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import './Header.scss';

interface HeaderProps {
  homePageStyle: boolean;
}

function Header({ homePageStyle }: HeaderProps) {
  return (
    <header className={homePageStyle ? 'header header--transparent' : 'header'}>
      <h1 className="header-logo">
        <Link
          className={
            homePageStyle
              ? 'header-logo-link header-logo-link--white'
              : 'header-logo-link'
          }
          to="/"
        >
          O&apos;Journey
        </Link>
      </h1>
      <Navbar homePageStyle={homePageStyle} />
    </header>
  );
}

export default Header;
