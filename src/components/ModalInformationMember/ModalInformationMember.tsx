import { useState } from 'react';

import ModalContainer from '../ModalContainer/ModalContainer';

import './ModaleInformationMember.scss';

export interface ModalInformationMemberProps {
  title: string;
  lastname: string;
  firstname: string;
  email: string;
  dispatchInformationMember: () => void;
  closeModal: (value: React.SetStateAction<boolean>) => void;
}

function ModalInformationMember({
  title,
  lastname,
  firstname,
  email,
  dispatchInformationMember,
  closeModal,
}: ModalInformationMemberProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    dispatchInformationMember();
    setIsOpen(!isOpen);
    closeModal(true);
  };
  return (
    <div>
      {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-delete-icon fa-solid fa-triangle-exclamation" />
          <h1 className="modal-delete-title">{title}</h1>
          <p className="modal-delete-text">{lastname}</p>
          <p className="modal-delete-text">{firstname}</p>
          <p className="modal-delete-text">{email}</p>
        </ModalContainer>
      )}
    </div>
  );
}

export default ModalInformationMember;
