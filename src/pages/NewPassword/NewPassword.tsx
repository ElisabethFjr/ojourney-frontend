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
    <div className="new-password-main">
      <h1 className="new-password-title">Nouveau mot de passe</h1>

      <form
        className="new-password-input-container"
        onSubmit={handleClickSubmit}
      >
        <InputField
          name="password"
          placeholder="Mot de passe"
          type="password"
          icon="fa-solid fa-lock"
        />

        <InputField
          name="confirmation"
          placeholder="Mot de passe (confirmation)"
          type="password"
          icon="fa-solid fa-lock"
        />
      </form>

      <div className="new-password-btn-container">
        <Button
          text="Annuler"
          type="button"
          customClass="outline-dark"
          onClick={handleClickCancel}
        />
        <Button text="Confirmer" type="submit" customClass="outline-dark" />
      </div>
    </div>
  );
}

export default NewPassword;
