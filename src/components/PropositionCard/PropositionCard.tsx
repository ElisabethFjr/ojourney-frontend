import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteProposition } from '../../store/reducers/trip';

import ButtonIcon from '../ButtonIcon/ButtonIcon';
import ModalDeleteConfirm from '../ModalDeleteConfirmation/ModalDeleteConfirmation';

import './PropositionCard.scss';

interface PropositionCardProps {
  srcImage: string;
  altImage: string;
  title: string;
  localisation: string;
  description: string;
  url: string;
  id_link: number;
  id_trip: number;
  user_id: number;
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
}: PropositionCardProps) {
  // Initialize Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Convert trip id to a number
  const tripId = Number(id_trip);
  const propositionId = Number(id_link);
  const userId = Number(user_id);

  // Declaration varibles states
  const [likes, setLikes] = useState<number>(0);

  // Fetch states from Redux store
  const members = useAppSelector((state) => state.trip.trip.members);
  // const liked = useAppSelector((state) => state.trip.liked);

  // Function to find the author name based on the proposition.user_id
  const author = members.find((member) => member.id === userId);

  // Display of the Delete Confirm Modal
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
    setLikes(likes +1);
    // if (liked) {
    // dispatch(toggleLike)
    // }
    }

  return (
    <div className="proposition-card-container">
      <div className="proposition-card-icons">
        <ButtonIcon icon="fa-solid fa-pen" handleClick={handleClickEdit} />
        <ButtonIcon icon="fa-solid fa-trash" handleClick={handleClickDelete} />
      </div>
      <div className="proposition-card-like">
        {likes > 0 && <p>({likes})</p>}
        <button
          className="proposition-card-like-btn"
          type="button"
          onClick={handleClickVote}
        >
          <i className="proposition-card-like-icon fa-regular fa-thumbs-up" />
          <span>J'aime</span>
        </button>
      </div>
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
          <p className="proposition-card-author">
            Creé par {`${author?.firstname} ${author?.lastname}`}
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
      {showModalDeleteConfirm && (
        <ModalDeleteConfirm
          dispatchDeleteAction={() =>
            dispatch(deleteProposition({ tripId, propositionId }))
          }
          urlNavigate={`/my-trip/${id_trip}`}
          title="Confirmation suppression"
          text="Êtes-vous sûr de vouloir supprimer définitivement cette proposition ?"
          closeModal={() => setShowModalDeleteConfirm(false)}
        />
      )}
    </div>
  );
}

export default PropositionCard;
