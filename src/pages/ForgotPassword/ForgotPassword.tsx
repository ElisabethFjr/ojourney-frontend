import InputField from '../../components/InputField/InputField';

import './ForgotPassword.scss';

function ForgotPassword () {

  return (
    <section className="forgot-password-container">

  <h1 className="forgot-password-title">Réinitialiser le mot de passe</h1>
  
<h2 className='forgot-password-subtitle'>Veuillez saisir l'adresse mail associée à votre compte.</h2>

  <form className='forgot-password-form'>
  <InputField
              name="email"
              placeholder="Votre e-mail"
              type="email"
              icon="fa-solid fa-at"
            />
  </form>

  </section>
  )

}

export default ForgotPassword;
