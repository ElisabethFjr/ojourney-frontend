// Import React Hook
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Inmport Custom Hooks
import { useAppDispatch } from '../../hooks/redux';
import { resetAuth } from '../../store/reducers/user';

// Import Axios Instance
import axiosInstance from '../../utils/axios';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import Button from '../../components/Button/Button';

// Import Styles
import './ConfirmInvite.scss';

function ConfirmInvite() {
  // Initializing Hooks
  const dispatch = useAppDispatch();

  // Declaration States Variables
  const [isConfirmed, setIsConfirmed] = useState(false);

  const token = document.location.search.split('?')[1];

  useEffect(() => {
    async function confirmInvite() {
      await axiosInstance
        // Send request GET to URL with token
        .get(`/invite?invite=${token}`)
        .then(() => {
          dispatch(resetAuth()); // Reset Auth status to allow the invited member to log in
          setIsConfirmed(true);
        })
        .catch(() => {
          setIsConfirmed(false);
        });
    }
    confirmInvite();
  }, [token, dispatch]);

  return (
    <Main>
      <section className="confirm-container">
        {isConfirmed ? (
          <>
            <h1 className="main-title confirm-title">
              Bienvenue sur O&apos;Journey !
            </h1>
            <h2 className="confirm-subtitle">
              Vous avez bien été ajouté(e) à un voyage !
            </h2>
            <p className="confirm-text">
              Pour continuer, veuillez vous connecter ou vous inscrire en
              cliquant sur le bouton ci-dessous.
            </p>
            <Link to="/signin-signup">
              <Button
                text="Se Connecter"
                customClass="color"
                type="button"
                aria-label="Se connecter"
              />
            </Link>
          </>
        ) : (
          <>
            <h1 className="main-title confirm-title">
              Une erreur est survenue, l&apos;invitation au voyage a échouée.
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

export default ConfirmInvite;
