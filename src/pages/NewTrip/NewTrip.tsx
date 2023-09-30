import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';
import InputFieldImage from '../../components/InputFieldImage/InputFieldImage';
import TextareaField from '../../components/TextareaField/TextareaField';
import Button from '../../components/Button/Button';
import InputDatesPicker from '../../components/InputDatesPicker/InputDatesPicker';

import './NewTrip.scss';

function NewTrip() {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState<Date>(new Date()); // Trip start date
  const [endDate, setEndDate] = useState<Date>(new Date()); // Trip end date

  // Function to change Dates format to YYYY-MM-DD
  // const changeDateFormat = (date: Date) => {
  //   const year = date.toLocaleString('default', { year: 'numeric' });
  //   const month = date.toLocaleString('default', { month: '2-digit' });
  //   const day = date.toLocaleString('default', { day: '2-digit' });
  //   return `${year}-${month}-${day}`;
  // };

  const changeDateFormat = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
  };

  // Event handler for start date change
  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  // Event handler for end date change
  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  // Event handler for the image file selection
  const handleFile = (file: File) => {
    console.log('Fichier sélectionné :', file);
  };

  // Event handler for the newTrip form submit
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Change dates format
    formData.append('date_start', changeDateFormat(startDate));
    formData.append('date_end', changeDateFormat(endDate));

    // Send newTrip form data (JSON) to the server with Axios
    const objData = Object.fromEntries(formData);

    await axiosInstance
      .post('/trips', objData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${
            localStorage.getItem('token')?.replace(/"|_/g, '') || ''
          }`,
        },
      })
      .then((response) => {
        // created = true;
        console.log(response.data);

        navigate(`/my-trips`);
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la création d'un voyage.",
          error
        );
      });
  };

  return (
    <Main>
      <h1 className="main-title">Créer un nouveau voyage</h1>
      <section className="new-trip-container">
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <h2 className="new-trip-form-title">Nouveau voyage</h2>
            {/* Localisation Input */}
            <InputField
              name="localisation"
              placeholder="Destination"
              type="text"
              icon="fa-solid fa-location-dot"
              maxlength={50}
              required
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
              maxlength={200}
            />
            {/* Image File Selection Input */}
            <InputFieldImage handleFile={handleFile} />
            {/* Submit Button */}
            <Button
              text="Créer le voyage"
              type="submit"
              customClass="color button-style--width"
            />
          </form>
        </FormContainer>
      </section>
    </Main>
  );
}

export default NewTrip;
