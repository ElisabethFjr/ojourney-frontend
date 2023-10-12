// Import React
import { FormEvent, useState } from 'react';

// Import Axios Instance
import axiosInstance from '../../utils/axios';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ModalForgotPassword from '../../components/ModalForgotPassword/ModalForgotPassword';

// Import Styles
import './ForgotPassword.scss';

function ForgotPassword() {
  const [showModalForgotPassword, setShowModalForgotPassword] =
    useState<boolean>(false); // Show Confirmation Modal
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading indicator

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Set the loading button pending
    setIsLoading(true);
    // Get the current form element
    const form = event.currentTarget;
    // Create a FormData object
    const formData = new FormData(form);
    // Convert a JSON object
    const jsonData = Object.fromEntries(formData.entries());

    // Clear all Error Messages
    setErrorMessage(null);

    // Check if field is empty and set an errorMessage
    if (!jsonData.email) {
      setErrorMessage('Veuillez renseigner votre email.');
      return;
    }

    await axiosInstance
      // Send request PATCH to URL in json
      .post('/reset', jsonData)
      .then(() => {
        setShowModalForgotPassword(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        // Set the error message state with the server's error message if available
        if (
          error.response.data.error.trim() === "This user doesn't exist in DB !"
        ) {
          setErrorMessage("Aucun compte n'est associé à cette adresse email.");
        } else {
          setErrorMessage(
            'Une erreur est survenue lors de la rénitialisation de votre mot de passe.'
          );
        }
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
            isLoading={isLoading}
          />
        </form>
      </section>
    </Main>
  );
}

export default ForgotPassword;
