// Import React Hooks & FormEvent
import { FormEvent, useState } from 'react';
// Import React-Router-Dom
import { Link, useNavigate } from 'react-router-dom';
// Import Redux Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// Import Redux Actions
import { login } from '../../store/reducers/user';
// Import Components
import InputField from '../InputField/InputField';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Button from '../Button/Button';
import ModalConfirmEmail from '../ModalConfirmEmail/ModalConfirmEmail';
// Import Styles
import './SignInForm.scss';

function SignInForm() {
  // Initialize Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Fetch states from Redux store
  const errorMessage = useAppSelector((state) => state.user.errorMessage);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  // Event handler on the SignIn form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Get the current from
    const form = event.currentTarget;
    // Create a FormData Object
    const formData = new FormData(form);
    // Dispatch the login action with form data
    await dispatch(login(formData));
    navigate('/my-trips');
  };
  // State Variables
  const [showModalConfirmEmail, setShowModalConfirmEmail] =
    useState<boolean>(false);

  const handleClickConfirmEmail = () => {
    setShowModalConfirmEmail(!showModalConfirmEmail);
  };

  return (
    <div className="form-content">
      <form className="form-element" onSubmit={handleSubmit}>
        {/* If ErrorMessage, display the error */}
        {errorMessage && <ErrorMessage text={errorMessage} />}
        {/* Input Email */}
        <InputField
          name="email"
          placeholder="Email"
          type="email"
          icon="fa-solid fa-at"
          maxlength={320}
          required
        />
        {/* Input Password */}
        <InputField
          name="password"
          placeholder="Password"
          type="password"
          icon="fa-solid fa-lock"
          maxlength={128}
          required
          autocomplete="off"
        />
        {/* Submit Button */}
        <Button
          text="Se Connecter"
          customClass="color button-style--width"
          type="submit"
          isLoading={isLoading}
        />
        {/* Forgot Password Link */}
        <div className="signin-forgot-password">
          <Link to="/forgot-password">Mot de passe oublié ? </Link>
        </div>

        <div className="signin-resend-email">
          <Button
            text="Un souci de connexion ?"
            onClick={handleClickConfirmEmail}
            type="button"
            customClass="link"
          />
        </div>
      </form>
      {showModalConfirmEmail && (
        <ModalConfirmEmail closeModal={() => setShowModalConfirmEmail(false)} />
      )}
    </div>
  );
}

export default SignInForm;
