import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { deleteTrip } from '../../store/reducers/user';

import ButtonIcon from '../ButtonIcon/ButtonIcon';
import ModalDeleteConfirm from '../ModalDeleteConfirmation/ModalDeleteConfirmation';

import './TripCard.scss';
import { User } from '../../@types';
import axiosInstance from '../../utils/axios';

export interface TripCardProps {
  id: number;
  srcTripImage: string;
  altImage: string;
  description: string;
  localisation: string;
  linkHref: string;
  user_id: number;
}

function TripCard({
  id,
  srcTripImage,
  altImage,
  description,
  localisation,
  linkHref,
  user_id,
}: TripCardProps) {
  // Initialize Hooks
  const dispatch = useAppDispatch();

  // Convert id to a number
  const tripId = Number(id);
  const userId = Number(user_id);

  // Declaration useState variable
  const [author, setAuthor] = useState<User>();

  // Fetch the trip's creator data with his user_id
  useEffect(() => {
    axiosInstance
      .get(`/users/${userId}`)
      .then((response) => setAuthor(response.data));
  }, [userId]);

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
          <p className="trip-card-author">
            Creé par {`${author?.firstname} ${author?.lastname}`}
          </p>
          <p className="trip-card-description">{description}</p>
        </div>
      </Link>
      {showModalDeleteConfirm && (
        <ModalDeleteConfirm
          dispatchDeleteAction={() => dispatch(deleteTrip(tripId))}
          urlNavigate="/my-trips"
          title="Confirmation suppression"
          text="Êtes-vous sûr de vouloir supprimer définitivement ce voyage ?"
          closeModal={() => setShowModalDeleteConfirm(false)}
        />
      )}
    </div>
  );
}

export default TripCard;
