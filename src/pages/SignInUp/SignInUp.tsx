import { useState } from 'react';

import Main from '../../layout/Main/Main';

import FormContainer from '../../layout/FormContainer/FormContainer';
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
              className={`sign-form-toggle-button ${signIn ? 'active' : ''}`}
              type="button"
            >
              Connexion
            </button>
            <button
              onClick={toggleForm}
              className={`sign-form-toggle-button ${!signIn ? 'active' : ''}`}
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
