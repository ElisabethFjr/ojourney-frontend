import { useState } from 'react';

import Main from '../../layout/Main/Main';

import FormContainer from '../../components/FormContainer/FormContainer';
import SignInForm from '../../components/SignInForm/SignInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

import './SignInUp.scss';

function SignInUp() {
  const [signIn, setSignInForm] = useState(true);

  const toggleForm = () => {
    setSignInForm(!signIn);
  };

  return (
    <Main>
      <section className="sign-form-container">
        <FormContainer>
          <h1 className="sign-form-title">
            {signIn ? 'Connectez-vous' : 'Créez un compte'}
          </h1>

          <div className="sign-form-header">
            <button
              onClick={toggleForm}
              className={
                signIn
                  ? 'sign-form-toggle-button button--active'
                  : 'sign-form-toggle-button'
              }
              type="button"
            >
              Connexion
            </button>
            <button
              onClick={toggleForm}
              className={
                !signIn
                  ? 'sign-form-toggle-button button--active'
                  : 'sign-form-toggle-button'
              }
              type="button"
            >
              Inscription
            </button>
          </div>

          {signIn ? <SignInForm /> : <SignUpForm />}
        </FormContainer>
      </section>
    </Main>
  );
}

export default SignInUp;
