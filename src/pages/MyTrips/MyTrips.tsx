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
  const [tripData, setTripData] = useState<Trip[]>([]);

  const data = useAppSelector((state) => state.user.data);

  const fetchData = async () => {
    await axiosInstance
      .get('/trips')
      .then((response) => {
        console.log(response);
        setTripData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);
  const allTrips = tripData.map((trip) => (
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

  return tripData.length === 0 ? (
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
        <Link to="/new-trip">
          <Button
            text="Nouveau voyage"
            icon="fa-solid fa-plus"
            type="button"
            customClass="color"
          />
        </Link>
      </section>
    </Main>
  ) : (
    <Main>
      <h1 className="main-title">Mes Voyages</h1>
      <section className="trips-container">
        <ul>{allTrips}</ul>
      </section>
    </Main>
  );
}

export default MyTrips;
