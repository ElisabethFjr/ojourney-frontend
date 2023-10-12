// Import React Hooks
import { useState } from 'react';
// Import React-Router-Dom
import { Link, useNavigate } from 'react-router-dom';
// Import Redux Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// Import Redux Actions
import { deleteProposition, toggleLike } from '../../store/reducers/trip';
// Import Styles
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import ModalDeleteConfirm from '../ModalDeleteConfirmation/ModalDeleteConfirmation';

// Import Styles
import vars from '../../styles/_export.module.scss';
import './PropositionCard.scss';

interface PropositionCardProps {
  srcImage: string;
  altImage: string;
  title: string;
  localisation: string;
  description: string;
  url: string;
  id_link: string;
  id_trip: string;
  user_id: string;
  likes: string[];
  isTripCreator: boolean;
}

function PropositionCard({
  srcImage,
  altImage,
  title,
  localisation,
  description,
  url,
  id_link,
  id_trip,
  user_id,
  likes,
  isTripCreator,
}: PropositionCardProps) {
  // Initialize Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Set ids if exist
  const userId = user_id ?? '';
  const tripId = id_trip ?? '';
  const propositionId = id_link ?? '';

  // Does the connected user like this trip?
  const isUserLikedTrip = useAppSelector(
    (state) => state.user.data.id && likes.includes(state.user.data.id)
  );

  // Fetch states from Redux store
  const members = useAppSelector((state) => state.trip.trip.members);
  // Function to find the author name based on the proposition.user_id
  const isPropositionAuthor = members.find((member) => member.id === userId);

  // Declaration State Variable
  const [showModalDeleteConfirm, setShowModalDeleteConfirm] =
    useState<boolean>(false);

  // Event handler to open the modal DeleteConfirmation if click on delete a trip
  const handleClickDelete = () => {
    setShowModalDeleteConfirm(!showModalDeleteConfirm);
  };

  // Event handler to open the EditProposition page
  const handleClickEdit = () => {
    navigate(`/edit-proposition/${id_trip}/${id_link}`);
  };

  // Event handler to add a +1 like if clicked
  const handleClickVote = () => {
    dispatch(toggleLike({ tripId, propositionId }));
  };

  return (
    <div className="proposition-card-container">
      {/* Display icons edit/delete buttons only if the current user is the author of the proposition or the trip creator */}
      {isPropositionAuthor || isTripCreator ? (
        <div className="proposition-card-icons">
          <ButtonIcon icon="fa-solid fa-pen" handleClick={handleClickEdit} />
          <ButtonIcon
            icon="fa-solid fa-trash"
            handleClick={handleClickDelete}
          />
        </div>
      ) : null}
      {/* Like Button & Display the number of likes */}
      <div className="proposition-card-like">
        {likes && <p>({likes.length})</p>}
        <button
          className="proposition-card-like-btn"
          type="button"
          onClick={handleClickVote}
          style={
            isUserLikedTrip
              ? { color: vars.colorPrimary }
              : { color: vars.colorText }
          }
        >
          <i className="proposition-card-like-icon fa-regular fa-thumbs-up" />
          J&lsquo;aime
        </button>
      </div>
      {/* Proposition Card */}
      <Link to={url} target="_blank" className="proposition-card">
        <img
          className="proposition-card-image"
          src={srcImage}
          alt={altImage}
          crossOrigin="anonymous"
        />
        <div className="proposition-card-infos">
          <div className="proposition-card-header">
            <h3 className="proposition-card-header-title">{title}</h3>
          </div>
          {/* Display the author's name or "Membre supprimé" if the member has been deleted */}
          <p className="proposition-card-author">
            Créé par{' '}
            {isPropositionAuthor
              ? `${isPropositionAuthor?.firstname} ${isPropositionAuthor?.lastname}`
              : 'Membre supprimé'}
          </p>
          {description && (
            <div className="proposition-card-description">
              <p className="proposition-card-description-text">{description}</p>
            </div>
          )}
          <div className="proposition-card-localisation">
            <i className="fa-solid fa-location-dot" />
            <p className="proposition-card-localisation-name">{localisation}</p>
          </div>
          <div className="proposition-card-url">
            <i className="fa-solid fa-square-arrow-up-right" />
            <p className="proposition-card-url-detail">Voir détail</p>
          </div>
        </div>
      </Link>
      {/* Display the Delete Modale if the trash button is clicked */}
      {showModalDeleteConfirm && (
        <ModalDeleteConfirm
          dispatchDeleteAction={() =>
            dispatch(deleteProposition({ tripId, propositionId }))
          }
          urlNavigate={`/my-trip/${tripId}`}
          title="Confirmation suppression"
          text="Êtes-vous sûr de vouloir supprimer définitivement cette proposition ?"
          closeModal={() => setShowModalDeleteConfirm(false)}
        />
      )}
    </div>
  );
}

export default PropositionCard;
