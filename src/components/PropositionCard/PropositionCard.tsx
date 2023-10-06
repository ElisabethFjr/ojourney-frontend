import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { deleteProposition } from '../../store/reducers/trip';

import ButtonIcon from '../ButtonIcon/ButtonIcon';
import ModalDeleteConfirm from '../ModalDeleteConfirmation/ModalDeleteConfirmation';

import './PropositionCard.scss';

interface PropositionCardProps {
  srcImage: string;
  altImage: string;
  title: string;
  authorName: string;
  localisation: string;
  description: string;
  url: string;
  id_link: number;
  id_trip: number;
}

function PropositionCard({
  srcImage,
  altImage,
  title,
  authorName,
  localisation,
  description,
  url,
  id_link,
  id_trip,
}: PropositionCardProps) {
  // Initialize Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Convert trip id to a number
  const tripId = Number(id_trip);
  const linkId = Number(id_link);

  // Initialize Hook

  // Display of the Delete Confirm Modal
  const [showModalDeleteConfirm, setShowModalDeleteConfirm] =
    useState<boolean>(false);

  // Event handler to open the modal DeleteConfirmation if click on delete a trip
  const handleClickDelete = () => {
    setShowModalDeleteConfirm(!showModalDeleteConfirm);
  };

  const handleClickEdit = () => {
    navigate(`/edit-proposition/${id_trip}/${id_link}`);
  };

  return (
    <div className="proposition-card-container">
      <div className="proposition-card-icons">
        <ButtonIcon icon="fa-solid fa-pen" handleClick={handleClickEdit} />
        <ButtonIcon icon="fa-solid fa-trash" handleClick={handleClickDelete} />
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
          <p className="proposition-card-author">Creé par {authorName}</p>
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
            dispatch(deleteProposition({ id_trip: tripId, id_link: linkId }))
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
