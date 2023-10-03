import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import axiosInstance from '../../utils/axios';

import Button from '../Button/Button';
import ModalContainer from '../ModalContainer/ModalContainer';

import './ModalDeleteConfirmation.scss';

export interface ModalDeleteConfirmProps {
  title: string;
  text: string;
  endpoint: string;
  urlNavigate: string;
  dataType: string;
  dataId: number;
  handleUpdateData?: (deletedDataId: number, dataType: string) => void;
}

function ModalDeleteConfirm({
  title,
  text,
  endpoint,
  urlNavigate,
  dataType,
  dataId,
  handleUpdateData,
}: ModalDeleteConfirmProps) {
  // Initialize Hooks
  const navigate = useNavigate();

  // Declaration state variables
  const [isOpen, setIsOpen] = useState(true);

  // Fetch states from Redux store
  const env = useAppSelector((state) => state.user.env);

  // Event handler to close the modal
  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  // Event handler to delete an element
  const handleDelete = async () => {
    // Define axios Options (cookie or token)
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
    // Event handler to open
    await axiosInstance
      .delete(endpoint, axiosOptions)
      .then(() => {
        // If needed, pass the deleted data ID and data type to the parent component for data update
        if (handleUpdateData) {
          handleUpdateData(dataId, dataType);
        }
        handleClose();
        navigate(urlNavigate);
      })
      .catch((error) => {
        console.error(
          `Une erreur est survenue lors de la suppression du ${dataType}.`,
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
