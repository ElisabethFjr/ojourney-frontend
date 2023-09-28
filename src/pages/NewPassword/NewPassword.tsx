import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

import './NewPassword.scss';

function NewPassword () {

  return (
    <div className="main-newpassword"> 

    <h1 className="title">Nouveau mot de passe</h1>
    
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

<div className="new-password-button-container">
<Button
      text="Annuler"
      type="button"
      customClass="outline-dark"
      onClick="outline"
    />
<Button
      text="Confirmer"
      type="button"
      customClass="outline-dark"
      onClick="outline"
    />
    </div>

    </div>
    
  )

}

export default NewPassword;