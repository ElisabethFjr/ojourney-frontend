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
        <div className="modal-overlay">
          <div className="modal-content">
            <h1>
              Veuillez vérifier votre addresse mail pour confirmaer votre
              inscription.
            </h1>
            <button
              type="button"
              className="modal-close-btn"
              onClick={handleClick}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmModal;
