// Imports React Hook
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import Axios Instance
import axiosInstance from '../../utils/axios';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import Button from '../../components/Button/Button';

// Import styles
import './ConfirmAccount.scss';

function ConfirmAccount() {
  // Declaration States Variables
  const [isConfirmed, setIsConfirmed] = useState(false);

  const token = document.location.search.split('?')[1];

  useEffect(() => {
    async function confirmEmail() {
      await axiosInstance
        .get(`/confirm?confirm=${token}`)
        .then(() => {
          setIsConfirmed(true);
        })
        .catch(() => {
          setIsConfirmed(false);
        });
    }
    confirmEmail();
  }, [token]);

  return (
    <Main>
      <section className="confirm-container">
        {isConfirmed ? (
          <>
            <h1 className="main-title confirm-title">
              Bravo ! Votre compte a été créé avec succès.
            </h1>
            <p className="confirm-text">
              Vous pouvez maintenant vous connecter en cliquant sur le bouton
              ci-dessous.
            </p>
            <Link to="/signin-signup">
              <Button text="Se Connecter" customClass="color" type="button" />
            </Link>
          </>
        ) : (
          <>
            <h1 className="main-title confirm-title">
              Désolé, la confirmation de compte a échoué.
            </h1>
            <p className="confirm-text">
              Veuillez réessayer plus tard ou nous contacter.
            </p>
          </>
        )}
      </section>
    </Main>
  );
}

export default ConfirmAccount;
