// Import React Hooks
import { useState } from 'react';
// Import Component
import ModalContainer from '../../layout/ModalContainer/ModalContainer';
// Import Styles
import './ModalConfirmMessage.scss';

interface ModalConfirmMessageProps {
  closeModal: (value: React.SetStateAction<boolean>) => void;
}

function ModalConfirmMessage({ closeModal }: ModalConfirmMessageProps) {
  // Declaration state variables
  const [isOpen, setIsOpen] = useState(true);
  // Close modal
  const handleClose = () => {
    setIsOpen(!isOpen);
    closeModal(true);
  };

  return (
    <div>
      {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-confirm-icon fa-solid fa-envelope-circle-check" />
          <h1 className="modal-confirm-title modal-title">
            Veuillez vérifier votre addresse mail.
          </h1>
          <p className="modal-confirm-text">
            Un email vous a été envoyé. Veuillez cliquez sur le lien pour
            valider l&apos;inscription.
          </p>
          <button
            type="button"
            className="modal-confirm-close-btn"
            onClick={handleClose}
          >
            <i className="modal-confirm-close-btn-icon fa-solid fa-xmark" />
          </button>
        </ModalContainer>
      )}
    </div>
  );
}

export default ModalConfirmMessage;
