import { useParams, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';

import Main from '../../layout/Main/Main';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import TextareaField from '../../components/TextareaField/TextareaField';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';

import './NewProposition.scss';
import { addProposition } from '../../store/reducers/trip';

function NewProposition() {
  // Initialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get the trip id from url
  const { id } = useParams();
  const propositionId = Number(id);

  // Declaration state variables
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Event handler for the newProposition form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Dispatch addproposition action on the form submission
    dispatch(addProposition({ formData, id: propositionId }));
    navigate(`/my-trip/${propositionId}`);
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
              />
            </div>

            {/* Form Title */}
            <h2 className="new-proposition-form-title">Proposition</h2>

            {/* Error Message */}
            {errorMessage && (
              <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
            )}

            {/* URL Input */}
            <InputField
              name="url"
              placeholder="Adresse URL"
              type="url"
              icon="fa-solid fa-link"
              required
            />

            {/* Localisation Input */}
            <InputField
              name="localisation"
              placeholder="Localisation"
              type="text"
              icon="fa-solid fa-location-dot"
              maxlength={100}
            />

            {/* Description Textarea */}
            <TextareaField
              name="description"
              placeholder="Description"
              icon="fa-solid fa-pen-nib"
              maxlength={200}
            />

            {/* Submit Button */}
            <Button
              text="Valider la proposition"
              customClass="color button-style--width"
              type="submit"
            />
          </form>
        </FormContainer>
      </section>
    </Main>
  );
}

export default NewProposition;
