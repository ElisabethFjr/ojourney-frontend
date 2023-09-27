import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';

import ButtonColor from '../../components/Button/ButtonColor/ButtonColor';
import Main from '../../layout/Main/Main';

import './ConfirmAccount.scss';

function ConfirmAccount() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { token } = useParams();
  // const token = new URLSearchParams(document.location.search);
  // const tokenValue = token.get('token');

  useEffect(() => {
    async function confirmEmail() {
      await axiosInstance
        .get(`/confirm?confirm=${token}`)
        .then((response) => {
          setIsConfirmed(true);
          console.log('Réponse ok');
          console.log(`Réponse: ${response.data}`);
        })
        .catch((error) => {
          setIsConfirmed(false);
          console.log('Erreur');
          console.log(error);
        });
    }
    confirmEmail();
  }), [token];

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
            <ButtonColor text="Se Connecter" to="/signin-signup" />
          </>
        ) : (
          <>
            <h1 className="main-title confirm-title">
              Désolé, la confirmation de compte a échoué.
            </h1>
            <p className="confirm-text">
              {' '}
              Veuillez réessayer plus tard ou nous contacter.
            </p>
          </>
        )}
      </section>
    </Main>
  );
}

export default ConfirmAccount;
