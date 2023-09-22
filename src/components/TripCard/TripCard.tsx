import { Link } from 'react-router-dom';

import './TripCard.scss';

interface TripCardProps {
  srcTripImage: string;
  altImage: string;
  authorName: string;
  description: string;
  tripTitle: string;
}

function TripCard({
  srcTripImage,
  altImage,
  authorName,
  description,
  tripTitle,
}: TripCardProps) {
  return (
    <Link to="/myTrip" className="trip-card-link">
      <article className="trip-card">
        <img className="trip-card-image" src={srcTripImage} alt={altImage} />
        <div className="trip-card-container">
          <div className="trip-card-header">
            <h3 className="trip-card-header-title">{tripTitle}</h3>
            <div className="trip-card-header-icon">
              <i className="fa-solid fa-pen" />
              <i className="fa-solid fa-trash" />
            </div>
          </div>
          <h4 className="trip-card-author">Creé par {authorName}</h4>
          <p className="trip-card-description">{description}</p>
        </div>
      </article>
    </Link>
  );
}

export default TripCard;
