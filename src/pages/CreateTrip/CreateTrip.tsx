import ButtonSubmit from '../../components/ButtonSubmit/ButtonSubmit';
import InputField from '../../components/InputField/InputField';
import TextareaField from '../../components/TextareaField/TextareaField';
import Main from '../../layout/Main/Main';
import './CreateTrip.scss';

function CreateTrip() {
  return (
    <Main>
      <h1 className="main-title">Créer un nouveau voyage</h1>
      <form className="form-container">
        <h2 className="form-title">Nouveau voyage</h2>
        <InputField name="localisation" placeholder="Destination" type="text" />
        <InputField
          name="date_start"
          placeholder="Date de départ"
          type="date"
        />
        <InputField name="date_end" placeholder="Date de retour" type="date" />
        <TextareaField
          name="description"
          placeholder="Description du voyage (facultatif)"
        />
        <ButtonSubmit text="Créer le voyage" />
      </form>
    </Main>
  );
}

export default CreateTrip;
