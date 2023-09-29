import { useState } from 'react';
import './ModalConfirmMessage.scss';

function ModalConfirmMessage() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <section className="modal-confirm-background">
          <div className="modal-confirm-container">
            <i className="modal-confirm-icon fa-solid fa-envelope-circle-check" />
            <h1 className="modal-confirm-title">
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
          </div>
        </section>
      )}
    </div>
  );
}

export default ModalConfirmMessage;
