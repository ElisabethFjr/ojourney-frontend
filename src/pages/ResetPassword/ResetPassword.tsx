import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';

import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

import './ResetPassword.scss';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function ResetPassword() {
  // Initialize Hooks
  const navigate = useNavigate();

  // Declaration state variables
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const token = document.location.hash.split('?')[1];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Extract password and confirmation from formData
    const newPassword = formData.get('password') as string;
    const confirmPassword = formData.get('confirmation') as string;

    // Check if the password and confirmation match
    if (newPassword !== confirmPassword) {
      setErrorMessage("La confirmation de mot de passe n'est pas valide.");
      return;
    }

    // Check if one field is empty and set an errorMessage
    if (!newPassword || !confirmPassword) {
      setErrorMessage('Veuillez renseigner tous les champs obligatoires.');
      return;
    }

    // Remove the 'confirmation' field from the data to be sent
    formData.delete('confirmation');

    // Send registration form data (JSON) to the server with Axios
    const jsonData = Object.fromEntries(formData.entries());

    await axiosInstance
      .patch(`/reset?reset=${token}`, jsonData)
      .then(() => {
        navigate('/signin-signup');
        toast.success('Le mot de passe a été réinitialiser avec succès !');
      })
      .catch((error) => {
        console.error(error);
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
          {errorMessage && (
            <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
          )}
          {/* Input Password */}
          <InputField
            name="password"
            placeholder="Nouveau mot de passe"
            type="password"
            icon="fa-solid fa-lock"
            maxlength={128}
            required
          />
          {/* Input Confirmation Password */}
          <InputField
            name="confirmation"
            placeholder="Mot de passe (confirmation)"
            type="password"
            icon="fa-solid fa-lock"
            maxlength={128}
            required
          />
          {/* Submit Button */}
          <Button
            text="Confirmer"
            type="submit"
            customClass="color button-style--width"
          />
        </form>
      </div>
    </Main>
  );
}

export default ResetPassword;
