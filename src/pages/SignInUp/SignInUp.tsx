import { useState } from 'react';
import SignInForm from '../../components/SignInForm/SignInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Main from '../../layout/Main/Main';

import './SignInUp.scss';

function SignInUp() {
  const [signIn, setSignInForm] = useState(true);

  const toggleForm = () => {
    setSignInForm(!signIn);
  };

  return (
    <Main>
      <div className="form-container">
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
      </div>
    </Main>
  );
}

export default SignInUp;
