import { useState } from 'react';

import Button from '../Button/Button';
import InputField from '../InputField/InputField';

import './ModalConfimPassword.scss';

function ModaleConfirmPassword() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    console.log('Au clic sur Envoyer, envoyer les data en post');
  };

  return (
    <div>
      {isOpen && (
        <section className="modal-password-background">
          <div className="modal-password-container">
            <i className="modal-password-icon fa-solid fa-lock" />
            <h1 className="modal-password-title">Confirmation de mot passe</h1>
            <p className="modal-password-text">
              Pour confirmer votre identité et procéder à la suppression de
              votre compte, veuillez renseigner votre mot de passe.
            </p>
            <form className="modal-password-form" onSubmit={handleSubmit}>
              <InputField
                name="password"
                placeholder="Mot de passe"
                type="password"
                icon="fa-solid fa-lock"
              />
            </form>

            <Button
              text="Confirmer"
              type="submit"
              customClass="color button-style--width"
            />

            <button
              type="button"
              className="modal-password-close-btn"
              onClick={handleClose}
            >
              <i className="modal-password-close-btn-icon fa-solid fa-xmark" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default ModaleConfirmPassword;
