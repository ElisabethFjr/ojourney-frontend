import { useParams, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Send newTrip form data (JSON) to the server with Axios
    const objData = Object.fromEntries(formData);
    console.log(objData);
    await axiosInstance
      .post(`/trips/${id}/links`, objData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${
            localStorage.getItem('token')?.replace(/"|_/g, '') || ''
          }`,
        },
      })
      .then(() => {
        navigate(`/my-trip/${id}`);
      })
      .catch((error) => {
        console.error(error);
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
              name="localisation"
              placeholder="Localisation"
              type="text"
              icon="fa-solid fa-location-dot"
              maxlength={50}
            />
            <InputField
              name="url"
              placeholder="Adresse URL"
              type="url"
              icon="fa-solid fa-link"
              required
            />
            <TextareaField
              name="description"
              placeholder="Description"
              icon="fa-solid fa-pen-nib"
              required
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
