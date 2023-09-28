import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ModalChangePassword.scss'
import Button from '../Button/Button';
import InputField from '../InputField/InputField';


function ChangePassword() {

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(false);
  }

  return (
    <div>
    {isOpen && (
      <section className="modal-password-background">
        <div className="modal-password-container">
          <i className="modal-icon-delete fa-solid fa-lock" />
          <h1 className="modal-password-title">
            Rénitialisation de votre mot de passe
          </h1>
          <p className="modal-password-text">
          Afin de confirmer votre identité, merci de renseigner votre mot de passe.
          </p>
          <InputField
        name="password"
        placeholder="Mot de passe"
        type="password"
        icon="fa-solid fa-lock"
      />
          <div className="modal-password-button-container">
          <Button
                text="Annuler"
                type="button"
                customClass="outline-dark"
                onClick={handleClose}
              />

<Link to="/new-password">
    <Button
  
                text="Confirmer"
                type="button"
                customClass="outline-dark"
                onClick={handleClick}
              />
              </Link>
              </div>

        </div>
      </section>
    )}
  </div>
);
}

export default ChangePassword;
