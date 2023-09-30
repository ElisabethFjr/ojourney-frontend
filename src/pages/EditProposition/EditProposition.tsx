import { useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';
import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';
import TextareaField from '../../components/TextareaField/TextareaField';
import Button from '../../components/Button/Button';

function EditProposition() {
  const { idLink } = useParams();
  const { idTrip } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const formSent = Object.fromEntries(formData);

    await axiosInstance
      .patch(`/trips/${idTrip}/links/${idLink}`, formSent, {
        withCredentials: true,
      })
      .then(() => {
        navigate(`/my-trip/${idTrip}`);
      })
      .catch((error) => {
        console.error(
          'Une erreur est survenue lors de la suppression de la proposition.',
          error
        );
      });
  };

  return (
    <Main>
      <h1 className="main-title">Modifier ma proposition</h1>
      <section className="new-proposition-container">
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <h2 className="new-proposition-form-title">Proposition</h2>
            <InputField
              name="localisation"
              placeholder="Localisation"
              type="text"
              icon="fa-solid fa-location-dot"
            />
            <InputField
              name="url"
              placeholder="Adresse URL"
              type="url"
              icon="fa-solid fa-link"
            />
            <TextareaField
              name="description"
              placeholder="Description"
              icon="fa-solid fa-pen-nib"
              required
            />
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
