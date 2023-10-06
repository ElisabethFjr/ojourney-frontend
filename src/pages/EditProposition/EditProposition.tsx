// Imports React
import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Imports Modules
import DOMPurify from 'dompurify';

// Import Curstom Redux Hook
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import FormContainer from '../../components/FormContainer/FormContainer';
import Button from '../../components/Button/Button';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';

import './EditProposition.scss';
import { updateProposition } from '../../store/reducers/trip';

function EditProposition() {
  // Inilialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get the Trip id and the Proposition id from url and transform them to number
  const { linkId, tripId } = useParams();
  const idLink = Number(linkId); // Proposition id
  const idTrip = Number(tripId); // Trip id

  // Fetch states from Redux store
  const proposition = useAppSelector((state) =>
    state.trip.trip.links.find((prop) => prop.id === idLink)
  );

  // States variables declaration
  const [url, setUrl] = useState(proposition?.url || '');
  const [localisation, setLocalisation] = useState(
    proposition?.localisation || ''
  );
  const [description, setDescription] = useState(
    proposition?.description || ''
  );

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

    // Dispatch udpateProposition action on the form submission
    dispatch(updateProposition({ formData, tripId: idTrip, linkId: idLink }));
    navigate(`/my-trip/${linkId}`);
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
            <h2 className="edit-proposition-form-title">Ma Proposition</h2>

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
