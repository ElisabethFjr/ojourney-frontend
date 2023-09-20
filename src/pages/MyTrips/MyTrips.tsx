import { useState } from 'react';
import './MyTrips.scss';
import { Link } from 'react-router-dom';
import plane from '../../assets/Images/plane.png';

export default function MyTrips() {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <main>
      {darkMode ? (
        <div className="MyTrips">
          <h1>Mes Voyages</h1>
          <img className="plane" src={plane} alt="avion" />
          <p className="text">Aucun voyage disponible.</p>
          <p>Commencez en créant un nouveau voyage.</p>

          <Link to="/" className="create-trip">
            + Créer un nouveau voyage{' '}
          </Link>
        </div>
      ) : (
        <div className="MyTrips2">
          <h1>Mes Voyages</h1>
          <article className="item">
            <img className="plane2" src={plane} alt="" />
            <div className="form">
              <h1>Titre du voyage</h1>
              <h3>Creé par XXX</h3>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                molestiae fugit in saepe laudantium accusantium veritatis quidem
                cupiditate error, optio minus, magnam a temporibus consequuntur!
                Nisi maiores quas soluta alias!
              </p>
            </div>
          </article>
          <article className="item">
            <img className="plane2" src={plane} alt="" />
            <div className="form">
              <h1>Titre du voyage</h1>
              <h3>Creé par XXX</h3>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                molestiae fugit in saepe laudantium accusantium veritatis quidem
                cupiditate error, optio minus, magnam a temporibus consequuntur!
                Nisi maiores quas soluta alias!
              </p>
            </div>
          </article>
          <article className="item">
            <img className="plane2" src={plane} alt="" />
            <div className="form">
              <h1>Titre du voyage</h1>
              <h3>Creé par XXX</h3>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                molestiae fugit in saepe laudantium accusantium veritatis quidem
                cupiditate error, optio minus, magnam a temporibus consequuntur!
                Nisi maiores quas soluta alias!
              </p>
            </div>
          </article>
        </div>
      )}
      <button type="button" onClick={() => setDarkMode(!darkMode)}>
        Activer le {darkMode ? 'MyTrips2' : 'MyTrips'}
      </button>
    </main>
  );
}
