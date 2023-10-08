// Imports React
import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Imports Modules
import DOMPurify from 'dompurify';

// Import Curstom Redux Hook
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateProposition } from '../../store/reducers/trip';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import FormContainer from '../../components/FormContainer/FormContainer';
import Button from '../../components/Button/Button';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import './EditProposition.scss';

function EditProposition() {
  // Inilialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get the Trip id and the Proposition id from url and transform them to number
  const { propositionId, tripId } = useParams();
  const idProposition = Number(propositionId); // Proposition id
  const idTrip = Number(tripId); // Trip id

  // Fetch states from Redux store
  const propositions = useAppSelector((state) => state.trip.trip.links);

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

  // Event handler input and textarea changes
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: string) => void
  ) => {
    const { value } = event.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setValue(sanitizedValue);
  };

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

    // Error : Check if edited url already exist in the trip
    const existedProposition = propositions.some(
      (proposition) => proposition.url === url
    );
    // Existing and current editing proposition url
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
    navigate(`/my-trip/${propositionId}`);
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
            />
          </form>
        </FormContainer>
      </section>
    </Main>
  );
}

export default EditProposition;
