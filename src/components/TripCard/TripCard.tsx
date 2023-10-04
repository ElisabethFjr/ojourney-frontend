import { useState } from 'react';
import { Link } from 'react-router-dom';

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
  handleUpdateData: (deletedTripId: number, dataType: string) => void;
}

function TripCard({
  id,
  srcTripImage,
  altImage,
  authorName,
  description,
  localisation,
  linkHref,
  handleUpdateData,
}: TripCardProps) {
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
          endpoint={`/trips/${id}`}
          urlNavigate="/my-trips"
          title="Confirmation supression"
          text="Êtes-vous sûr de vouloir supprimer définitivement ce voyage ?"
          dataType="trips"
          dataId={id}
          handleUpdateData={handleUpdateData}
        />
      )}
    </div>
  );
}

export default TripCard;
