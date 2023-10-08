import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { addTrip } from '../../store/reducers/user';

import Main from '../../layout/Main/Main';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';
import InputFieldImage from '../../components/InputFieldImage/InputFieldImage';
import TextareaField from '../../components/TextareaField/TextareaField';
import Button from '../../components/Button/Button';
import InputDatesPicker from '../../components/InputDatesPicker/InputDatesPicker';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import './NewTrip.scss';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';

function NewTrip() {
  // Initialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Declaration state variables
  const [startDate, setStartDate] = useState<Date | undefined>(undefined); // Trip start date
  const [endDate, setEndDate] = useState<Date | undefined>(undefined); // Trip end date
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
  const handleFile = (fileUploaded: File | null) => {
    if (fileUploaded !== null) {
      setFile(fileUploaded);
      const url = URL.createObjectURL(fileUploaded);
      setImageUrl(url);
    }
  };

  // Event handler for the newTrip form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Clear all Error Messages
    setErrorMessage(null);

    // Check if missing required field
    const destination = formData.get('localisation') as string;
    if (!destination || !startDate || !endDate) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Format dates start and end
    formData.append('date_start', startDate ? changeDateFormat(startDate) : '');
    formData.append('date_end', endDate ? changeDateFormat(endDate) : '');

    // Check if dates are same and set an errorMessage
    if (changeDateFormat(startDate) === changeDateFormat(endDate)) {
      setErrorMessage(
        'Les dates de début et de fin ne peuvent pas être identiques'
      );
      return;
    }

    // Dispatch addTrip action on the form submission
    dispatch(addTrip(formData));
    navigate(`/my-trips`);
  };

  return (
    <Main>
      <h1 className="main-title">Créer un nouveau voyage</h1>
      <section className="new-trip-container">
        <FormContainer>
          <form onSubmit={handleSubmit}>
            {/* Back Button */}
            <div className="new-trip-back-btn">
              <ButtonIcon
                icon="fa-solid fa-arrow-left"
                handleClick={() => navigate(-1)} // Go back to the previous page
                customClass="back"
              />
            </div>

            {/* Form Title */}
            <h2 className="new-trip-form-title">Nouveau voyage</h2>

            {/* Error Message */}
            {errorMessage && (
              <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
            )}

            {/* Localisation Input */}
            <InputField
              name="localisation"
              placeholder="Destination"
              type="text"
              icon="fa-solid fa-location-dot"
              maxlength={100}
              required
            />

            {/* Dates Picker Inputs (Start - End) */}
            <InputDatesPicker
              startDate={startDate || null}
              endDate={endDate || null}
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
            {file && imageUrl && (
              <img
                className="new-trip-image"
                src={imageUrl}
                alt={file.name}
                crossOrigin="anonymous"
              />
            )}

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
