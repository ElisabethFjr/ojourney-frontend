// Imports React Hook
import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Imports Modules
import DOMPurify from 'dompurify';
import { nanoid } from 'nanoid';

// Import Curstom Redux Hook
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resetSuggestions, updateProposition } from '../../store/reducers/trip';

// Import Utils Functions
import handleSuggestionLocalisation from '../../utils/handleLocalisation';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import FormContainer from '../../layout/FormContainer/FormContainer';
import Button from '../../components/Button/Button';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

// Import Style
import './EditProposition.scss';

function EditProposition() {
  // Inilialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get the Trip id and the Proposition id from url
  const { propositionId, tripId } = useParams();
  const idProposition = propositionId ?? ''; // Proposition id
  const idTrip = tripId ?? ''; // Trip id

  // Fetch states from Redux store
  const propositions = useAppSelector((state) => state.trip.trip.links); // Trip Propositions
  const suggestions = useAppSelector((state) => state.trip.suggestions); // Localisation Suggestions
  const isLoading = useAppSelector((state) => state.trip.isLoading); // Loading Indicatior

  // Find the proposition id to edit to get the current data
  const editedProposition = propositions.find(
    (proposition) => proposition.id === idProposition
  );

  // States variables declaration
  const [url, setUrl] = useState(editedProposition?.url || '');
  const [localisation, setLocalisation] = useState(
    editedProposition?.localisation || ''
  );
  const [description, setDescription] = useState(
    editedProposition?.description || ''
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false); // Localisation suggestion selection indicator

  // Event handler input and textarea changes
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: string) => void
  ) => {
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
        className="field-edit-input-suggestion-item"
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
        {/* Details localisation : address_line1 for the adress and address_line2 for the country) */}
        {suggestion.line1} {suggestion.line2}
      </div>
    );
  });

  // Event handler for the EditProposition form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Clear all Error Messages
    setErrorMessage(null);

    // Error : Check if missing required field
    if (!url || !localisation) {
      setErrorMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Error : Check if the user changed the "localisation" input but did not select a suggestion
    if (
      localisation !== editedProposition?.localisation &&
      !isSuggestionSelected
    ) {
      setErrorMessage(
        'Veuillez sélectionner une destination dans la liste de suggestion.'
      );
      return;
    }

    // Error : Check if edited url already exist in the trip
    const existedProposition = propositions.some(
      (proposition) => proposition.url === url
    );

    // Error : Check if current editing proposition url already exists
    const isEditingExistingProposition =
      editedProposition && editedProposition.url === url;
    if (existedProposition && !isEditingExistingProposition) {
      setErrorMessage("L'URL existe déjà dans le store.");
      return;
    }

    // Dispatch udpateProposition action on the form submission
    dispatch(
      updateProposition({
        formData,
        tripId: idTrip,
        propositionId: idProposition,
      })
    );
    navigate(`/my-trip/${idTrip}`);
  };

  return (
    <Main>
      <h1 className="main-title">Modifier une proposition</h1>
      <section className="edit-proposition-container">
        <FormContainer>
          <div className="edit-proposition-back-btn">
            {/* Back Button */}
            <ButtonIcon
              icon="fa-solid fa-arrow-left"
              handleClick={() => navigate(-1)} // Go back to the previous page
              customClass="back"
            />
          </div>
          <form onSubmit={handleSubmit}>
            {/* Form Title */}
            <h2 className="edit-proposition-form-title">Ma Proposition</h2>

            {/* Error Message */}
            {errorMessage && (
              <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
            )}

            {/* Url Input */}
            <div className="field-edit">
              <label className="field-edit-label" htmlFor="url">
                Adresse URL
              </label>
              <input
                className="field-edit-input"
                value={url}
                onChange={(event) => handleInputChange(event, setUrl)}
                name="url"
                placeholder="Modifier l'adresse URL"
                autoComplete="autocomplete"
                id="url"
                type="url"
                maxLength={100}
                required
              />
              <div className="field-edit-icon">
                <i className="fa-solid fa-link" />
              </div>
            </div>

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
                required
              />
              {/* Display localisations suggestion list if it exists and if input name = localisation */}
              {suggestions && suggestions.length > 1 ? (
                <div className="field-edit-input-suggestion-list">
                  {allSuggestions}
                </div>
              ) : null}
              <div className="field-edit-icon">
                <i className="fa-solid fa-location-dot" />
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

            {/* Form Submit Button */}
            <Button
              text="Modifier la proposition"
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

export default EditProposition;
