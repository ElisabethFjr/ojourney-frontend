import { useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputFieldEdit from '../../components/InputFieldEdit/InputFieldEdit';
import TextareaFieldEdit from '../../components/TextareaFieldEdit/TextareaFieldEdit';
import InputFieldImage from '../../components/InputFieldImage/InputFieldImage';
import InputDatesPicker from '../../components/InputDatesPicker/InputDatesPicker';
import Button from '../../components/Button/Button';

import './EditTrip.scss';

function EditTrip() {
  // States variables declaration
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  // Get the trip id from url
  const { id } = useParams();

  // Fetch states from Redux store
  const env = useAppSelector((state) => state.user.env);

  // Function to change Dates format
  const changeDateFormat = (date: Date) => {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const day = date.toLocaleString('default', { day: '2-digit' });
    return `${year}-${month}-${day}`;
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

  // Event handler on the EditTrip submit form
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append('date_start', changeDateFormat(startDate));
    formData.append('date_end', changeDateFormat(endDate));
    const formSent = Object.fromEntries(formData);

    // Axios options if local (token) or not (cookie)
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

    // Send the form data and update data with axios
    await axiosInstance
      .patch(`/trips/${id}`, formSent, axiosOptions)
      .then((response) => console.log('Server Response:', response.data))
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de l'édition du voyage.",
          error
        );
      });
  };

  return (
    <Main>
      <h1 className="main-title">Edition d&apos;un nouveau voyage</h1>
      <section className="edit-trip-container">
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <h2 className="edit-trip-form-title">Editer votre voyage</h2>
            {/* Localisation Input */}
            <InputFieldEdit
              name="localisation"
              placeholder="Localisation"
              label="Modifier la localisation"
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
            <TextareaFieldEdit
              name="description"
              placeholder="Description"
              label="Modifier la description"
              icon="fa-solid fa-pen-nib"
            />
            {/* Image File Selection Input */}
            <InputFieldImage handleFile={handleFile} />
            {/* Form Submit Button */}
            <Button
              text="Editer le voyage"
              type="submit"
              customClass="color button-style--width"
            />
          </form>
        </FormContainer>
      </section>
    </Main>
  );
}

export default EditTrip;
