import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { format } from 'date-fns';

import Main from '../../layout/Main/Main';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';
import InputFieldImage from '../../components/InputFieldImage/InputFieldImage';
import TextareaField from '../../components/TextareaField/TextareaField';
import ButtonSubmit from '../../components/Button/ButtonSubmit/ButtonSubmit';

import 'react-datepicker/dist/react-datepicker.css';
import './NewTrip.scss';

function NewTrip() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  registerLocale('fr', fr);

  const handleFile = (file: File) => {
    console.log('Fichier sélectionné :', file);
  };

  return (
    <Main>
      <h1 className="main-title">Créer un nouveau voyage</h1>
      <FormContainer>
        <h2 className="form-title">Nouveau voyage</h2>
        <InputField
          name="localisation"
          placeholder="Destination"
          type="text"
          icon="fa-solid fa-location-dot"
        />
        <div className="field">
          <label className="field-label visually-hidden" htmlFor="date_start">
            Date de début
          </label>
          <div className="field-container">
            <i className="fa-solid fa-calendar" />
            <DatePicker
              className="field-input"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Date de début (jj/mm/aaaa)"
              dateFormat="dd/MM/yyyy"
              locale="fr"
            />
          </div>
        </div>
        <div className="field">
          <label className="field-label visually-hidden" htmlFor="date_start">
            Date de fin
          </label>
          <div className="field-container">
            <i className="fa-solid fa-calendar" />
            <DatePicker
              className="field-input"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Date de fin (jj/mm/aaaa)"
              dateFormat="dd/MM/yyyy"
              locale="fr"
            />
          </div>
        </div>
        <TextareaField
          name="description"
          placeholder="Description du voyage (facultatif)"
          icon="fa-solid fa-pen-nib"
        />
        <InputFieldImage handleFile={handleFile} />
        <ButtonSubmit text="Créer le voyage" />
      </FormContainer>
    </Main>
  );
}

export default NewTrip;
