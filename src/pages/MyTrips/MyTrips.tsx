import './MyTrips.scss';
import { Link } from 'react-router-dom';
import plane from '../../assets/Images/plane.png';
import pencil from '../../assets/Images/pencil.png';
import bin from '../../assets/Images/bin.png';

export default function MyTrips() {
  return (
    <main>
      <div className="MyTrip">
        <div>
          <h1 className="MyTrip-title">Mes Voyages</h1>
        </div>
        <img className="MyTrip-plane" src={plane} alt="avion" />
        <p className="MyTrip-text">Aucun voyage disponible.</p>
        <p>Commencez en créant un nouveau voyage.</p>

        <Link to="/" className="MyTrip-button-trip">
          + Créer un nouveau voyage
        </Link>
      </div>
      <div className="MyTrips">
        <h1 className="MyTrips-title">Mes Voyages</h1>
        <article className="MyTrips-item">
          <img className="MyTrips-item-plane" src={plane} alt="" />
          <div className="MyTrips-item-form">
            <div className="MyTrips-item-bloc">
              <h1 className="MyTrips-item-bloc-title">Titre du voyage</h1>
              <div className="Mytrips-item-bloc-logo">
                <img
                  src={pencil}
                  alt="edit"
                  className="MyTrips-item-bloc-logo-one"
                />
                <img
                  src={bin}
                  alt="bin"
                  className="MyTrips-item-bloc-logo-two"
                />
              </div>
            </div>
            <h3>
              Creé par
              <Link to="/" target="_blank" rel="">
                XXX
              </Link>
            </h3>
            <p className="MyTrips-item-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              molestiae fugit in saepe laudantium accusantium veritatis quidem
              cupiditate error, optio minus, magnam a temporibus consequuntur!
              Nisi maiores quas soluta alias!
            </p>
          </div>
        </article>
        <article className="MyTrips-item">
          <img className="MyTrips-item-plane" src={plane} alt="" />
          <div className="MyTrips-item-form">
            <div className="MyTrips-item-bloc">
              <h1 className="MyTrips-item-bloc-title">Titre du voyage</h1>
              <div className="Mytrips-item-bloc-logo">
                <img
                  src={pencil}
                  alt="edit"
                  className="MyTrips-item-bloc-logo-one"
                />
                <img
                  src={bin}
                  alt="bin"
                  className="MyTrips-item-bloc-logo-two"
                />
              </div>
            </div>
            <h3>
              Creé par
              <Link to="/" target="_blank" rel="">
                XXX
              </Link>
            </h3>
            <p className="MyTrips-item-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              molestiae fugit in saepe laudantium accusantium veritatis quidem
              cupiditate error, optio minus, magnam a temporibus consequuntur!
              Nisi maiores quas soluta alias!
            </p>
          </div>
        </article>
        <article className="MyTrips-item">
          <img className="MyTrips-item-plane" src={plane} alt="" />
          <div className="MyTrips-item-form">
            <div className="MyTrips-item-bloc">
              <h1 className="MyTrips-item-bloc-title">Titre du voyage</h1>
              <div className="Mytrips-item-bloc-logo">
                <img
                  src={pencil}
                  alt="edit"
                  className="MyTrips-item-bloc-logo-one"
                />
                <img
                  src={bin}
                  alt="bin"
                  className="MyTrips-item-bloc-logo-two"
                />
              </div>
            </div>
            <h3>
              Creé par
              <Link to="/" target="_blank" rel="">
                XXX
              </Link>
            </h3>
            <p className="MyTrips-item-description">
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
