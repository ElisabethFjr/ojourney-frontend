import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { isValid, parseISO } from 'date-fns';
import format from 'date-fns/format';
import { useAppSelector } from '../../hooks/redux';
import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';

import PropositionCard from '../../components/PropositionCard/PropositionCard';
import Button from '../../components/Button/Button';
import MemberMenu from '../../components/MemberMenu/MemberMenu';

import { Trip, Member, Proposition } from '../../@types';

import './OneTrip.scss';

function OneTrip() {
  const [trip, setTrip] = useState<Trip>(Object);
  const [propositions, setPropositions] = useState<Proposition[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  // Event handler : on a click on a member, it opens a pop-up menu
  const toggleMenuMember = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const handleCloseMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  // const handleCloseMenu = () => {
  //   setIsOpenMenu(!isOpenMenu);
  // };

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

  // Display all members on a button element with the member firstname
  const allMembers = members.map((member) => (
    <li className="one-trip-members-item" key={member.id}>
      <button
        className={`one-trip-members-btn ${
          isOpenMenu ? 'one-trip-members-btn--isActive' : ''
        }`}
        type="button"
        onClick={toggleMenuMember}
      >
        <i className="one-trip-members-icon fa-solid fa-user" />
        <p className="one-trip-membres-name">
          {dataUser.firstname ? dataUser.firstname : 'Membre Nom'}
        </p>
        {isOpenMenu && <MemberMenu />}
      </button>
    </li>
  ));

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
              {/* Change displayed date format to d MMM - d MMM YYYY */}
              {isValid(parseISO(trip.date_start)) &&
              isValid(parseISO(trip.date_end))
                ? `${format(parseISO(trip.date_start), 'd MMM')} - ${format(
                    parseISO(trip.date_end),
                    'd MMM yyyy'
                  )}`
                : 'Dates invalides'}
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
              customClass="outline-dark"
            />
            <Button
              text="Supprimer"
              icon="fa-solid fa-trash"
              type="button"
              customClass="outline-dark"
            />
          </div>
        </div>
      </section>

      <section className="one-trip-members">
        <Button
          text="Ajouter"
          icon="fa-solid fa-user-plus"
          type="button"
          customClass="color"
        />
        {members.length === 0 ? (
          <p> Aucun membres pour le moment </p>
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
