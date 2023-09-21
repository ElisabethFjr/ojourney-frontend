import './MyTrips.scss';
import { Link } from 'react-router-dom';
import plane from '../../assets/Images/plane.png';
import pencil from '../../assets/Images/pencil.png';
import bin from '../../assets/Images/bin.png';

export default function MyTrips() {
  return (
    <main>
      <div className="trips">
        <div>
          <h1 className="trips-title">Mes Voyages</h1>
        </div>
        <img className="trips-plane" src={plane} alt="avion" />
        <p className="trips-text">Aucun voyage disponible.</p>
        <p>Commencez en créant un nouveau voyage.</p>

        <Link to="/ConsulMyTrip" className="trips-button-trip">
          + Créer un nouveau voyage
        </Link>
      </div>
      <div className="trips">
        <h1 className="trips-title">Mes Voyages</h1>
        <article className="trips-item">
          <img className="trips-item-plane" src={plane} alt="" />
          <div className="trips-item-form">
            <div className="trips-item-bloc">
              <h2 className="trips-item-bloc-title">Titre du voyage</h2>
              <div className="trips-item-bloc-logo">
                <Link to="/ConsulMyTrip">
                  <img
                    src={pencil}
                    alt="edit"
                    className="trips-item-bloc-logo-one"
                  />
                </Link>
                <img src={bin} alt="bin" className="trips-item-bloc-logo-two" />
              </div>
            </div>
            <h3>
              Creé par
              <Link to="/" target="_blank" rel="">
                XXX
              </Link>
            </h3>
            <p className="trips-item-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              molestiae fugit in saepe laudantium accusantium veritatis quidem
              cupiditate error, optio minus, magnam a temporibus consequuntur!
              Nisi maiores quas soluta alias!
            </p>
          </div>
        </article>
        <article className="trips-item">
          <img className="trips-item-plane" src={plane} alt="" />
          <div className="trips-item-form">
            <div className="trips-item-bloc">
              <h1 className="trips-item-bloc-title">Titre du voyage</h1>
              <div className="trips-item-bloc-logo">
                <Link to="/ConsulTrip">
                  <img
                    src={pencil}
                    alt="edit"
                    className="trips-item-bloc-logo-one"
                  />
                </Link>
                <img src={bin} alt="bin" className="trips-item-bloc-logo-two" />
              </div>
            </div>
            <h3>
              Creé par
              <Link to="/" target="_blank" rel="">
                XXX
              </Link>
            </h3>
            <p className="trips-item-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              molestiae fugit in saepe laudantium accusantium veritatis quidem
              cupiditate error, optio minus, magnam a temporibus consequuntur!
              Nisi maiores quas soluta alias!
            </p>
          </div>
        </article>
        <article className="trips-item">
          <img className="trips-item-plane" src={plane} alt="" />
          <div className="trips-item-form">
            <div className="trips-item-bloc">
              <h1 className="trips-item-bloc-title">Titre du voyage</h1>
              <div className="trips-item-bloc-logo">
                <Link to="/ConsulTrip">
                  <img
                    src={pencil}
                    alt="edit"
                    className="trips-item-bloc-logo-one"
                  />
                </Link>
                <img src={bin} alt="bin" className="trips-item-bloc-logo-two" />
              </div>
            </div>
            <h3>
              Creé par
              <Link to="/" target="_blank" rel="">
                XXX
              </Link>
            </h3>
            <p className="trips-item-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              molestiae fugit in saepe laudantium accusantium veritatis quidem
              cupiditate error, optio minus, magnam a temporibus consequuntur!
              Nisi maiores quas soluta alias!
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
