import { Link } from 'react-router-dom';

import './PropositionCard.scss';

interface PropositionCardProps {
  previewImageUrl: string;
  altImage: string;
  title: string;
  authorName: string;
  localisation: string;
  url: string;
}

function PropositionCard({
  previewImageUrl,
  altImage,
  title,
  authorName,
  localisation,
  url,
}: PropositionCardProps) {
  return (
    <Link to="/createLink" className="proposition-card">
      <img
        className="proposition-card-image"
        src={previewImageUrl}
        alt={altImage}
      />
      <div className="proposition-card-container">
        <div className="proposition-card-header">
          <h3 className="proposition-card-header-title">{title}</h3>
          <div className="proposition-card-header-icon">
            <i className="fa-solid fa-pen" />
            <i className="fa-solid fa-trash" />
          </div>
        </div>
        <p className="proposition-card-author">Creé par {authorName}</p>
        <div className="proposition-card-localisation">
          <i className="fa-solid fa-location-dot" />
          <p className="proposition-card-localisation-name">{localisation}</p>
        </div>
        <Link to={url} className="proposition-card-url-detail">
          <i className="fa-solid fa-square-arrow-up-right" />
          Voir détail
        </Link>
      </div>
    </Link>
  );
}

export default PropositionCard;
