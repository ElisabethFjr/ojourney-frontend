import { useState } from 'react';
import SignInForm from '../../components/SignInForm/SignInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

import './SignInUp.scss';

function SignInUp() {
  const [signIn, setSignInForm] = useState(true);

  const toggleForm = () => {
    setSignInForm(!signIn);
  };

  return (
    <main className="main form">
      <div className="form-container">
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
    </main>
  );
}

export default SignInUp;
