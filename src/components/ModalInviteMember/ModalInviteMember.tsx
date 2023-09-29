import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import ModalContainer from '../ModalContainer/ModalContainer';

import './ModalInviteMember.scss';

function InviteMember() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-icon-email fa-solid fa-envelope-circle-check" />
          <h1 className="modal-invite-member-title">
            Invitation d&apos;un membre
          </h1>
          <p className="modal-invite-member-text">
            Veuillez renseigner l&apos;adresse mail du nouveau membre.
          </p>
          <form>
            <InputField
              name="email"
              placeholder="e-mail"
              type="email"
              icon="fa-solid fa-envelope-circle-check"
            />
          </form>

          <div className="modal-invite-member-button-container">
            <Button
              text="Annuler"
              type="button"
              customClass="outline-dark"
              onClick={handleClose}
            />

            <Button
              text="Confirmer"
              type="button"
              customClass="outline-dark"
              onClick={handleClick}
            />
          </div>
        </ModalContainer>
      )}
    </div>
  );
}

export default InviteMember;
