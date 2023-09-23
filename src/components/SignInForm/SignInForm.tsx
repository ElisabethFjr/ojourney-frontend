import InputField from '../InputField/InputField';
import ButtonSubmit from '../Button/ButtonSubmit/ButtonSubmit';

import './SignInForm.scss';

function SignInForm() {
  return (
    <div className="form-content">
      <form className="form-element">
        <InputField
          name="email"
          placeholder="Email"
          type="email"
          icon="fa-solid fa-at"
        />
        <InputField
          name="password"
          placeholder="Mot de passe"
          type="password"
          icon="fa-solid fa-lock"
        />
        <ButtonSubmit text="Se Connecter" />
      </form>
    </div>
  );
}

export default SignInForm;
