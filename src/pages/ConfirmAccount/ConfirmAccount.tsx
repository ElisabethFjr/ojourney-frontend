import ButtonColor from '../../components/Button/ButtonColor/ButtonColor';
import Main from '../../layout/Main/Main';

import './ConfirmAccount.scss';

function ConfirmAccount() {
  return (
    <Main>
      <section className="confirm-container">
        <h1 className="main-title confirm-title">
          Bravo ! Votre compte a été créé avec succès.
        </h1>
        <p className="confirm-text">
          Vous pouvez maintenant vous connecter en cliquant sur le bouton
          ci-dessous.
        </p>
        <ButtonColor text="Se Connecter" to="/signin-signup" />
      </section>
    </Main>
  );
}

export default ConfirmAccount;
