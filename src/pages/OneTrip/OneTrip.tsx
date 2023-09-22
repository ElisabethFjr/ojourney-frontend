import './OneTrip.scss';
import { Link } from 'react-router-dom';

import profil from '../../assets/images/profile.png';
import bin from '../../assets/images/bin.png';
import pencil from '../../assets/images/pencil.png';
import location from '../../assets/images/location.png';
import info from '../../assets/images/info.png';

export default function ConsulMyTrip() {
  return (
    <main>
      <section className="one-trip-container">
        {/* one-trip-card */}
        <article className="one-trip-card">
          <img
            className="one-trip-card-image"
            src="https://fastly.picsum.photos/id/664/200/200.jpg?hmac=d8ZWM7R6VABV4JdJPvmCOGPqq3E6KTIFDz-FYp73TJo"
            alt="plane"
          />
          <div className="one-trip-card-container">
            <h2 className="one-trip-card-title">Titre du voyage</h2>
            <div className="one-trip-card-date">
              <img
                className="one-trip-card-date-image"
                src={location}
                alt="date"
              />
              <p className="one-trip-card-date-name">date</p>
            </div>
            <div className="one-trip-card-localisation">
              <img
                className="one-trip-card-localisation-image"
                src={location}
                alt="localisation"
              />
              <p className="one-trip-card-localisation-name">Localisation</p>
            </div>
            <p className="one-trip-card-description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              corporis iur e p
            </p>
          </div>
        </article>
        {/* one-trip-users */}
        <div className="one-trip-users">
          <img className="one-trip-users-icon" src={profil} alt="users-icon" />
          <img className="one-trip-users-icon" src={profil} alt="users-icon" />
          <img className="one-trip-users-icon" src={profil} alt="users-icon" />
          <img className="one-trip-users-icon" src={profil} alt="users-icon" />
          <img className="one-trip-users-icon" src={profil} alt="users-icon" />
        </div>
        {/* one-trip-link */}
        <section className="one-trip-link">
          <h2 className="one-trip-link-title">Liens</h2>
          <div className="one-trip-link-header">
            <p className="one-trip-link-header-example">
              Faites une nouvelle propositions.
            </p>
            <button className="one-trip-link-header-button" type="button">
              + Ajouter un lien
            </button>
          </div>
          <article className="one-trip-link-card">
            <img
              className="one-trip-link-card-image"
              src="https://fastly.picsum.photos/id/664/200/200.jpg?hmac=d8ZWM7R6VABV4JdJPvmCOGPqq3E6KTIFDz-FYp73TJo"
              alt="plane"
            />

            <div className="one-trip-link-card-container">
              <div className="one-trip-link-card-header">
                <h3 className="one-trip-link-card-header-title">
                  Titre/description de l activité
                </h3>
                <div className="one-trip-link-card-header-icon">
                  <img
                    src={pencil}
                    alt="bin"
                    className="one-trip-link-card-header-icon-pencil"
                  />
                  <img
                    src={bin}
                    alt="bin"
                    className="one-trip-link-card-header-icon-bin"
                  />
                </div>
              </div>
              <p className="one-trip-link-card-author">
                {' '}
                Ajouté par{' '}
                <Link to="/" target="_blank" rel="">
                  XXX
                </Link>
              </p>
              <div className="one-trip-link-card-localisation">
                <img
                  className="one-trip-link-card-localisation-image"
                  src={location}
                  alt="localisation"
                />
                <p className="one-trip-link-card-localisation-name">
                  Localisation
                </p>
              </div>
              <div className="one-trip-link-card-info">
                <img
                  className="one-trip-link-card-info-image"
                  src={info}
                  alt="info"
                />
                <Link
                  to="/detail-path"
                  className="one-trip-link-card-info-example"
                >
                  Voir détail
                </Link>
              </div>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
