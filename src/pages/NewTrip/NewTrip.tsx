import { useState } from 'react';

import { format } from 'date-fns';

import Main from '../../layout/Main/Main';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';
import InputFieldImage from '../../components/InputFieldImage/InputFieldImage';
import TextareaField from '../../components/TextareaField/TextareaField';
import ButtonSubmit from '../../components/Button/ButtonSubmit/ButtonSubmit';

import 'react-datepicker/dist/react-datepicker.css';
import './NewTrip.scss';
import InputDatesPicker from '../../components/InputDatesPicker/InputDatesPicker';

function NewTrip() {
  // States variables declaration
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Event handler for start date change
  const handleStartDateChange = (date: Date) => {
    console.log(date);
    setStartDate(date);
  };

  // Event handler for end date change
  const handleEndDateChange = (date: Date) => {
    console.log(date);
    setEndDate(date);
  };

  // Event handler for the image file selection
  const handleFile = (file: File) => {
    console.log('Fichier sélectionné :', file);
  };

  return (
    <Main>
      <h1 className="main-title">Créer un nouveau voyage</h1>
      <section className="new-trip-container">
        <FormContainer>
          <h2 className="form-title">Nouveau voyage</h2>
          {/* Localisation Input */}
          <InputField
            name="localisation"
            placeholder="Destination"
            type="text"
            icon="fa-solid fa-location-dot"
          />
          {/* Dates Picker Inputs (Start - End) */}
          <InputDatesPicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />
          {/* Description Textarea */}
          <TextareaField
            name="description"
            placeholder="Description du voyage (facultatif)"
            icon="fa-solid fa-pen-nib"
          />
          {/* Image File Selection Input */}
          <InputFieldImage handleFile={handleFile} />
          {/* Form Submit Button */}
          <ButtonSubmit text="Créer le voyage" />
        </FormContainer>
      </section>
    </Main>
  );
}

export default NewTrip;
