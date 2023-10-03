import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAppSelector } from '../../hooks/redux';
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
  // Initialize Hooks
  const navigate = useNavigate();

  // Declaration state variables
  const [startDate, setStartDate] = useState<Date>(new Date()); // Trip start date
  const [endDate, setEndDate] = useState<Date>(new Date()); // Trip end date

  // Fetch states from Redux store
  const env = useAppSelector((state) => state.user.env);

  // Function to format dates before sending them to the server
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

  // Event handler for selecting an image file
  const handleFile = (file: File) => {
    console.log('Fichier sélectionné :', file);
  };

  // Event handler for the newTrip form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Format dates start and end
    formData.append('date_start', changeDateFormat(startDate));
    formData.append('date_end', changeDateFormat(endDate));

    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);

    // Axios options: If in development mode (using token) or production mode (using cookies)
    let axiosOptions = {};
    if (env === 'dev') {
      axiosOptions = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${
            localStorage.getItem('token')?.replace(/"|_/g, '') || ''
          }`,
        },
      };
    } else {
      axiosOptions = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      };
    }

    // Send a POST request to create a new trip
    await axiosInstance
      .post('/trips', objData, axiosOptions)
      .then(() => {
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
            <InputFieldImage handleFile={handleFile} text="Ajouter une image" />
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
