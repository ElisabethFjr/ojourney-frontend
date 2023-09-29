import { useState } from 'react';

import './ModalContainer.scss';

interface ModalContainerProps {
  handleClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

function ModalContainer({ handleClose, isOpen, children }: ModalContainerProps) {

  return (
    isOpen && (
      <div className="modal-background">
        <div className="modal-container">
          <button className="modal-close fa-solid fa-xmark" onClick={handleClose}>
            
          </button>
          {children}
        </div>
      </div>
    )
  );
}

export default ModalContainer;