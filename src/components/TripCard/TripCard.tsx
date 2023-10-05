import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';

import { deleteTrip } from '../../store/reducers/user';

import ButtonIcon from '../ButtonIcon/ButtonIcon';
import ModalDeleteConfirm from '../ModalDeleteConfirmation/ModalDeleteConfirmation';

import './TripCard.scss';

export interface TripCardProps {
  id: number;
  srcTripImage: string;
  altImage: string;
  authorName: string;
  description: string;
  localisation: string;
  linkHref: string;
}

function TripCard({
  id,
  srcTripImage,
  altImage,
  authorName,
  description,
  localisation,
  linkHref,
}: TripCardProps) {
  // Initialize Hooks
  const dispatch = useAppDispatch();

  const tripId = Number(id);

  // Declaration states variables
  const [showModalDeleteConfirm, setShowModalDeleteConfirm] =
    useState<boolean>(false);

  // Event handler to open the modal DeleteConfirmation if click on delete a trip
  const handleClickDelete = () => {
    setShowModalDeleteConfirm(!showModalDeleteConfirm);
  };

  return (
    <div className="trip-card-container">
      <div className="trip-card-icons">
        <ButtonIcon icon="fa-solid fa-trash" handleClick={handleClickDelete} />
      </div>
      <Link to={linkHref} className="trip-card">
        <img
          className="trip-card-image"
          src={srcTripImage}
          alt={altImage}
          crossOrigin="anonymous"
        />
        <div className="trip-card-infos">
          <div className="trip-card-header">
            <h3 className="trip-card-header-title">{localisation}</h3>
          </div>
          <p className="trip-card-author">Creé par {authorName}</p>
          <p className="trip-card-description">{description}</p>
        </div>
      </Link>
      {showModalDeleteConfirm && (
        <ModalDeleteConfirm
          dispatchDeleteAction={() => dispatch(deleteTrip(tripId))}
          urlNavigate="/my-trips"
          title="Confirmation suppression"
          text="Êtes-vous sûr de vouloir supprimer définitivement ce voyage ?"
        />
      )}
    </div>
  );
}

export default TripCard;
