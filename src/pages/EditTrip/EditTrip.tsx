import { useState, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { useAppSelector } from '../../hooks/redux';
import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputFieldEdit from '../../components/InputFieldEdit/InputFieldEdit';
import TextareaFieldEdit from '../../components/TextareaFieldEdit/TextareaFieldEdit';
import InputDatesPickerEdit from '../../components/InputDatesPickerEdit/InputDatesPickerEdit';
import InputFieldImage from '../../components/InputFieldImage/InputFieldImage';
import Button from '../../components/Button/Button';

import './EditTrip.scss';

function EditTrip() {
  // Initialize Hooks
  const navigate = useNavigate();

  // States variables declaration
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  // Fetch states from Redux store
  const env = useAppSelector((state) => state.user.env);

  // Get the trip id from url
  const { id } = useParams();

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

  // Event handler for the selected file image
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

    // Send a PATCH request to update the trip data
    await axiosInstance
      .patch(`/trips/${id}`, objData, axiosOptions)
      .then(() => {
        navigate(`/my-trip/${id}`); // Navigate to the trip
        toast.success('Le voyage a bien été modifié !', {
          // Display a toast message success
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error('Une erreur est survenue, veuillez réessayer plus tard.', {
          // Display a toast message error
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  return (
    <Main>
      <h1 className="main-title">Modifier un voyage</h1>
      <section className="edit-trip-container">
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <h2 className="edit-trip-form-title">Mon Voyage</h2>
            {/* Localisation Input */}
            <InputFieldEdit
              name="localisation"
              placeholder="Modifier la localisation"
              label="Localisation"
              type="text"
              icon="fa-solid fa-location-dot"
            />
            {/* Dates Picker Inputs (Start - End) */}
            <InputDatesPickerEdit
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
            />
            {/* Description Textarea */}
            <TextareaFieldEdit
              name="description"
              placeholder="Modifier la description"
              label="Description"
              icon="fa-solid fa-pen-nib"
            />
            {/* Image File Selection Input */}
            <InputFieldImage
              handleFile={handleFile}
              text={"Modifier l'image"}
            />
            {/* Form Submit Button */}
            <Button
              text="Modifire le voyage"
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
