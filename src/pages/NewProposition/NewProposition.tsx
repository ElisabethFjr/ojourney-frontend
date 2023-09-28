import { useParams, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import Main from '../../layout/Main/Main';
import axiosInstance from '../../utils/axios';
import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

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
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
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
              name="description"
              placeholder="Nom de la proposition"
              type="text"
              icon="fa-solid fa-pen-nib"
            />
            <InputField
              name="localisation"
              placeholder="Localisation"
              type="text"
              icon="fa-solid fa-location-dot"
            />
            <InputField
              name="url"
              placeholder="URL de la proposition"
              type="url"
              icon="fa-solid fa-link"
            />
            <Button
              text="Valider la proposition"
              customClass="color button--width"
              type="submit"
            />
          </form>
        </FormContainer>
      </section>
    </Main>
  );
}

export default NewProposition;
