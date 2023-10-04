// Imports React
import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import Modules
import DOMPurify from 'dompurify';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

// Imports Redux
import { useAppSelector } from '../../hooks/redux';

// Import AxiosInstance
import axiosInstance from '../../utils/axios';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import FormContainer from '../../components/FormContainer/FormContainer';
import InputFieldImage from '../../components/InputFieldImage/InputFieldImage';
import Button from '../../components/Button/Button';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';

import './EditTrip.scss';

function EditTrip() {
  // Set Locale to fr
  registerLocale('fr', fr);

  // Initialize Hooks
  const navigate = useNavigate();

  // States variables declaration
  const [localisation, setLocalisation] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [description, setDescription] = useState('');

  // Fetch states from Redux store
  const env = useAppSelector((state) => state.user.env);

  // Get the trip id from url
  const { id } = useParams();

  // Event handler input and textarea changes
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: string) => void
  ) => {
    const { value } = event.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setValue(sanitizedValue);
  };

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
        toast.success('Le voyage a bien été modifié !');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Une erreur est survenue, veuillez réessayer plus tard.');
      });
  };

  return (
    <Main>
      <h1 className="main-title">Modifier un voyage</h1>
      <section className="edit-trip-container">
        <FormContainer>
          <div className="edit-trip-back-btn">
            <ButtonIcon
              icon="fa-solid fa-arrow-left"
              handleClick={() => navigate(-1)}
              customClass="border"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <h2 className="edit-trip-form-title">Mon Voyage</h2>

            {/* Localisation Input */}
            <div className="field-edit">
              <label className="field-edit-label" htmlFor="localisation">
                Localisation
              </label>
              <input
                className="field-edit-input"
                value={localisation}
                onChange={(event) => handleInputChange(event, setLocalisation)}
                name="localisation"
                placeholder="Modifier la localisation"
                autoComplete="autocomplete"
                id="localisation"
                type="text"
                maxLength={100}
              />
              <div className="field-edit-icon">
                <i className="fa-solid fa-location-dot" />
              </div>
            </div>

            {/* Start Date Input */}
            <div className="field-date-edit">
              <label className="field-date-edit-label" htmlFor="date_start">
                Date de début
              </label>
              <div className="field-date-container">
                <i className="field-date-edit-icon fa-solid fa-calendar" />
                <DatePicker
                  className="field-date-input"
                  selected={startDate}
                  onChange={handleStartDateChange}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Date de début (jj/mm/aaaa)"
                  dateFormat="dd/MM/yyyy"
                  locale="fr" // Set french locale
                />
              </div>
            </div>

            {/* End Date Input */}
            <div className="field-date-edit">
              <label className="field-date-edit-label" htmlFor="date_start">
                Date de fin
              </label>
              <div className="field-date-container">
                <i className="field-date-edit-icon fa-solid fa-calendar" />
                <DatePicker
                  className="field-date-input"
                  selected={endDate}
                  onChange={handleEndDateChange}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholderText="Date de fin (jj/mm/aaaa)"
                  dateFormat="dd/MM/yyyy"
                  locale="fr" // Set french locale
                />
              </div>
            </div>

            {/* Description Textarea */}
            <div className="field-edit">
              <label className="field-edit-label" htmlFor="description">
                Description
              </label>
              <textarea
                className="field-edit-textarea"
                value={description}
                onChange={(event) => handleInputChange(event, setDescription)}
                name="description"
                placeholder="Modifier la description"
                autoComplete="autocomplete"
                id="description"
                maxLength={200}
              />
              <div className="field-edit-textarea-icon">
                <i className="fa-solid fa-pen-nib" />
              </div>
            </div>

            {/* Image File Selection Input */}
            <InputFieldImage
              handleFile={handleFile}
              text={"Modifier l'image"}
            />

            {/* Form Submit Button */}
            <Button
              text="Modifier le voyage"
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
