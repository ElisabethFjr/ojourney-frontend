import { Link } from 'react-router-dom';

import Main from '../../layout/Main/Main';

import './OneTrip.scss';

function OneTrip() {
  return (
    <Main>
      <div className="one-trip-container">
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
              <i className="fa-solid fa-calendar" />
              <p className="one-trip-card-date-name">date</p>
            </div>
            <div className="one-trip-card-localisation">
              <i className="fa-solid fa-location-dot" />
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
          <i className="fa-solid fa-user" />
          <i className="fa-solid fa-user" />
          <i className="fa-solid fa-user" />
          <i className="fa-solid fa-user" />
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
                  <i className="fa-solid fa-pen" />
                  <i className="fa-solid fa-trash" />
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
                <i className="fa-solid fa-location-dot" />
                <p className="one-trip-link-card-localisation-name">
                  Localisation
                </p>
              </div>
              <div className="one-trip-link-card-info">
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
      </div>
    </Main>
  );
}

export default OneTrip;
