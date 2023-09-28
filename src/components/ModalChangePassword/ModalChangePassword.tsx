import { useState } from 'react';
import './ModalChangePassword.scss'
import Button from '../Button/Button';


function ChangePassword() {

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(false);
  }

  return (
    <div>
    {isOpen && (
      <section className="modal-password-background">
        <div className="modal-password-container">
          <i className="modal-icon-delete fa-solid fa-envelope-circle-check" />
          <h1 className="modal-password-title">
            Rénitialisation de votre mot de passe
          </h1>
          <p className="modal-password-text">
          Afin de confirmer votre identité, merci de renseigner votre mot de passe.
          </p>

          <button
            type="button"
            className="modal-password-close-btn"
            onClick={handleClose}
          >
            Annuler
            <i className="modal-delete-close-btn-icon fa-solid fa-xmark" />
          </button>

          <button
              type="button"
              className="modal-password-delete-btn"
              onClick={handleClick}
            >
              Confirmation
              <i className="modal-password-close-btn-icon fa-solid fa-xmark" />
            </button>

        </div>
      </section>
    )}
  </div>
);
}

export default ChangePassword;
