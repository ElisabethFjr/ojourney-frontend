import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import Main from '../../layout/Main/Main';

import PropositionCard from '../../components/PropositionCard/PropositionCard';
import Button from '../../components/Button/Button';

import ModalInviteMember from '../../components/ModalInviteMember/ModalInviteMember';
import ModalDeleteConfirm from '../../components/ModalDeleteConfirmation/ModalDeleteConfirmation';
import OneMember from '../../components/OneMember/OneMember';
import MapDisplay from '../../components/Map/Map';

import './MyTrip.scss';
import { deleteTrip } from '../../store/reducers/user';
import { fetchTripData } from '../../store/reducers/trip';

function MyTrip() {
  // Initialize Hooks
  const dispatch = useAppDispatch();

  // Get the trip id from route parameters
  const { id } = useParams();
  const tripId = Number(id);

  // Declaration state variables
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [openMemberId, setOpenMemberId] = useState<number | null>(null);
  const [showModalInviteMember, setShowModalInviteMember] =
    useState<boolean>(false);
  const [showModalDeleteConfirm, setShowModalDeleteConfirm] =
    useState<boolean>(false);
  // const [showVote, setShowVote] = useState<boolean | null>(null);

  // Fetch states from Redux store
  const userData = useAppSelector((state) => state.user.data); // User Data
  const trip = useAppSelector((state) => state.trip.trip); // One Trip Data
  const members = useAppSelector((state) => state.trip.trip.members); // Members of the trip
  const propositions = useAppSelector((state) => state.trip.trip.links); // Links of the tri

  // Boolean to check if the user is the trip creator
  const isCreator = userData.id === trip.user_id;

  useEffect(() => {
    dispatch(fetchTripData(tripId));
  }, [dispatch, tripId]);

  /// EVENTS HANDLERS MEMBER ///

  // Event handler to open the add member modal on the button click
  const handleClickAddMember = () => {
    setShowModalInviteMember(!showModalInviteMember);
  };

  // Event handler to close the member menu when clicked outside
  // Ref the toggle MemberMenu button
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleCloseMenu = (event: MouseEvent) => {
      // Check if button not null and menu is open
      if (divRef.current && isOpenMenu) {
        if (!divRef.current.contains(event.target as Node)) {
          setIsOpenMenu(false); // Close the menu
        }
      }
    };
    // Add a mouse click event listener to the document when the menu is open
    if (isOpenMenu) {
      document.addEventListener('mousedown', handleCloseMenu);
    } else {
      document.removeEventListener('mousedown', handleCloseMenu);
    }
    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      document.removeEventListener('mousedown', handleCloseMenu);
    };
  }, [isOpenMenu]); // Depends on the isOpenMenu state

  /// EVENTS HANDLERS TRIPS ///

  // Event handler to open the modal DeleteConfirmation if click on delete a trip
  const handleClickDelete = () => {
    setShowModalDeleteConfirm(!showModalDeleteConfirm);
  };

  // Display a list of all members into a button element from the members array fetch to the API
  const allMembers = members.map((member) => (
    <OneMember
      key={member.id}
      member={member}
      tripId={tripId}
      isCreator={isCreator}
      userData={userData}
      openMemberId={openMemberId}
      setOpenMemberId={setOpenMemberId}
    />
  ));

  // Display a list of all propositions from the propositions array fetch to the API
  const allPropositions = propositions.map((proposition) => (
    <li key={proposition.id}>
      <PropositionCard
        srcImage={proposition.image}
        altImage={proposition.alt_image}
        title={proposition.title}
        localisation={proposition.localisation}
        description={proposition.description}
        url={proposition.url}
        id_trip={proposition.trip_id}
        id_link={proposition.id}
        user_id={proposition.user_id}
        likes={proposition.likes}
      />
    </li>
  ));

  return (
    <Main>
      {/* ********** MODALE INVITE MEMBER */}
      {showModalInviteMember && (
        <ModalInviteMember
          id={tripId}
          closeModal={() => {
            setShowModalInviteMember(false);
          }}
        />
      )}
      {/* ********** TRIP OVERVIEW */}
      <section className="one-trip-overview">
        <img
          className="one-trip-overview-image"
          src={trip.url_image}
          alt={trip.alt_image}
          crossOrigin="anonymous"
        />
        <div className="one-trip-overview-container">
          <div className="one-trip-overview-infos">
            <h1 className="one-trip-overview-title">{trip.localisation}</h1>
            <div className="one-trip-overview-date">
              <i className="fa-solid fa-calendar" />
              <p className="one-trip-overview-date-name">
                {/* Change displayed date format to d MMM - d MMM YYYY */}
                {trip.date_start && trip.date_end
                  ? `${format(new Date(trip.date_start), 'd MMM')} - ${format(
                      new Date(trip.date_end),
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
          </div>

          {isCreator && (
            <div className="one-trip-overview-buttons">
              <Link to={`/edit-trip/${id}`}>
                <Button
                  text="Editer"
                  icon="fa-solid fa-pen"
                  type="button"
                  customClass="outline-dark"
                />
              </Link>
              <Button
                text="Supprimer"
                icon="fa-solid fa-trash"
                type="button"
                customClass="outline-dark"
                onClick={handleClickDelete}
              />
            </div>
          )}
        </div>
      </section>
      {/* ********** MEMBERS LIST */}
      <section className="one-trip-members">
        {isCreator && (
          <Button
            text="Ajouter"
            icon="fa-solid fa-user-plus"
            type="button"
            customClass="color"
            onClick={handleClickAddMember}
          />
        )}
        {trip.members && trip.members.length === 0 ? (
          <p> Aucun membres pour le moment </p>
        ) : (
          <ul className="one-trip-members-list">{allMembers}</ul>
        )}
      </section>
      {/* ********** MAP */}
      {trip.lat && trip.lon ? (
        <MapDisplay lat={trip.lat} lon={trip.lon} links={trip.links} />
      ) : (
        <p />
      )}
      {/* ********** PROPOSITIONS LIST */}
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
        {propositions && propositions.length === 0 ? (
          <p>Aucune proposition n&apos;a été ajoutée pour le moment !</p>
        ) : (
          <ul>{allPropositions}</ul>
        )}
      </section>
      {showModalDeleteConfirm && (
        <ModalDeleteConfirm
          dispatchDeleteAction={() => dispatch(deleteTrip(tripId))}
          urlNavigate="/my-trips"
          title="Confirmation suppression"
          text="Êtes-vous sûr de vouloir supprimer définitivement ce voyage ?"
          closeModal={() => setShowModalDeleteConfirm(false)}
        />
      )}
    </Main>
  );
}

export default MyTrip;
