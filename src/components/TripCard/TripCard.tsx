import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Trip } from '../../@types';

import ButtonIcon from '../ButtonIcon/ButtonIcon';
import ModalDeleteConfirm from '../../components/ModalDeleteConfirmation/ModalDeleteConfirmation';

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
  const [showModal, setShowModal] = useState<boolean>(false); // Show Modal

  // Event handler to open the modal DeleteConfirmation if click on delete a trip 
  const handleClickDelete = () => {
    setShowModal(!showModal);
  }

  const handleClickEdit = () => {
    console.log('Au clic sur le bouton, afficher la page EditTrip');
  };

  return (
    <div className="trip-card-container">
    <div className="trip-card-header-icon">
        <ButtonIcon
          icon="fa-solid fa-trash"
          handleClick={handleClickDelete}
        />
    </div>
    <Link to={linkHref} className="trip-card">
      <img
        className="trip-card-image"
        src={srcTripImage}
        alt={altImage}
        crossOrigin="anonymous"
      />
      <div className="trip-card-container">
        <div className="trip-card-header">
          <h3 className="trip-card-header-title">{localisation}</h3>
         
        </div>
        <p className="trip-card-author">Creé par {authorName}</p>
        <p className="trip-card-description">{description}</p>
      </div>
    </Link>
    {showModal && (<ModalDeleteConfirm endpoint={`/trips/${id}`} urlNavigate='/my-trips' title="Confirmation supression" text="Êtes-vous sûr de vouloir supprimer définitivement ce voyage ?"/>)}
    </div>
  );
}

export default TripCard;
