import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';

import TripCard from '../../components/TripCard/TripCard';
import Button from '../../components/Button/Button';
import ModalDeleteConfirmation from '../../components/ModalDeleteConfirmation/ModalDeleteConfirmation';

import travel from '../../assets/images/travel.png';

import { Trip } from '../../@types';

import './MyTrips.scss';

function MyTrips() {
  // Declaration state variables
  const [tripsData, setTripsData] = useState<Trip[]>([]); // User trips data

  // Get states from Redux store
  const data = useAppSelector((state) => state.user.data);

  // Function to fetch all trips data from the server with awiosInstance
  const fetchData = async () => {
    await axiosInstance
      .get('/trips')
      .then((response) => {
        console.log(response);
        setTripsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Fetch trips data when component mounts
  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Create an Array of TripCard component with all trips data
  const allTrips = tripsData.map((trip) => (
    <li key={trip.id}>
      <TripCard
        srcTripImage={trip.url_image}
        altImage="O'Jouney"
        authorName={`${data.firstname} ${data.lastname}`}
        description={trip.description}
        localisation={trip.localisation}
        linkHref={`/my-trip/${trip.id}`}
      />
    </li>
  ));

  return (
    <Main>
      {/* <ModalDeleteConfirmation
        title="Confirmation suppression"
        text="Êtes-vous sûr de vouloir supprimer ce voyage ?"
      /> */}
      <h1 className="main-title">Mes Voyages</h1>

      {/* Conditional rendering based on the tripsData's length */}
      {tripsData.length === 0 ? (
        // Display No Trips
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
          <ul>{allTrips}</ul>
        </section>
      )}
    </Main>
  );
}

export default MyTrips;
