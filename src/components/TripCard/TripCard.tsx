import { Link } from 'react-router-dom';

import { Trip } from '../../@types';

import './TripCard.scss';

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
  return (
    <Link to={linkHref} className="trip-card">
      <img className="trip-card-image" src={srcTripImage} alt={altImage} />
      <div className="trip-card-container">
        <div className="trip-card-header">
          <h3 className="trip-card-header-title">{localisation}</h3>
          <div className="trip-card-header-icon">
            <i className="fa-solid fa-pen" />
            <i className="fa-solid fa-trash" />
          </div>
        </div>
        <p className="trip-card-author">Creé par {authorName}</p>
        <p className="trip-card-description">{description}</p>
      </div>
    </Link>
  );
}

export default TripCard;
