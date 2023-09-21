import './ConsulMyTrip.scss';
import { Link } from 'react-router-dom';

import plane from '../../assets/Images/plane.png';
import profil from '../../assets/Images/profile.png';
import bin from '../../assets/Images/bin.png';
import pencil from '../../assets/Images/pencil.png';
import location from '../../assets/Images/location.png';
import info from '../../assets/Images/info.png';

export default function ConsulMyTrip() {
  return (
    <main className="Detail-Trip">
      <article className="item">
        <img className="item-img" src={plane} alt="plane" />
        <div className="bloc">
          <h1 className="bloc-title">Titre du voyage</h1>
          <p>date</p>
          <div className="localisation-bloc-1">
            <img
              className="location-bloc-1-img"
              src={location}
              alt="localisation"
            />
            <p>Localisation</p>
          </div>

          <p className="item-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            corporis iur e p
          </p>
        </div>
      </article>
      <div className="Detail-Trip-User">
        <img className="Detail-Trip-User-Img" src={profil} alt="profil-user" />
        <img className="Detail-Trip-User-Img" src={profil} alt="profil-user" />
        <img className="Detail-Trip-User-Img" src={profil} alt="profil-user" />
        <img className="Detail-Trip-User-Img" src={profil} alt="profil-user" />
        <img className="Detail-Trip-User-Img" src={profil} alt="profil-user" />
      </div>

      <div className="links-trip">
        <p className="title-links-trip">Liens</p>

        <div className="Add-Links-Trip">
          <p className="Proposals-Links-Trip">
            Faites une nouvelle propositions.
          </p>

          <button className="button-links-trip" type="button">
            + Ajouter un lien
          </button>
        </div>

        <article className="Activity-Description">
          <img className="item-img" src={plane} alt="plane" />

          <div className="Activity-information">
            <div className="title-icon-activity">
              <p className="title-activity">Titre/description de l activité</p>
              <div className="icon-Activity">
                <img
                  src={pencil}
                  alt="pencil"
                  className="trips-item-bloc-logo-one"
                />
                <img src={bin} alt="bin" className="trips-item-bloc-logo-two" />
              </div>
            </div>
            <p className="Add-Activity-User">
              {' '}
              Ajouté par{' '}
              <Link to="/" target="_blank" rel="">
                XXX
              </Link>
            </p>
            <div className="location-bloc">
              <img className="location-img" src={location} alt="localisation" />
              <p className="location">Localisation</p>
            </div>
            <div className="info-bloc">
              <img className="info-img" src={info} alt="info" />
              <p className="external-links">Voir détail</p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
