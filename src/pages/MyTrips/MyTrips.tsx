import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';

import TripCard from '../../components/TripCard/TripCard';
import Button from '../../components/Button/Button';

import travel from '../../assets/images/travel.png';

import { Trip } from '../../@types';

import './MyTrips.scss';

function MyTrips() {
  // Declaration state variables
  const [trips, setTrips] = useState<Trip[]>([]); // User trips data

  // Fetch states from Redux store
  const userData = useAppSelector((state) => state.user.data); // User data

  // Function to fetch all trips data from the server with awiosInstance
  const fetchData = async () => {
    await axiosInstance
      .get('/trips', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${
            localStorage.getItem('token')?.replace(/"|_/g, '') || ''
          }`,
        },
      })
      .then((response) => {
        setTrips(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Fetch trips data when component mounts
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Display a list of all trips from the trips array fetch to the API
  const allTrips = trips.map((trip) => (
    <li className="trips-list-item" key={trip.id}>
      <TripCard
        srcTripImage={`https://luciebaroiller-server.eddi.cloud:8080/images/${trip.url_image}`}
        altImage={trip.alt_image}
        authorName={`${userData.firstname} ${userData.lastname}`}
        description={trip.description}
        localisation={trip.localisation}
        linkHref={`/my-trip/${trip.id}`}
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
          <ul className="trips-list">{allTrips}</ul>
        </section>
      )}
    </Main>
  );
}

export default MyTrips;
