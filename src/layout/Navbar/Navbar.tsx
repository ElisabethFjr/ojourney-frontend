import './Navbar.scss';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="/profil">Mes voyages</a>
        </li>
        <li>
          <a href="/voyages">Nouveau voyage</a>
        </li>
        <li>
          <a href="/voyages">Profil</a>
        </li>
        <li>
          <a href="/avion">Se déconnecter</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
