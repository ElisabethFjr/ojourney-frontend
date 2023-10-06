import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login } from '../../store/reducers/user';

import InputField from '../InputField/InputField';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Button from '../Button/Button';
import ModalConfirmemail from '../ModalConfirmEmail/ModalConfirmEmail'

import './SignInForm.scss';
import ModalConfirmEmail from '../ModalConfirmEmail/ModalConfirmEmail';

function SignInForm() {

  const [showModalConfirmEmail, setShowModalConfirmEmail] =
  useState<boolean>(false);
  const handleClickConfirmEmail = () => {
    setShowModalConfirmEmail(!showModalConfirmEmail);
  };
  // Initialize Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Fetch states from Redux store
  const errorMessage = useAppSelector((state) => state.user.errorMessage);
  const isConnected = useAppSelector((state) => state.user.isConnected);

  // Event handler SignIn form submit
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    // Dispatch the login action with form data
    await dispatch(login(formData));
  };

  const handleClick = () => {
    setShowModalConfirmEmail(false);
  };

  // Navigate to /my-trips if connexion succeed
  useEffect(() => {
    if (isConnected) {
      navigate('/my-trips');
    }
  }, [navigate, isConnected]);

  return (
    <div className="form-content">
      <form className="form-element" onSubmit={handleSubmit}>
        {/* If ErroMessage, display the error */}
        {errorMessage && (
          <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
        )}
        <InputField
          name="email"
          placeholder="Email"
          type="email"
          icon="fa-solid fa-at"
          required
        />
        <InputField
          name="password"
          placeholder="Password"
          type="password"
          icon="fa-solid fa-lock"
          required
          autocomplete="off"
        />
        <Button
          text="Se Connecter"
          customClass="color button-style--width"
          type="submit"
        />
        <div className="button-forgot-password">
                      <Link to={`/forgot-password`}>
                <Button
                  text="Mot de passe oublié ?"
                  icon="fa-solid fa-pen"
                  type="button"
                  customClass="height"
                />
              </Link>
              </div> 
              
          <div className="button-forgot-email">
            <Button
            text="Un souci de connexion ?"
            onClick={handleClickConfirmEmail} 
            type="button"
            customClass={'link'}        
            />  
              </div>
      </form>
      {showModalConfirmEmail && <ModalConfirmEmail />}
    </div>
  );
}

export default SignInForm;
