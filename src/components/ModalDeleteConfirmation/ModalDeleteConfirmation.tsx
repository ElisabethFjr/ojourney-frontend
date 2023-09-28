import { useState } from 'react';
import './ModalDeleteConfirmation.scss';
import Button from '../Button/Button';

interface ModalDeleteConfirmProps {
  title: string;
  text: string;
}

function ModalDeleteConfirm({ title, text }: ModalDeleteConfirmProps) {
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
          </div>
        </section>
      )}
    </div>
  );
}

export default ModalDeleteConfirm;
