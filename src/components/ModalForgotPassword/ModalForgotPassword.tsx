import { useState } from 'react';
// Import
import ModalContainer from '../../layout/ModalContainer/ModalContainer';
// Import Styles
import './ModalForgotPassword.scss';

interface ModalForgotPasswordProps {
  closeModal: (value: React.SetStateAction<boolean>) => void;
}

function ModalForgotPassword({ closeModal }: ModalForgotPasswordProps) {
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
          <i className="modal-forgot-password-icon fa-solid fa-envelope-circle-check" />
          <h1 className="modal-forgot-password-title modal-title">
            Veuillez vérifier votre addresse mail.
          </h1>
          <p className="modal-forgot-password-text">
            Vous avez reçu un mail contenant un lien pour rénitialiser votre mot
            de passe.
          </p>
        </ModalContainer>
      )}
    </div>
  );
}

export default ModalForgotPassword;
