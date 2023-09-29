import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ModalInviteMember.scss';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';

function InviteMember()  {

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <section className="modal-invite-member-background">
          <div className="modal-invite-member-container">
            <i className="modal-icon-delete fa-solid fa-lock" />
            <h1 className="modal-invite-member-title">
              Invitation d'un membre
            </h1>
            <p className="modal-invite-member-text">
              Veuillez renseigner l'adresse mail du nouveau membre.
            </p>

            <form>
            <InputField
              name="email"
              placeholder="Mot de passe"
              type="email"
              icon="fa-solid fa-lock"
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
          </div>
        </section>
      )}
    </div>
  );
}

export default InviteMember;




