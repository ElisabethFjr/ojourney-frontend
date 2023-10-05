import { FormEvent, useState } from 'react';
import axiosInstance from '../../utils/axios';

import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ModalForgotPassword from '../../components/ModalForgotPassword/ModalForgotPassword';

import './ForgotPassword.scss';

function ForgotPassword() {
  const [showModalForgotPassword, setShowModalForgotPassword] =
    useState<boolean>(false); // State to display or not confirmation modal
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to display an error message

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    await axiosInstance
      .post('/reset', jsonData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(() => {
        setShowModalForgotPassword(true);
      })
      .catch((error) => {
        console.error(
          'Une erreur est survenue lors de la rénitialisation de votre mot de passe.',
          error
        );
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <section className="forgot-password-container">
      <h1 className="forgot-password-title">Réinitialiser le mot de passe</h1>

      <h2 className="forgot-password-subtitle">
        Veuillez saisir l&apos;adresse mail associée à votre compte.
      </h2>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        {showModalForgotPassword && <ModalForgotPassword />}
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
  );
}

export default ForgotPassword;
