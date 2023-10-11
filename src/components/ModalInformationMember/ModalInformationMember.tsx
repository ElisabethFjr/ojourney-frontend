// Import React Hooks
import { useState } from 'react';
// Import Components
import ModalContainer from '../../layout/ModalContainer/ModalContainer';
// Import Styles
import './ModaleInformationMember.scss';

export interface ModalInformationMemberProps {
  title: string;
  lastname: string;
  firstname: string;
  email: string;
  closeModal: (value: React.SetStateAction<boolean>) => void;
}

function ModalInformationMember({
  title,
  lastname,
  firstname,
  email,
  closeModal,
}: ModalInformationMemberProps) {
  // State Variable
  const [isOpen, setIsOpen] = useState(true);
  // Close Modal
  const handleClose = () => {
    setIsOpen(!isOpen);
    closeModal(true);
  };

  return (
    <div>
      {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-information-icon fa-solid fa-id-card" />
          <h1 className="modal-information-title modal-title">{title}</h1>
          <p className="modal-information-text">{lastname}</p>
          <p className="modal-information-text">{firstname}</p>
          <p className="modal-information-text">{email}</p>
        </ModalContainer>
      )}
    </div>
  );
}

export default ModalInformationMember;
