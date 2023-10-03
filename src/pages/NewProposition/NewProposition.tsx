import { useParams, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { useAppSelector } from '../../hooks/redux';
import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import TextareaField from '../../components/TextareaField/TextareaField';

import './NewProposition.scss';

function NewProposition() {
  // Initialize Hooks
  const navigate = useNavigate();

  // Get the trip id from url
  const { id } = useParams();

  // Fetch states from Redux store
  const env = useAppSelector((state) => state.user.env);

  // Event handler for the newProposition form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Convert formData to an JSON object
    const objData = Object.fromEntries(formData);

    // Axios options: If in development mode (using token) or production mode (using cookies)
    let axiosOptions = {};
    if (env === 'dev') {
      axiosOptions = {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem('token')?.replace(/"|_/g, '') || ''
          }`,
        },
      };
    } else {
      axiosOptions = {
        withCredentials: true,
      };
    }

    // Send a POST request to create a new proposition
    await axiosInstance
      .post(`/trips/${id}/links`, objData, axiosOptions)
      .then(() => {
        navigate(`/my-trip/${id}`);
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de la création d'une proposition.",
          error
        );
      });
  };

  return (
    <Main>
      <h1 className="main-title">Faire une proposition</h1>
      <section className="new-proposition-container">
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <h2 className="new-proposition-form-title">Proposition</h2>
            <InputField
              name="url"
              placeholder="Adresse URL"
              type="url"
              icon="fa-solid fa-link"
              required
            />
            <InputField
              name="localisation"
              placeholder="Localisation"
              type="text"
              icon="fa-solid fa-location-dot"
              maxlength={50}
            />
            <TextareaField
              name="description"
              placeholder="Description"
              icon="fa-solid fa-pen-nib"
              maxlength={200}
            />
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
