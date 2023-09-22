import InputField from '../InputField/InputField';
import ButtonSubmit from '../Button/ButtonSubmit/ButtonSubmit';
import './SignUpForm.scss';

function SignUpForm() {
  return (
    <div className="form-content">
      <form className="form-element">
        <InputField
          name="lastname"
          placeholder="Nom"
          type="text"
          icon="fa-solid fa-user"
        />
        <InputField
          name="firstname"
          placeholder="Prénom"
          type="text"
          icon="fa-solid fa-user"
        />
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
        <InputField
          name="confirmation"
          placeholder="Mot de passe (confirmation)"
          type="password"
          icon="fa-solid fa-lock"
        />
        <ButtonSubmit text="S'inscrire" />
      </form>
    </div>
  );
}

export default SignUpForm;
