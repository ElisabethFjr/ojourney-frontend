import Main from '../../layout/Main/Main';

import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

import './NewPassword.scss';

function NewPassword() {
  const handleClickSubmit = () => {
    console.log('Au clic sur le bouton, valider le modification de mdp');
  };
  return (
    <Main>
      <h1 className="main-title new-password-title">
        Créer un nouveau mot de passe
      </h1>
      <div className="new-password-container">
        <form className="new-password-form" onSubmit={handleClickSubmit}>
          <h2 className="new-proposition-form-title">
            Votre nouveau mot de passe
          </h2>
          <InputField
            name="password"
            placeholder="Nouveau mot de passe"
            type="password"
            icon="fa-solid fa-lock"
          />

          <InputField
            name="confirmation"
            placeholder="Mot de passe (confirmation)"
            type="password"
            icon="fa-solid fa-lock"
          />
          <Button
            text="Confirmer"
            type="submit"
            customClass="color button-style--width"
          />
        </form>
      </div>
    </Main>
  );
}

export default NewPassword;
