import React, { FormEvent, useEffect } from 'react';
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
  const isConnected = useAppSelector((state) => state.user.isConnected);
  const errorMessage = useAppSelector((state) => state.user.errorMessage);

  // Handle SignIn form submit
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await dispatch(login(formData));
      // Redirect the user only if the login is successful
    } catch (error) {
      console.error('Login error:', error);
    }
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
          placeholder="Password"
          type="password"
          icon="fa-solid fa-lock"
        />
        <ButtonSubmit text="Log In" />
      </form>
    </div>
  );
}

export default SignInForm;
