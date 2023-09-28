import { Link } from 'react-router-dom';

import { Trip } from '../../@types';

import './TripCard.scss';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

export interface TripCardProps {
  srcTripImage: string;
  altImage: string;
  authorName: string;
  description: string;
  localisation: string;
  linkHref: string;
  trip?: Trip;
}

function TripCard({
  srcTripImage,
  altImage,
  authorName,
  description,
  localisation,
  linkHref,
  trip,
}: TripCardProps) {
  const handleClickEdit = () => {
    console.log('Au clic sur le bouton, afficher la page EditTrip');
  };

  const handleClickDelete = () => {
    console.log('Au clic sur le bouton, afficher la modale ConfirmDelete');
  };

  return (
    <Link to={linkHref} className="trip-card">
      <img className="trip-card-image" src={srcTripImage} alt={altImage} />
      <div className="trip-card-container">
        <div className="trip-card-header">
          <h3 className="trip-card-header-title">{localisation}</h3>
          <div className="trip-card-header-icon">
            <ButtonIcon icon="fa-solid fa-pen" handleClick={handleClickEdit} />
            <ButtonIcon
              icon="fa-solid fa-trash"
              handleClick={handleClickDelete}
            />
          </div>
        </div>
        <p className="trip-card-author">Creé par {authorName}</p>
        <p className="trip-card-description">{description}</p>
      </div>
    </Link>
  );
}

export default TripCard;
