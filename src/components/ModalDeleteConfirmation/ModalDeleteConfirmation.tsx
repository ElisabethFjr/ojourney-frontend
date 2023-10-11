// Import React Hooks
import { useState } from 'react';
// Import React-Router-Dom
import { useNavigate } from 'react-router-dom';
// Import Components
import Button from '../Button/Button';
import ModalContainer from '../../layout/ModalContainer/ModalContainer';
// Import Styles
import './ModalDeleteConfirmation.scss';

export interface ModalDeleteConfirmProps {
  title: string;
  text: string;
  dispatchDeleteAction: () => void;
  urlNavigate: string;
  closeModal: (value: React.SetStateAction<boolean>) => void;
  isTripAuthor?: boolean;
}

function ModalDeleteConfirm({
  title,
  text,
  dispatchDeleteAction,
  urlNavigate,
  closeModal,
  isTripAuthor,
}: ModalDeleteConfirmProps) {
  // Initialize Hooks
  const navigate = useNavigate();

  // Declaration state variables
  const [isOpen, setIsOpen] = useState(true);

  // Event handler to close the modal
  const handleClose = () => {
    setIsOpen(!isOpen);
    closeModal(true);
  };

  // Event handler to delete
  const handleDelete = async () => {
    dispatchDeleteAction();
    handleClose();
    navigate(urlNavigate);
  };

  return (
    <div>
      {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-delete-icon fa-solid fa-triangle-exclamation" />
          <h1 className="modal-delete-title modal-title">{title}</h1>
          <p className="modal-delete-text">{text}</p>
          <div className="modal-delete-button-container">
            <Button
              text="Annuler"
              type="button"
              customClass="outline-dark"
              onClick={handleClose}
            />
            <Button
              text={isTripAuthor ? 'Supprimer' : 'Valider'}
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
