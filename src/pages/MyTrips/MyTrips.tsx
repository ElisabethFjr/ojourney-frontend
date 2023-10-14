// Import React Hook
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import Custom Redux Hook
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserInfos } from '../../store/reducers/user';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import TripCard from '../../components/TripCard/TripCard';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';

// Import Image
import travel from '../../assets/images/travel.png';

// Import Styles
import './MyTrips.scss';

function MyTrips() {
  // Initialize Hooks
  const dispatch = useAppDispatch();

  // Fetch states from Redux store
  const userData = useAppSelector((state) => state.user.data); // User data
  const trips = useAppSelector((state) => state.user.data.trips); // User trips data
  const isLoading = useAppSelector((state) => state.user.isLoading); // Loading state

  useEffect(() => {
    dispatch(fetchUserInfos(userData.id));
  }, [dispatch, userData.id]);

  // Display a list of all trips from the trips array fetch to the API
  const allTrips = trips.map((trip) => (
    <li className="trips-list-item" key={trip.id}>
      <TripCard
        key={trip.id}
        id={trip.id}
        srcTripImage={trip.url_image}
        altImage={trip.alt_image}
        description={trip.description}
        localisation={trip.localisation}
        linkHref={`/my-trip/${trip.id}`}
        user_id={trip.user_id}
      />
    </li>
  ));

  return isLoading ? (
    <Loading />
  ) : (
    <Main>
      <h1 className="main-title">Mes Voyages</h1>

      {/* Conditional rendering based on the trips's length */}
      {trips && trips.length === 0 ? (
        // Display No Trips
        <section className="no-trip-container">
          <img
            className="no-trip-image"
            src={travel}
            alt="O'Journey en voyage en avion"
            crossOrigin="anonymous"
            width="128"
            height="128"
          />
          <p className="no-trip-message">Aucun voyage disponible.</p>
          <p className="no-trip-instruction">
            Commencez en créant un nouveau voyage.
          </p>
          <Link to="/new-trip">
            <Button
              text="Nouveau voyage"
              icon="fa-solid fa-plus"
              type="button"
              customClass="color"
            />
          </Link>
        </section>
      ) : (
        // Display Trips
        <section className="trips-container">
          <div className="trips-btn">
            <Link to="/new-trip">
              <Button
                text="Nouveau voyage"
                icon="fa-solid fa-plus"
                type="button"
                customClass="color"
              />
            </Link>
          </div>
          <ul className="trips-list">{allTrips}</ul>
        </section>
      )}
    </Main>
  );
}

export default MyTrips;
