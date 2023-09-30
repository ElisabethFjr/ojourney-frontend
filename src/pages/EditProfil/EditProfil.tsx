import './EditProfil.scss';

import Main from '../../layout/Main/Main';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

function EditProposition() {
  return (
    <Main>
      <h1 className="main-title">Modifier votre information</h1>
      <div className="edit-profil-container">
        <form className="edit-profil-form">
          <InputField
            name="lastname"
            placeholder="Nom"
            type="text"
            icon="fa-solid fa-user"
            required
          />
          <Button
            text="Modifier le nom"
            customClass="color button-style--width button-style--height"
            type="submit"
          />
        </form>
        <form className="edit-profil-form">
          <InputField
            name="firstname"
            placeholder="Prénom"
            type="text"
            icon="fa-solid fa-user"
            required
          />
          <Button
            text="Modifier prénom"
            customClass="color button-style--width button-style--height"
            type="submit"
          />
        </form>
        <form className="edit-profil-form">
          <InputField
            name="email"
            placeholder="Email"
            type="email"
            icon="fa-solid fa-at"
            required
          />
          <Button
            text="Modifier email"
            customClass="color button-style--width button-style--height"
            type="submit"
          />
        </form>
      </div>
    </Main>
  );
}

export default EditProposition;
