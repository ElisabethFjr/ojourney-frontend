import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { login } from '../../store/reducers/user';

import InputField from '../InputField/InputField';
import ButtonSubmit from '../Button/ButtonSubmit/ButtonSubmit';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import './SignInForm.scss';

function SignInForm() {
  // Initialize Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  // Get states from Redux 
  const pseudo = useAppSelector((state) => state.user.pseudo);
  const errorMessage = useAppSelector((state) => state.user.errorMessage);

  // Handle SignIn form submit
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    dispatch(login(formData));
    // navigate('/my-trips');
  };

  return (
    <div className="form-content">
      <form className="form-element" onSubmit={handleSubmit}>
        {errorMessage && (
          <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
        )}
        <InputField
          name="email"
          placeholder="Email"
          type="email"
          icon="fa-solid fa-at"
        />
        <InputField
          name="password"
          placeholder="Mot de passe"
          type="password"
          icon="fa-solid fa-lock"
        />
        <ButtonSubmit text="Se Connecter" />
      </form>
    </div>
  );
}

export default SignInForm;
