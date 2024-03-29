// Import React Hooks
import { useEffect, useState } from 'react';
// Import React-Router-Dom
import { Link } from 'react-router-dom';
// Import Redux Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// Import Redux Actions
import { deleteTrip, leaveTrip } from '../../store/reducers/user';
// Import Axios Instance
import axiosInstance from '../../utils/axios';
// Import Components
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import ModalDeleteConfirm from '../ModalDeleteConfirmation/ModalDeleteConfirmation';
// Import Interfaces
import { User } from '../../@types';
// Import Styles
import './TripCard.scss';

export interface TripCardProps {
  id: string;
  srcTripImage: string;
  altImage: string;
  description: string;
  localisation: string;
  linkHref: string;
  user_id: string;
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

  // Id variables
  const tripId = id;
  const userId = user_id;

  // Declaration useState variable
  const [author, setAuthor] = useState<User>({} as User);

  // Fetch states from Redux store
  const userData = useAppSelector((state) => state.user.data);

  // Get the connecter member id
  const memberId = userData.id;
  const isTripAuthor = userData.id === userId;

  // Fetch the trip's creator data with his user_id
  useEffect(() => {
    axiosInstance.get(`/users/${userId}`).then((response) => {
      setAuthor(response.data);
    });
  }, [userId]);

  // Declaration states variables
  const [showModalDeleteConfirm, setShowModalDeleteConfirm] =
    useState<boolean>(false);

  // Event handler to open/ to delete the modal trip
  const handleClickDelete = () => {
    setShowModalDeleteConfirm(!showModalDeleteConfirm);
  };

  // Handler delete actions on click on the trash icon, depending on author status
  const dispatchDeleteAction = async () => {
    if (isTripAuthor) {
      dispatch(deleteTrip(tripId)); // If author, dispatch the deleteTrip action
    } else {
      // If just member, dispatch the deleteMember action to leave the trip
      dispatch(leaveTrip({ tripId, memberId }));
    }
  };

  return (
    <div className="trip-card-container">
      <div className="trip-card-icons">
        <ButtonIcon
          icon="fa-solid fa-trash"
          handleClick={handleClickDelete}
          ariaLabel="Supprimer le voyage"
          title="Supprimer"
        />
      </div>
      <Link to={linkHref} className="trip-card">
        <img
          className="trip-card-image"
          src={srcTripImage}
          alt={altImage}
          crossOrigin="anonymous"
          width="300"
          height="200"
          loading="lazy"
        />
        <div className="trip-card-infos">
          <div className="trip-card-header">
            <h2 className="trip-card-header-title">{localisation}</h2>
          </div>
          <p className="trip-card-author">
            Créé par {`${author?.firstname} ${author?.lastname}`}
          </p>
          <p className="trip-card-description">{description}</p>
        </div>
      </Link>
      {/* Display the Delete Modal if the trash button is clicked */}
      {showModalDeleteConfirm && (
        <ModalDeleteConfirm
          dispatchDeleteAction={dispatchDeleteAction}
          urlNavigate="/my-trips"
          title={
            isTripAuthor ? 'Confirmation suppression' : 'Quitter le voyage'
          }
          text={
            isTripAuthor
              ? 'Êtes-vous sûr de vouloir supprimer définitivement ce voyage ?'
              : 'Êtes-vous sûr de vouloir quitter définitivement ce voyage ?'
          }
          closeModal={() => setShowModalDeleteConfirm(false)}
          isTripAuthor={isTripAuthor}
        />
      )}
    </div>
  );
}

export default TripCard;
