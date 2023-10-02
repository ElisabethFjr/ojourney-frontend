import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAppSelector } from '../../hooks/redux';
import axiosInstance from '../../utils/axios';

import Button from '../Button/Button';
import ModalContainer from '../ModalContainer/ModalContainer';

import './ModalDeleteConfirmation.scss';

interface ModalDeleteConfirmProps {
  title: string;
  text: string;
  endpoint: string;
  urlNavigate: string;
}

function ModalDeleteConfirm({ title, text, endpoint, urlNavigate }: ModalDeleteConfirmProps) {
  // Initialize Hooks
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(true);

  const env = useAppSelector((state) => state.user.env);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
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

      await axiosInstance
        .delete(endpoint, axiosOptions)
        .then((response) => {
          console.log("Le voyage a bien été supprimé")
          handleClose();
          navigate(urlNavigate);
          })
        .catch((error) => {
          console.error(
            'Une erreur est survenue lors de la suppression du voyage.',
            error
          );
        });

    };

  return (
    <div>
      {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-delete-icon fa-solid fa-triangle-exclamation" />
          <h1 className="modal-delete-title">{title}</h1>
          <p className="modal-delete-text">{text}</p>
          <div className="modal-delete-button-container">
            <Button
              text="Annuler"
              type="button"
              customClass="outline-dark"
              onClick={handleClose}
            />
            <Button
              text="Supprimer"
              type="button"
              customClass="danger"
              onClick={handleDelete}
            />
          </div>
        </ModalContainer>
      )}
    </div>
  );
}

export default ModalDeleteConfirm;
