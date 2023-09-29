import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';

import PropositionCard from '../../components/PropositionCard/PropositionCard';
// import PropositionCard from '../../components/PropositionCard/PropositionCard';
import InviteMember from '../../components/ModalInviteMember/ModalInviteMember';
import Button from '../../components/Button/Button';

import { Trip, Member, Proposition } from '../../@types';

import './OneTrip.scss';

function OneTrip() {
  const [trip, setTrip] = useState<Trip>(Object);
  const [members, setMembers] = useState<Member[]>([]);
  const [propositions, setPropositions] = useState<Proposition[]>([]);

  const dataUser = useAppSelector((state) => state.user.data);

  const { id } = useParams();

  const fetchDataTrip = async () => {
    await axiosInstance
      .get(`/trips/${id}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${
            localStorage.getItem('token')?.replace(/"|_/g, '') || ''
          }`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTrip(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    await axiosInstance
      .get(`/trips/${id}/members`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${
            localStorage.getItem('token')?.replace(/"|_/g, '') || ''
          }`,
        },
      })
      .then((response) => {
        setMembers(response.data);
      });
  };
  const fetchDataLink = async () => {
    await axiosInstance
      .get(`/trips/${id}/links`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${
            localStorage.getItem('token')?.replace(/"|_/g, '') || ''
          }`,
        },
      })
      .then((response) => {
        setPropositions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const allMembers = members.map((member) => (
    <li key={member.id}>
      <i className="fa-solid fa-user one-trip-members-icon" />
    </li>
  ));

  // const allLinks = propositions.forEach((proposition) => (
  //   <li key={proposition.id}>
  //     <PropositionCard
  //       previewImageUrl="https://www.raftbanff.com/Portals/0/EasyDNNNews/44/1000600p702EDNmainHydra--Georgia-Russell-9996-2.jpg"
  //       altImage="Rafting au Canada"
  //       title={proposition.description}
  //       authorName="Blablabla"
  //       localisation={proposition.localisation}
  //       url={proposition.url}
  //       id_trip={proposition.trip_id}
  //       id_link={proposition.id}
  //     />
  //   </li>
  // ));

  useEffect(() => {
    try {
      fetchDataTrip();
      fetchDataLink();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Main>
      <section className="one-trip-overview">
        <img
          className="one-trip-overview-image"
          src={`https://luciebaroiller-server.eddi.cloud:8080/images/${trip.url_image}`}
          alt={trip.alt_image}
        />
        <div className="one-trip-overview-container">
          <h1 className="one-trip-overview-title">{trip.localisation}</h1>
          <div className="one-trip-overview-date">
            <i className="fa-solid fa-calendar" />
            <p className="one-trip-overview-date-name">
              {trip.date_start} - {trip.date_end}
            </p>
          </div>
          <div className="one-trip-overview-localisation">
            <i className="fa-solid fa-location-dot" />
            <p className="one-trip-overview-localisation-name">
              {trip.localisation}
            </p>
          </div>
          <p className="one-trip-overview-description">{trip.description}</p>
          <div className="one-trip-overview-buttons">
            <Button
              text="Editer"
              icon="fa-solid fa-pen"
              type="button"
              customClass="outline"
            />
            <Button
              text="Supprimer"
              icon="fa-solid fa-trash"
              type="button"
              customClass="outline"
            />
          </div>
        </div>
      </section>

      <section className="one-trip-members">
        <Button
          onClick={InviteMember}
          text="Ajouter"
          icon="fa-solid fa-user-plus"
          type="button"
          customClass="color"
        />

        {members.length === 0 ? (
          <p> Aucun member pour le moment </p>
        ) : (
          <ul>{allMembers}</ul>
        )}
      </section>

      <section className="one-trip-propositions">
        <h2 className="one-trip-propositions-title">Propositions</h2>
        <div className="one-trip-propositions-add-container">
          <p className="one-trip-propositions-add-text">
            Faites une nouvelle proposition.
          </p>
          <Link to={`/new-proposition/${id}`}>
            <Button
              text="Nouvelle proposition"
              icon="fa-solid fa-plus"
              type="button"
              customClass="color"
            />
          </Link>
        </div>
        {propositions.length === 0 ? (
          <p>Aucune proposition n&paos;a été ajoutée pour le moment !</p>
        ) : (
          <ul>
            {propositions.map((proposition) => (
              <li key={proposition.id}>
                <PropositionCard
                  previewImageUrl="https://www.raftbanff.com/Portals/0/EasyDNNNews/44/1000600p702EDNmainHydra--Georgia-Russell-9996-2.jpg"
                  altImage="Rafting au Canada"
                  title={proposition.description}
                  authorName="Blablabla"
                  localisation={proposition.localisation}
                  url={proposition.url}
                  id_trip={proposition.trip_id}
                  id_link={proposition.id}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </Main>
  );
}

export default OneTrip;
