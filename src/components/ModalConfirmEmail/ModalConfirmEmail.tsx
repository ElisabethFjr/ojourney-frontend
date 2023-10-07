import { useState } from 'react';
import React from 'react';

import ModalContainer from "../ModalContainer/ModalContainer";
import Button from '../Button/Button';
import InputField from '../InputField/InputField';

import "./ModalConfirmEmail.scss";

function ModalConfirmEmail() {

  const [isOpen, setIsOpen] = useState(true);
 
  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return ( 

    <div className="modal-confirm-email-container">
           {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-confirm--email-icon fa-solid fa-envelope-circle-check" />
      <h1 className="modal-confirm-email-title">Veuillez renseigner votre addresse mail.</h1>
      <InputField
              name="email"
              placeholder="E-mail"
              type="email"
              icon="fa-solid fa-envelope-circle-check"
            />
        <p className="modal-confirm-email-text">
            Vous allez recevoir un e-mail avec un lien afin de rénitialiser votre compte. 
          </p>
          <Button 
          text="Confirmer" 
          type="submit" 
          customClass="color" 
          onClick={handleClose}
          />
          </ModalContainer>
          )}
    </div>

  )
};

export default ModalConfirmEmail;
