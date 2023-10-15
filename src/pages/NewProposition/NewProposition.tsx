// Import React Hook
import { useParams, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';

// Import Custom Redux Hook
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Import Redux Actions
import { addProposition } from '../../store/reducers/trip';

// Imports Layouts & Components
import Main from '../../layout/Main/Main';
import FormContainer from '../../layout/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import TextareaField from '../../components/TextareaField/TextareaField';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';

// Import Style
import './NewProposition.scss';

function NewProposition() {
  // Initialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get the trip id from url
  const { id } = useParams() ?? '';
  const tripId = id ?? '';

  // Declaration state variables
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error Message
  const [isSuggestionSelected, setSuggestionSelected] = useState(false); // Suggestion selection indicator

  // Fetch states from Redux store
  const propositions = useAppSelector((state) => state.trip.trip.links);
  const isLoading = useAppSelector((state) => state.trip.isLoading);

  // Event handler for selected suggestion localisation
  const handleSuggestionSelected = (selected: boolean) => {
    setSuggestionSelected(selected);
  };

  // Event handler for the newProposition form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Clear all Error Messages
    setErrorMessage(null);

    // Error : Check if missing required field
    const url = formData.get('url') as string;
    const localisation = formData.get('localisation') as string;
    if (!url || !localisation) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Error : Check if user doesn't selected a localisation suggestion from the API
    if (!isSuggestionSelected) {
      setErrorMessage(
        'Veuillez sélectionner une destination dans la lise de suggestion.'
      );
      return;
    }

    // Error : Check if url already exist in the trip
    const existedProposition = propositions.some(
      (proposition) => proposition.url === url
    );
    if (existedProposition) {
      setErrorMessage('Ce lien est déjà présent dans le voyage.');
      return;
    }

    // Dispatch addproposition action on the form submission
    await dispatch(addProposition({ formData, tripId }));
    navigate(`/my-trip/${id}`);
  };

  return (
    <Main>
      <h1 className="main-title">Faire une proposition</h1>
      <section className="new-proposition-container">
        <FormContainer>
          <form onSubmit={handleSubmit}>
            {/* Back Button */}
            <div className="new-proposition-back-btn">
              <ButtonIcon
                icon="fa-solid fa-arrow-left"
                handleClick={() => navigate(-1)} // Go back to the previous page
                customClass="back"
                aria-label="Retour à la page précédente"
              />
            </div>

            {/* Form Title */}
            <h2 className="new-proposition-form-title">Proposition</h2>

            {/* Error Message */}
            {errorMessage && <ErrorMessage text={errorMessage} />}

            {/* URL Input */}
            <InputField
              name="url"
              label="Adresse URL*"
              placeholder="Collez l'adresse URL ici"
              type="url"
              icon="fa-solid fa-link"
              required
            />

            {/* Localisation Input */}
            <InputField
              name="localisation"
              label="Localisation*"
              placeholder="Localisation"
              type="text"
              icon="fa-solid fa-location-dot"
              maxlength={100}
              required
              handleSuggestionSelected={handleSuggestionSelected}
            />

            {/* Description Textarea */}
            <TextareaField
              name="description"
              label="Description"
              placeholder="Description (facultatif)"
              icon="fa-solid fa-pen-nib"
              maxlength={200}
            />

            {/* Submit Button */}
            <Button
              text="Valider la proposition"
              customClass="color button-style--width"
              type="submit"
              isLoading={isLoading}
            />
          </form>
        </FormContainer>
      </section>
    </Main>
  );
}

export default NewProposition;
