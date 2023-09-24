import Main from '../../layout/Main/Main';

import ButtonColor from '../../components/Button/ButtonColor/ButtonColor';
import TripCard from '../../components/TripCard/TripCard';

import travel from '../../assets/images/travel.png';

import './MyTrips.scss';

function MyTrips() {
  return (
    <Main>
      <h1 className="main-title">Mes Voyages</h1>
      <section className="no-trip-container">
        <img
          className="no-trip-image"
          src={travel}
          alt="O'Journey plane travelling"
        />
        <p className="no-trip-message">Aucun voyage disponible.</p>
        <p className="no-trip-instruction">
          Commencez en créant un nouveau voyage.
        </p>
        <ButtonColor
          text="Nouveau voyage"
          to="/new-trip"
          icon="fa-solid fa-plus"
        />
      </section>
      <section className="trips-container">
        <TripCard
          srcTripImage="https://storage.googleapis.com/twg-content/original_images/Insights_Voyage_2019_Think_with_Google_France-compressed.jpg"
          altImage="O'Jouney colorado van"
          authorName="Bidule"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          tripTitle="Voyage au Canada"
        />
      </section>
    </Main>
  );
}

export default MyTrips;
