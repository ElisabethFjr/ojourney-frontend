// Imports React
import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import Modules
import DOMPurify from 'dompurify';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { format } from 'date-fns';

// Imports Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateTrip } from '../../store/reducers/trip';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import FormContainer from '../../components/FormContainer/FormContainer';
import InputFieldImage from '../../components/InputFieldImage/InputFieldImage';
import Button from '../../components/Button/Button';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import './EditTrip.scss';

function EditTrip() {
  // Set Locale to fr
  registerLocale('fr', fr);

  // Initialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get the trip id from url
  const { id } = useParams();
  const tripId = Number(id);

  // Fetch states from Redux store
  const trip = useAppSelector((state) => state.trip.trip); // One Trip Data

  // States variables declaration
  const [localisation, setLocalisation] = useState<string>(
    trip.localisation || ''
  );
  const [startDate, setStartDate] = useState<Date | null>(
    trip.date_start ? new Date(trip.date_start) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    trip.date_end ? new Date(trip.date_end) : null
  );
  const [description, setDescription] = useState<string>(
    trip?.description || ''
  );
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Function to format dates into string
  const changeDateFormat = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
  };

  // EVENT HANDLER input and textarea changes
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: string) => void
  ) => {
    const { value } = event.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setValue(sanitizedValue);
  };

  // EVENT HANDLER for start date change
  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  // EVENT HANDLER for end date change
  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  // EVENT HANDLER for selecting an image file
  const handleFile = (fileUploaded: File | null) => {
    if (fileUploaded !== null) {
      setFile(fileUploaded);
      const url = URL.createObjectURL(fileUploaded);
      setImageUrl(url);
    }
  };
  // EVENT HANDLER for the newTrip form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Check all required fields and set an errorMessage if one is missing
    if (!localisation || !startDate || !endDate) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Format dates start and end is dates not null
    if (startDate && endDate) {
      formData.append('date_start', changeDateFormat(startDate));
      formData.append('date_end', changeDateFormat(endDate));
    }

    // Dispatch udpateTrip action on the form submission
    dispatch(updateTrip({ formData, id: tripId }));
    navigate(`/my-trip/${tripId}`);
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
              customClass="back"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <h2 className="edit-trip-form-title">Mon Voyage</h2>
            {/* If ErroMessage, display the error */}
            {errorMessage && (
              <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
            )}

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
                  id="date_start"
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
              <label className="field-date-edit-label" htmlFor="date_end">
                Date de fin
              </label>
              <div className="field-date-container">
                <i className="field-date-edit-icon fa-solid fa-calendar" />
                <DatePicker
                  id="date_end"
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
            {file && imageUrl && (
              <img
                className="new-trip-image"
                src={imageUrl}
                alt={file.name}
                crossOrigin="anonymous"
              />
            )}
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
