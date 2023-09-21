import Main from '../../layout/Main/Main';
import ButtonColor from '../../components/ButtonColor/ButtonColor';

import plane from '../../assets/images/plane.png';
import pencil from '../../assets/images/pencil.png';
import bin from '../../assets/images/bin.png';

import './MyTrips.scss';
import TripCard from '../../components/TripCard/TripCard';

export default function MyTrips() {
  return (
    <Main>
      <h1 className="mytrips-title">Mes Voyages</h1>
      <section className="no-trip-container">
        <img className="no-trip-image" src={plane} alt="avion" />
        <p className="no-trip-message">Aucun voyage disponible.</p>
        <p className="no-trip-instruction">
          Commencez en créant un nouveau voyage.
        </p>
        <ButtonColor text="Créer un nouveau voyage" to="/createTrip" />
        <TripCard
          srcTripImage="https://storage.googleapis.com/twg-content/original_images/Insights_Voyage_2019_Think_with_Google_France-compressed.jpg"
          altImage="O'Jouney colorado van"
          authorName="Bidule"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          tripTitle="Voyage aux States"
        />
        <TripCard
          srcTripImage="https://storage.googleapis.com/twg-content/original_images/Insights_Voyage_2019_Think_with_Google_France-compressed.jpg"
          altImage="O'Jouney colorado van"
          authorName="Bidule"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          tripTitle="Voyage aux States"
        />
        <TripCard
          srcTripImage="https://storage.googleapis.com/twg-content/original_images/Insights_Voyage_2019_Think_with_Google_France-compressed.jpg"
          altImage="O'Jouney colorado van"
          authorName="Bidule"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco"
          tripTitle="Voyage aux States"
        />
      </section>
    </Main>
  );
}
