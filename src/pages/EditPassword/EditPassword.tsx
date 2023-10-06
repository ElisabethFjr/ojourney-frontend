// Import Hooks
import { ChangeEvent, FormEvent, useState } from 'react';

// Import React-Router
import { useNavigate } from 'react-router-dom';

// Import Modules
import DOMPurify from 'dompurify';

// Import custom Redux hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Import Redux actions
import { updatePassword } from '../../store/reducers/user';

// Import Components
import Main from '../../layout/Main/Main';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';

// Import Style
import './EditPassword.scss';

function EditPassword() {
  // Initialize the navigation hook
  const navigate = useNavigate();
  // Initialize the dispatch function for Redux actions
  const dispatch = useAppDispatch();

  // Get user data from the Redux store.
  const userData = useAppSelector((state) => state.user.data);

  // Declaration state variables
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Function to handle input changes with sanitization
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setValue: (value: string) => void
  ) => {
    const { value } = event.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setValue(sanitizedValue);
  };

  // Function to handle form submission
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
    setErrorMessage(null);

    // Remove the 'confirmation' field from the data to be sent
    formData.delete('confirmation');

    // Dispatch the updated password to Redux store
    dispatch(updatePassword({ formData, id: userData.id }));
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
            />
          </div>

          {/* If ErroMessage, display the error */}
          {errorMessage && (
            <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
          )}

          {/* Input Password */}
          <div className="field-edit">
            <label className="field-edit-label" htmlFor="password">
              Mot de passe
            </label>
            <input
              className="field-edit-input"
              value={password}
              onChange={(event) => handleInputChange(event, setPassword)}
              name="password"
              placeholder="Modifier le mot de passe"
              id="password"
              type="password"
              maxLength={128}
              required
            />
            <div className="field-edit-icon">
              <i className="fa-solid fa-lock" />
            </div>
          </div>

          {/* Input Confirm Password */}
          <div className="field-edit">
            <label className="field-edit-label" htmlFor="confirmation">
              Confirmation du mot de passe
            </label>
            <input
              className="field-edit-input"
              value={confirmation}
              onChange={(event) => handleInputChange(event, setConfirmation)}
              name="confirmation"
              placeholder="Modifier le mot de passe"
              id="confirmation"
              type="password"
              maxLength={128}
              required
            />
            <div className="field-edit-icon">
              <i className="fa-solid fa-lock" />
            </div>
          </div>

          {/* Button Submit */}
          <Button
            text="Modifier votre mot de passe"
            customClass="color button-style--width button-style--height"
            type="submit"
          />
        </form>
      </div>
    </Main>
  );
}

export default EditPassword;
