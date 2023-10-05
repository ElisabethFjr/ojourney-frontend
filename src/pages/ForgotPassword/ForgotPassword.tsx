import { FormEvent, useState  }from 'react';
import axiosInstance from '../../utils/axios';


import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ModalForgotPassword from '../../components/ModalForgotPassword/ModalForgotPassword';

import './ForgotPassword.scss';

function ForgotPassword () {


  return (
    <section className="forgot-password-container">

  <h1 className="forgot-password-title">Réinitialiser le mot de passe</h1>
  
<h2 className='forgot-password-subtitle'>Veuillez saisir l'adresse mail associée à votre compte.</h2>
  <form className='forgot-password-form'  onSubmit={handleSubmit}>
  {showModalForgotPassword&& <ModalForgotPassword />}
      {errorMessage && (
        <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
      )}
  <InputField
              name="email"
              placeholder="Votre e-mail"
              type="email"
              icon="fa-solid fa-at"
              required
            />
          <Button
            text="Confirmer"
            customClass="color button-style--width"
            type="submit"

           
          />
          
  </form>
  </section>
  )

};

export default ForgotPassword;
