import { useState } from 'react';
import './DeleteModal.scss';

function DeleteModal() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {

    handleClose();
  };

  return (
    <div>
    {isOpen && (
      <section className="modal-delete-background">
        <div className="modal-delete-container">
          <i className="modal-icon-delete fa-solid fa-envelope-circle-check" />
          <h1 className="modal-delete-title">
            Confirmation de suppression
          </h1>
          <p className="modal-delete-text">
          Êtes-vous sûr de vouloir supprimer cet élément ?
          </p>
          <button
            type="button"
            className="modal-delete-close-btn"
            onClick={handleClose}
          >
            Annuler
            <i className="modal-delete-close-btn-icon fa-solid fa-xmark" />
          </button>

          <button
              type="button"
              className="modal-delete-delete-btn"
              onClick={handleDelete}
            >
              Supprimer
              <i className="modal-delete-close-btn-icon fa-solid fa-xmark" />
            </button>

        </div>
      </section>
    )}
  </div>
);
}

export default DeleteModal;