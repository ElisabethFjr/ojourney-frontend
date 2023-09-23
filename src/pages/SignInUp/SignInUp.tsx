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
      <FormContainer>
        <h1 className="form-title">
          {signIn ? 'Connectez-vous' : 'Créez un compte'}
        </h1>
        <div className="form-header">
          <button
            onClick={toggleForm}
            className={
              signIn
                ? 'form-toggle-button button--active'
                : 'form-toggle-button'
            }
            type="button"
          >
            Connexion
          </button>
          <button
            onClick={toggleForm}
            className={
              !signIn
                ? 'form-toggle-button button--active'
                : 'form-toggle-button'
            }
            type="button"
          >
            Inscription
          </button>
        </div>
        {signIn ? <SignInForm /> : <SignUpForm />}
      </FormContainer>
    </Main>
  );
}

export default SignInUp;
