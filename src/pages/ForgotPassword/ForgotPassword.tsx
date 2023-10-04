import { FormEvent, useState } from 'react';

import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

import './ForgotPassword.scss';

function ForgotPassword () {

 // const 

 // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
   // event.preventDefault();

 // }

 //onSubmit={handleSubmit}>
  return (
    <section className="forgot-password-container">

  <h1 className="forgot-password-title">Réinitialiser le mot de passe</h1>
  
<h2 className='forgot-password-subtitle'>Veuillez saisir l'adresse mail associée à votre compte.</h2>

  <form className='forgot-password-form'>
  <InputField
              name="email"
              placeholder="Votre e-mail"
              type="email"
              icon="fa-solid fa-at"
            />
          <Button
            text="Confirmer"
            type="submit"
            customClass="color button-style--width"
          />
          
  </form>
  </section>
  )

};

export default ForgotPassword;
