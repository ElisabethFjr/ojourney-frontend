import Main from '../../layout/Main/Main';

import ButtonSubmit from '../../components/Button/ButtonSubmit/ButtonSubmit';
import InputField from '../../components/InputField/InputField';
import InputFieldImage from '../../components/InputFieldImage/InputFieldImage';
import TextareaField from '../../components/TextareaField/TextareaField';

import './NewTrip.scss';

function NewTrip() {
  const handleFile = (file: File) => {
    console.log('Fichier sélectionné :', file);
  };

  return (
    <Main>
      <h1 className="main-title">Créer un nouveau voyage</h1>
      <form className="form-container">
        <h2 className="form-title">Nouveau voyage</h2>
        <InputField
          name="localisation"
          placeholder="Destination"
          type="text"
          icon="fa-solid fa-location-dot"
        />
        <InputField
          name="date_start"
          placeholder="Date de départ"
          type="date"
          icon=""
        />
        <InputField
          name="date_end"
          placeholder="Date de retour"
          type="date"
          icon=""
        />
        <TextareaField
          name="description"
          placeholder="Description du voyage (facultatif)"
          icon="fa-solid fa-pen-nib"
        />
        <InputFieldImage handleFile={handleFile} />
        <ButtonSubmit text="Créer le voyage" />
      </form>
    </Main>
  );
}

export default NewTrip;
