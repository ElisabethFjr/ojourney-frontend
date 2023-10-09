import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchUserInfos } from '../../store/reducers/user';

import Main from '../../layout/Main/Main';
import TripCard from '../../components/TripCard/TripCard';
import Button from '../../components/Button/Button';

import travel from '../../assets/images/travel.png';

import './MyTrips.scss';

function MyTrips() {
  // Initialize Hooks
  const dispatch = useAppDispatch();

  // Fetch states from Redux store
  const userData = useAppSelector((state) => state.user.data); // User data
  const trips = useAppSelector((state) => state.user.data.trips); // User trips data

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

  return (
    <Main>
      <h1 className="main-title">Mes Voyages</h1>

      {/* Conditional rendering based on the trips's length */}
      {trips && trips.length === 0 ? (
        // Display No Trips
        <section className="no-trip-container">
          <img
            className="no-trip-image"
            src={travel}
            alt="O'Journey plane travelling"
            crossOrigin="anonymous"
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
