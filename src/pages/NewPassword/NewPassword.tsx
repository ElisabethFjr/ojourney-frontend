import Main from '../../layout/Main/Main';

import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

import './NewPassword.scss';

function NewPassword() {
  const handleClickCancel = () => {
    console.log('Au clic sur le bouton, revenir en arrière');
  };

  const handleClickSubmit = () => {
    console.log('Au clic sur le bouton, valider le modification de mdp');
  };
  return (
    <Main>
      <h1 className="main-title new-password-title">Nouveau mot de passe</h1>
      <div className="new-password-container">
        <form className="new-password-form" onSubmit={handleClickSubmit}>
          <InputField
            name="password"
            placeholder="Nouveau Mot de passe"
            type="password"
            icon="fa-solid fa-lock"
          />

          <InputField
            name="confirmation"
            placeholder="Mot de passe (confirmation)"
            type="password"
            icon="fa-solid fa-lock"
          />
          <div className="new-password-btn-container">
            <Button
              text="Annuler"
              type="button"
              customClass="outline-dark"
              onClick={handleClickCancel}
            />
            <Button text="Confirmer" type="submit" customClass="color" />
          </div>
        </form>
      </div>
    </Main>
  );
}

export default NewPassword;
