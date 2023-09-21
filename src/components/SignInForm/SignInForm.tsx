import InputField from '../InputField/InputField';
import ButtonForm from '../ButtonSubmit/ButtonSubmit';
import './SignInForm.scss';

function SignInForm() {
  return (
    <div className="form-content">
      <form className="form-element">
        <InputField name="email" placeholder="Email" type="email" />
        <InputField
          name="password"
          placeholder="Mot de passe"
          type="password"
        />
        <ButtonForm text="Se Connecter" />
      </form>
    </div>
  );
}

export default SignInForm;
