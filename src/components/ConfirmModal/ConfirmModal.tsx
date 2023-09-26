import { useState } from 'react';
import './ConfirmModal.scss';

function ConfirmModal() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <section className="modal-background">
          <div className="modal-container">
            <i className="modal-icon fa-solid fa-envelope-circle-check" />
            <h1 className="modal-title">
              Veuillez vérifier votre addresse mail.
            </h1>
            <p className="modal-text">
              Un email vous a été envoyé. Veuillez cliquez sur le lien pour
              valider l&apos;inscription.
            </p>
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleClick}
            >
              <i className="modal-close-btn-icon fa-solid fa-xmark" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default ConfirmModal;
