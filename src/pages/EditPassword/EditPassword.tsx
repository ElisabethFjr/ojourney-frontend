import './EditPassword.scss';

import Main from '../../layout/Main/Main';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

function EditPassword() {
  return (
    <Main>
      <h1 className="main-title">Modifier votre mot de passe</h1>
      <div className="edit-password-container">
        <form className="edit-password-form">
          <InputField
            name="password"
            placeholder="Ancien - Mot de passe"
            type="password"
            icon="fa-solid fa-lock"
            required
            autocomplete="off"
          />
          <InputField
            name="password"
            placeholder="Nouveau - Mot de passe"
            type="NewPassword"
            icon="fa-solid fa-lock"
            required
            autocomplete="off"
          />
          <InputField
            name="password"
            placeholder="Nouveau - Mot de passe"
            type="NewPasswordConfirmation"
            icon="fa-solid fa-lock"
            required
            autocomplete="off"
          />
          <Button
            text="Modifer votre mot de passe"
            customClass="color button-style--width button-style--height"
            type="submit"
          />
        </form>
      </div>
    </Main>
  );
}

export default EditPassword;
