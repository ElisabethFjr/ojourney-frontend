import { useState, FormEvent } from 'react';
import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';
import InputFieldImage from '../../components/InputFieldImage/InputFieldImage';
import TextareaField from '../../components/TextareaField/TextareaField';
import ButtonSubmit from '../../components/Button/ButtonSubmit/ButtonSubmit';
import InputDatesPicker from '../../components/InputDatesPicker/InputDatesPicker';

import 'react-datepicker/dist/react-datepicker.css';

import './EditTrip.scss'

function EditTrip () {
    // States variables declaration
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
  
    // Function to change Dates format
    const changeDateFormat = (date: Date) => {
      const year = date.toLocaleString('default', { year: 'numeric' });
      const month = date.toLocaleString('default', { month: '2-digit' });
      const day = date.toLocaleString('default', { day: '2-digit' });
      return `${year}-${month}-${day}`;
    };
  
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
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
  
      formData.append('date_start', changeDateFormat(startDate));
      formData.append('date_end', changeDateFormat(endDate));
      const formSent = Object.fromEntries(formData);
      console.log('----- Contenu de FormData -----');
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
  
      try {
        // L'URL doit être adaptée à votre API
        await axiosInstance
          .post('/trips', formSent, {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
          })
          .then((response) => console.log('Server Response:', response.data));
      } catch (error) {
        console.error("Erreur lors de l'édition du voyage:", error);
        // Gérer l'erreur (affichez un message d'erreur à l'utilisateur, par exemple)
      }
    };
  
    return (
      <Main>
        <h1 className="main-title">Edition d'un nouveau voyage</h1>
        <section className="edit-trip-container">
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <h2 className="edit-trip-form-title">Editer votre voyage</h2>
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
              <ButtonSubmit text="Editer le voyage" />
            </form>
          </FormContainer>
        </section>
      </Main>
    );
  }

export default EditTrip;