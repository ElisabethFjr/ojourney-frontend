import { FormEvent, useState } from 'react';
import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';
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

    // Check if field is empty and set an errorMessage
    if (!jsonData.email) {
      setErrorMessage('Veuillez renseigner votre email.');
      return;
    }

    await axiosInstance
      .post('/reset', jsonData)
      .then(() => {
        setShowModalForgotPassword(true);
      })
      .catch((error) => {
        console.error(
          'Une erreur est survenue lors de la rénitialisation de votre mot de passe.',
          error
        );
        // Set the error message state with the server's error message if available
        setErrorMessage(
          error.response.data.error ||
            'Une erreur est survenue lors de la rénitialisation de votre mot de passe.'
        );
      });
  };

  return (
    <Main>
      <h1 className="forgot-password-title main-title">
        Réinitialiser le mot de passe
      </h1>
      <section className="forgot-password-container">
        <h2 className="forgot-password-subtitle">
          Veuillez saisir l&apos;adresse e-mail associée à votre compte.
        </h2>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          {/* Modal Forgot Password */}
          {showModalForgotPassword && (
            <ModalForgotPassword
              closeModal={() => setShowModalForgotPassword(false)}
            />
          )}
          {/* Error Message */}
          {errorMessage && (
            <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
          )}
          {/* Input Email */}
          <InputField
            name="email"
            placeholder="Votre e-mail"
            type="email"
            icon="fa-solid fa-at"
            maxlength={320}
            required
          />
          {/* Submit Button */}
          <Button
            text="Confirmer"
            customClass="color button-style--width"
            type="submit"
          />
        </form>
      </section>
    </Main>
  );
}

export default ForgotPassword;
