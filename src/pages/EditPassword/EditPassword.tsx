// Import Hooks
import { FormEvent, useState } from 'react';

// Import React-Router
import { useNavigate } from 'react-router-dom';

// Import custom Redux hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Import Redux actions
import { updatePassword } from '../../store/reducers/user';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';

// Import Style
import './EditPassword.scss';
import InputPassword from '../../components/InputPassword/InputPassword';
import InputField from '../../components/InputField/InputField';

function EditPassword() {
  // Initialize the navigation hook
  const navigate = useNavigate();
  // Initialize the dispatch function for Redux actions
  const dispatch = useAppDispatch();

  // Get user data from the Redux store.
  const userData = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  // Declaration state variables
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Regular expression to check the password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^0-9a-zA-Z]).{10,}$/;

  // Event handler for the Edit Password form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Extract password and confirmation from formData
    const newPassword = formData.get('password') as string;
    const confirmPassword = formData.get('confirmation') as string;

    // Clear all Error Messages
    setErrorMessage(null);

    // Check the strength's password
    if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        'Le mot de passe doit contenir au moins 10 caractères, 1 caractère spécial, 1 chiffre, 1 majuscule et 1 minuscule.'
      );
      return;
    }

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

    // Dispatch the updated password to Redux store
    await dispatch(updatePassword({ formData, id: userData.id }));
    navigate('/profil');
  };

  return (
    <Main>
      <h1 className="main-title">Modifier votre mot de passe</h1>
      <div className="edit-password-container">
        <form className="edit-password-form" onSubmit={handleSubmit}>
          {/* Back Button */}
          <div className="edit-password-back-btn">
            <ButtonIcon
              icon="fa-solid fa-arrow-left"
              handleClick={() => navigate(-1)} // Go back to the previous page
              customClass="back"
              aria-label="Retour à la page précédente"
            />
          </div>

          {/* If ErrorMessage, display the error */}
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

          {/* Button Submit */}
          <Button
            text="Modifier votre mot de passe"
            customClass="color button-style--width button-style--height"
            type="submit"
            isLoading={isLoading}
          />
        </form>
      </div>
    </Main>
  );
}

export default EditPassword;
