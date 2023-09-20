import FieldForm from '../FieldForm/FieldForm';
import ButtonForm from '../ButtonSubmit/ButtonSubmit';
import './SignUpForm.scss';

function SignUpForm() {
  return (
    <div className="form-content">
      <h1 className="form-title">Créez un compte</h1>
      <form className="form-element">
        <FieldForm name="lastname" placeholder="Nom" type="text" />
        <FieldForm name="firstname" placeholder="Prénom" type="text" />
        <FieldForm name="email" placeholder="Email" type="email" />
        <FieldForm name="password" placeholder="Mot de passe" type="password" />
        <FieldForm
          name="confirmation"
          placeholder="Mot de passe (confirmation)"
          type="password"
        />
        <ButtonForm text="S'inscrire" />
      </form>
    </div>
  );
}

export default SignUpForm;
