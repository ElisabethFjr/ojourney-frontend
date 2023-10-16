// Imports React Hook
import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import Modules
import DOMPurify from 'dompurify';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import { nanoid } from 'nanoid';

// Import Utils functions
import changeDateFormat from '../../utils/formatDate';
import handleSuggestionLocalisation from '../../utils/handleLocalisation';

// Imports Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetSuggestions, updateTrip } from '../../store/reducers/trip';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import FormContainer from '../../layout/FormContainer/FormContainer';
import InputFieldImage from '../../components/InputFieldImage/InputFieldImage';
import Button from '../../components/Button/Button';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

// Import Style
import './EditTrip.scss';

function EditTrip() {
  // Set Locale to fr
  registerLocale('fr', fr);

  // Initialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get the trip id from url
  const { id } = useParams();
  const tripId = id ?? '';

  // Fetch states from Redux store
  const trip = useAppSelector((state) => state.trip.trip); // One Trip Data
  const suggestions = useAppSelector((state) => state.trip.suggestions); // Localisation Suggestion
  const isLoading = useAppSelector((state) => state.trip.isLoading); // Loading Indicator

  // States variables declaration
  const [localisation, setLocalisation] = useState<string>(
    trip.localisation || ''
  ); // Trip localisation
  const [startDate, setStartDate] = useState<Date | null>(
    trip.date_start ? new Date(trip.date_start) : null
  ); // Trip Start Date
  const [endDate, setEndDate] = useState<Date | null>(
    trip.date_end ? new Date(trip.date_end) : null
  ); // Trip End Date
  const [description, setDescription] = useState<string>(
    trip?.description || ''
  ); // Trip Description
  const [file, setFile] = useState<File | null>(null); // Selected file
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Image URL
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error Message
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false); // Localisation suggestion selection indicator

  // EVENT HANDLER input and textarea changes
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: string) => void
  ) => {
    // Reset the suggestion selection indicator
    setIsSuggestionSelected(false);
    // If specific input "localisation", set the auto suggestions from the geoapify API with a debounce
    // Check /utils/handleLocalisation to see the function
    handleSuggestionLocalisation(event, dispatch);
    // Sanitize the input value using DOMPurify to prevent security vulnerabilities
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setValue(sanitizedValue);
  };

  // EVENT HANDLER on the click on a suggested localisation
  const handleClickSuggestion = (newValue: string) => {
    setLocalisation(newValue);
    setIsSuggestionSelected(true); // Suggestion clicked
    dispatch(resetSuggestions());
  };

  // EVENT HANDLER when the input localisation element loses focus
  const handleBlur = () => {
    dispatch(resetSuggestions());
  };

  // Create a list of localisation suggestion depending on the input value
  const allSuggestions = suggestions.map((suggestion) => {
    // Generate a random key item with nanoid
    const uniqueKey = nanoid();
    return (
      <div
        role="button"
        className="field-input-suggestion-item"
        tabIndex={0}
        onKeyDown={() =>
          handleClickSuggestion(`${suggestion.line1} ${suggestion.line2}`)
        }
        key={uniqueKey}
        onClick={() =>
          handleClickSuggestion(`${suggestion.line1} ${suggestion.line2}`)
        }
        onBlur={handleBlur}
      >
        {/* Localisation suggestion composed of 'line1' and 'line2' elements from the API */}
        {/* Details localisation : address_line1 for the address and address_line2 for the country) */}
        {suggestion.line1} {suggestion.line2}
      </div>
    );
  });

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
    // File selected
    if (fileUploaded !== null) {
      // Check the file size (the image need to be under 2MB)
      if (fileUploaded.size > 2 * 1024 * 1024) {
        setErrorMessage(
          'La taille du fichier image ne peut pas dépasser 2 Mo.'
        );
        setFile(null); // Clear the file
        setImageUrl(null); // Clear the image URL
      } else {
        setFile(fileUploaded);
        const url = URL.createObjectURL(fileUploaded);
        setImageUrl(url);
        setErrorMessage(null); // Clear Error Message
      }
    } else {
      // No file selected
      setErrorMessage(null);
      setFile(null);
      setImageUrl(null);
    }
  };

  // EVENT HANDLER for the newTrip form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Clear all Error Messages
    setErrorMessage(null);

    // Check all required fields and set an errorMessage if one is missing
    if (!localisation || !startDate || !endDate) {
      setErrorMessage('Veuillez renseigner tous les champs obligatoires.');
      return;
    }

    // Check if the user changed the "localisation" input but did not select a suggestion
    if (localisation !== trip.localisation && !isSuggestionSelected) {
      setErrorMessage(
        'Veuillez sélectionner une destination dans la liste de suggestions.'
      );
      return;
    }

    // Format dates start and end is dates not null
    if (startDate && endDate) {
      formData.append('date_start', changeDateFormat(startDate));
      formData.append('date_end', changeDateFormat(endDate));
    }

    // Check if dates are same and set an errorMessage
    if (changeDateFormat(startDate) === changeDateFormat(endDate)) {
      setErrorMessage(
        'Les dates de début et de fin ne peuvent pas être identiques'
      );
      return;
    }

    // Dispatch updateTrip action on the form submission
    await dispatch(updateTrip({ formData, tripId }));
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
              ariaLabel="Retour à la page précédente"
              title="Retour"
            />
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <h2 className="edit-trip-form-title">Mon Voyage</h2>
            {/* If ErrorMessage, display the error */}
            {errorMessage && <ErrorMessage text={errorMessage} />}

            {/* Localisation Input */}
            <div className="field">
              <label className="field-label" htmlFor="localisation">
                Localisation
              </label>
              <input
                className="field-input"
                value={localisation}
                onChange={(event) => handleInputChange(event, setLocalisation)}
                name="localisation"
                placeholder="Modifier la localisation"
                id="localisation"
                type="text"
                maxLength={100}
                required
              />
              {/* Display localisations suggestion list if it exists and if input name = localisation */}
              {suggestions && suggestions.length > 1 ? (
                <div className="field-input-suggestion-list">
                  {allSuggestions}
                </div>
              ) : null}
              <div className="field-icon">
                <i className="fa-solid fa-location-dot" />
              </div>
            </div>

            {/* Start Date Input */}
            <div className="field">
              <label className="field-label" htmlFor="date_start">
                Date de début
              </label>
              <i className="field-icon fa-solid fa-calendar" />
              <DatePicker
                id="date_start"
                className="field-input"
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Date de début (jj/mm/aaaa)"
                dateFormat="dd/MM/yyyy"
                locale="fr" // Set french locale
                required
              />
            </div>

            {/* End Date Input */}
            <div className="field">
              <label className="field-label" htmlFor="date_end">
                Date de fin
              </label>
              <i className="field-icon fa-solid fa-calendar" />
              <DatePicker
                id="date_end"
                className="field-input"
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Date de fin (jj/mm/aaaa)"
                dateFormat="dd/MM/yyyy"
                locale="fr" // Set french locale
                required
              />
            </div>

            {/* Description Textarea */}
            <div className="field">
              <label className="field-label" htmlFor="description">
                Description
              </label>
              <textarea
                className="field-textarea"
                value={description}
                onChange={(event) => handleInputChange(event, setDescription)}
                name="description"
                placeholder="Modifier la description"
                id="description"
                maxLength={200}
              />
              <div className="field-textarea-icon">
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
                width="157"
                height="136"
                loading="lazy"
              />
            )}
            {/* Form Submit Button */}
            <Button
              text="Modifier le voyage"
              type="submit"
              customClass="color button-style--width"
              isLoading={isLoading}
            />
          </form>
        </FormContainer>
      </section>
    </Main>
  );
}

export default EditTrip;
