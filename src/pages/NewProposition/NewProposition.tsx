import { useParams, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { useAppSelector } from '../../hooks/redux';
import Main from '../../layout/Main/Main';
import axiosInstance from '../../utils/axios';
import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import TextareaField from '../../components/TextareaField/TextareaField';

import './NewProposition.scss';

function NewProposition() {
  const navigate = useNavigate();
  const { id } = useParams();
  const env = useAppSelector((state) => state.user.env);
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
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Send newTrip form data (JSON) to the server with Axios
    const objData = Object.fromEntries(formData);

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
