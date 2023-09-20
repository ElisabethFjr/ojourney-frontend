import FieldForm from '../FieldForm/FieldForm';
import './SignInForm.scss';

function SignInForm() {
  return (
    <div className="form-content">
      <h1 className="form-title">Connectez-vous</h1>
      <form className="form-element">
        <FieldForm name="email" placeholder="Email" type="email" />
        <FieldForm name="password" placeholder="Mot de passe" type="password" />
        <button className="form-submit-button" type="submit">
          Se Connecter
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
