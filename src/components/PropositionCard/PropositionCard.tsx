import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import './PropositionCard.scss';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

interface PropositionCardProps {
  previewImageUrl: string;
  altImage: string;
  title: string;
  authorName: string;
  localisation: string;
  url: string;
  id_link: number;
  id_trip: number | null;
}

function PropositionCard({
  previewImageUrl,
  altImage,
  title,
  authorName,
  localisation,
  url,
  id_link,
  id_trip,
}: PropositionCardProps) {
  const [propositionData, setPropositionData] = useState<object>({});
  const [linkPreviewData, setLinkPreviewData] = useState<{
    [key: string]: string;
  }>({});
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get(`/trips/${id_trip}/links/${id_link}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${
            localStorage.getItem('token')?.replace(/"|_/g, '') || ''
          }`,
        },
      })
      .then((response) => {
        setPropositionData(response.data);
        axiosInstance
          .get(`https://get-link-preview.herokuapp.com/?url=${url}`, {
            headers: { 'Access-Control-Allow-Origin': '*' },
          })
          .then((responseAPI) => {
            setLinkPreviewData(responseAPI.data);
          })
          .catch((err) => {});
      })
      .catch((error) => {
        console.error(
          'Une erreur est survenue lors de la récupération des données :',
          error
        );
      });
  }, []);

  const handleClickEdit = () => {
    navigate(`/edit-proposition/${id_trip}/${id_link}`);
    // Effectuez la requête DELETE ici
  };

  const handleClickDelete = async () => {
    // Effectuez la requête DELETE ici
    await axiosInstance
      .delete(`/trips/${id_trip}/links/${id_link}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${
            localStorage.getItem('token')?.replace(/"|_/g, '') || ''
          }`,
        },
      })
      .then(() => {
        navigate(`/my-trip/${id_trip}`);
      })
      .catch((error) => {
        console.error(
          'Une erreur est survenue lors de la suppression de la proposition :',
          error
        );
      });
  };

  return (
    <div className="proposition-container">
      <div className="proposition-card-header-icon">
        <ButtonIcon icon="fa-solid fa-pen" handleClick={handleClickEdit} />
        <ButtonIcon icon="fa-solid fa-trash" handleClick={handleClickDelete} />
      </div>
      <Link to={url} className="proposition-card-url-detail">
        <img
          className="proposition-card-image"
          src={linkPreviewData.image}
          alt={altImage}
        />
        <div className="proposition-card-container">
          <div className="proposition-card-header">
            <h3 className="proposition-card-header-title">
              {linkPreviewData.title}
            </h3>
          </div>
          <p className="proposition-card-author">Creé par {authorName}</p>
          <div className="proposition-card-localisation">
            <i className="fa-solid fa-location-dot" />
            <p className="proposition-card-localisation-name">{localisation}</p>
          </div>
          <i className="fa-solid fa-square-arrow-up-right" />
          Voir détail en cliquant sur la proposition.
        </div>
      </Link>
    </div>
  );
}

export default PropositionCard;
