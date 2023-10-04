import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import axiosInstance from '../../utils/axios';
import './PropositionCard.scss';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import ModalDeleteConfirm from '../ModalDeleteConfirmation/ModalDeleteConfirmation';

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
  handleUpdateData: (deletedPropositionId: number, dataType: string) => void;
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
  handleUpdateData,
}: PropositionCardProps) {
  // Initialize Hook
  const navigate = useNavigate();

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
        <img className="proposition-card-image" src={srcImage} alt={altImage} />
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
          endpoint={`/trips/${id_trip}/links/${id_link}`}
          urlNavigate={`/my-trip/${id_trip}`}
          title="Confirmation supression"
          text="Êtes-vous sûr de vouloir supprimer définitivement cette proposition ?"
          dataType="propositions"
          dataId={id_trip}
          handleUpdateData={handleUpdateData}
        />
      )}
    </div>
  );
}

export default PropositionCard;
