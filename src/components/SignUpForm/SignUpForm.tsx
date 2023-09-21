import FieldForm from '../InputField/InputField';
import ButtonForm from '../ButtonSubmit/ButtonSubmit';
import './SignUpForm.scss';

function SignUpForm() {
  return (
    <div className="form-content">
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
