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
  const [tripsData, setTripsData] = useState<Trip[]>([]); // User trips data

  // Get states from Redux store
  const data = useAppSelector((state) => state.user.data);

  // let authTokens = localStorage.getItem("token")
  // ? JSON.parse(localStorage.getItem("token"))
  // : null;

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
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Create an Array of TripCard component with all trips data
  const allTrips = tripsData.map((trip) => (
    <li className="trips-list-item" key={trip.id}>
      <TripCard
        srcTripImage={`https://luciebaroiller-server.eddi.cloud:8080/images/${trip.url_image}`}
        altImage={trip.alt_image}
        authorName={`${data.firstname} ${data.lastname}`}
        description={trip.description}
        localisation={trip.localisation}
        linkHref={`/my-trip/${trip.id}`}
      />
    </li>
  ));

  return (
    <Main>
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
          <ul className="trips-list">{allTrips}</ul>
        </section>
      )}
    </Main>
  );
}

export default MyTrips;
