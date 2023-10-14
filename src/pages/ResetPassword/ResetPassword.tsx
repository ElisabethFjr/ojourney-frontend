// Imports React Hook
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Import Axios Instance
import axiosInstance from '../../utils/axios';

// Import Layout & Components
import Main from '../../layout/Main/Main';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import InputPassword from '../../components/InputPassword/InputPassword';

// Import Styles
import './ResetPassword.scss';

function ResetPassword() {
  // Initialize Hooks
  const navigate = useNavigate();

  // Declaration state variables
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // ErrorMessage
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading indicator

  // Extract link token from the url
  const token = document.location.search.split('?')[1];

  // Regular expression to check the password
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/;

  // Event handler for the Reset Password form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Set the loading button pending
    setIsLoading(true);
    // Get the current form element
    const form = event.currentTarget;
    // Create a FormData object
    const formData = new FormData(form);

    // Extract password and confirmation from formData
    const newPassword = formData.get('password') as string;
    const confirmPassword = formData.get('confirmation') as string;

    // Clear all Error Messages
    setErrorMessage(null);

    // Check the strenght's password
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        'Le mot de passe doit contenir au moins 10 caractères, 1 caractère spécial, 1 chiffre, 1 majuscule et 1 minuscule.'
      );
      setIsLoading(false);
      return;
    }

    // Check if the password and confirmation match
    if (newPassword !== confirmPassword) {
      setErrorMessage("La confirmation de mot de passe n'est pas valide.");
      setIsLoading(false);
      return;
    }

    // Check if one field is empty and set an errorMessage
    if (!newPassword || !confirmPassword) {
      setErrorMessage('Veuillez renseigner tous les champs obligatoires.');
      setIsLoading(false);
      return;
    }

    // Remove the 'confirmation' field from the data to be sent
    formData.delete('confirmation');

    // Send registration form data (JSON) to the server with Axios
    const jsonData = Object.fromEntries(formData.entries());

    await axiosInstance
      // Send request PATCH to URL with token in json
      .patch(`/reset?reset=${token}`, jsonData)
      .then(() => {
        // Redirects to the page
        navigate('/signin-signup');
        setIsLoading(false);
        toast.success('Le mot de passe a été réinitialisé avec succès !');
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Une erreur est survenue, veuillez réessayer plus tard.');
      });
  };

  return (
    <Main>
      <h1 className="main-title new-password-title">
        Créer un nouveau mot de passe
      </h1>
      <div className="new-password-container">
        <form className="new-password-form" onSubmit={handleSubmit}>
          {/*  Form Title */}
          <h2 className="new-proposition-form-title">
            Votre nouveau mot de passe
          </h2>
          {/* Error Message */}
          {errorMessage && <ErrorMessage text={errorMessage} />}
          {/* Input Password */}
          <InputPassword />

          {/* Input Confirmation Password */}
          <InputField
            name="confirmation"
            placeholder="Mot de passe (confirmation)"
            type="password"
            icon="fa-solid fa-lock"
            maxlength={128}
            required
            autocomplete="off"
          />

          {/* Submit Button */}
          <Button
            text="Confirmer"
            type="submit"
            customClass="color button-style--width"
            isLoading={isLoading}
          />
        </form>
      </div>
    </Main>
  );
}

export default ResetPassword;
