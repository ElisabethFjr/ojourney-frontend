import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { deleteTrip } from '../../store/reducers/user';
import { deleteMember } from '../../store/reducers/trip';
import axiosInstance from '../../utils/axios';

import ButtonIcon from '../ButtonIcon/ButtonIcon';
import ModalDeleteConfirm from '../ModalDeleteConfirmation/ModalDeleteConfirmation';

import { User } from '../../@types';

import './TripCard.scss';

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
  const navigate = useNavigate();

  // Convert id to a number
  const tripId = Number(id);
  const userId = Number(user_id);

  // Declaration useState variable
  const [author, setAuthor] = useState<User>({} as User);

  // Fetch states from Redux store
  const userData = useAppSelector((state) => state.user.data);

  // Get the connecter member id
  const memberId = userData.id;
  const isAuthor = userData.id === userId;

  // Fetch the trip's creator data with his user_id
  useEffect(() => {
    axiosInstance.get(`/users/${userId}`).then((response) => {
      setAuthor(response.data);
    });
  }, [userId]);

  // Declaration states variables
  const [showModalDeleteConfirm, setShowModalDeleteConfirm] =
    useState<boolean>(false);

  // Event handler to open the modal DeleteConfirmation if click on delete a trip
  const handleClickDelete = () => {
    setShowModalDeleteConfirm(!showModalDeleteConfirm);
  };

  // Handler delete actions on click on the trash icon, depending on author status
  const dispatchDeleteAction = () => {
    if (isAuthor) {
      dispatch(deleteTrip(tripId)); // If author, dispatch the deleteTrip action
    } else {
      dispatch(deleteMember({ tripId, memberId })); // If just member, dispatch the deleteMember action to leave the trip
      navigate('/my-trips'); // Then, redirect to /my-trips to update userData
    }
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
          dispatchDeleteAction={dispatchDeleteAction}
          urlNavigate="/my-trips"
          title={isAuthor ? 'Confirmation suppression' : 'Quitter le voyage'}
          text={
            isAuthor
              ? 'Êtes-vous sûr de vouloir supprimer définitivement ce voyage ?'
              : 'Êtes-vous sûr de vouloir quitter définitivement ce voyage ?'
          }
          closeModal={() => setShowModalDeleteConfirm(false)}
          isAuthor={isAuthor}
        />
      )}
    </div>
  );
}

export default TripCard;
