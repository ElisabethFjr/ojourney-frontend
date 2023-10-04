import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import axiosInstance from '../../utils/axios';
import './PropositionCard.scss';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

interface PropositionCardProps {
  srcImage: string;
  altImage: string;
  title: string;
  authorName: string;
  localisation: string;
  description: string;
  url: string;
  id_link: number;
  id_trip: number | null;
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
  const env = useAppSelector((state) => state.user.env);
  // Function to fetch one trip data from the API
  let axiosOptions = {};
  if (env === 'dev') {
    axiosOptions = {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('token')?.replace(/"|_/g, '') || ''
        }`,
      },
    };
  } else {
    axiosOptions = {
      withCredentials: true,
    };
  }
  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(`/edit-proposition/${id_trip}/${id_link}`);
  };

  const handleClickDelete = async () => {
    await axiosInstance
      .delete(`/trips/${id_trip}/links/${id_link}`, axiosOptions)
      .then(() => {
        navigate(`/my-trip/${id_trip}`);
      })
      .catch((error) => {
        console.error(
          'Une erreur est survenue lors de la suppression de la proposition.',
          error
        );
      });
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
          <div className="proposition-card-localisation">
            <i className="fa-solid fa-location-dot" />
            <p className="proposition-card-localisation-name">{localisation}</p>
          </div>
          <div className="proposition-card-description">
            <i className="fa-solid fa-pen-nib" />
            <p className="proposition-card-description-text">{description}</p>
          </div>
          <div className="proposition-card-url">
            <i className="fa-solid fa-square-arrow-up-right" />
            <p className="proposition-card-url-detail">Voir détail</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PropositionCard;
