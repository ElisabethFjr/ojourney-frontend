import Main from '../../layout/Main/Main';

import FormContainer from '../../components/FormContainer/FormContainer';
import ButtonSubmit from '../../components/Button/ButtonSubmit/ButtonSubmit';
import InputField from '../../components/InputField/InputField';

import './NewProposition.scss';

function NewProposition() {
  return (
    <Main>
      <h1 className="main-title">Faire une proposition</h1>
      <FormContainer>
        <h2 className="form-title">Proposition</h2>
        <InputField
          name="description"
          placeholder="Nom de la proposition"
          type="text"
          icon="fa-solid fa-pen-nib"
        />
        <InputField
          name="localisation"
          placeholder="Localisation"
          type="text"
          icon="fa-solid fa-location-dot"
        />
        <InputField
          name="url"
          placeholder="URL de la proposition"
          type="url"
          icon="fa-solid fa-link"
        />
        <ButtonSubmit text="Valider la proposition" />
      </FormContainer>
    </Main>
  );
}

export default NewProposition;
