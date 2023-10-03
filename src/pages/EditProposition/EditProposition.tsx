import { FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/redux';
import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputFieldEdit from '../../components/InputFieldEdit/InputFieldEdit';
import TextareaFieldEdit from '../../components/TextareaFieldEdit/TextareaFieldEdit';
import Button from '../../components/Button/Button';

function EditProposition() {
  // Inilialize Hooks
  const navigate = useNavigate();

  // Fetch states from Redux store
  const env = useAppSelector((state) => state.user.env);

  // Get the trip id and the proposition id from url
  const { idLink } = useParams();
  const { idTrip } = useParams();

  // Event handler for the EditProposition form submission
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

    // Send a PATCH request to update the proposition data
    await axiosInstance
      .patch(`/trips/${idTrip}/links/${idLink}`, objData, axiosOptions)
      .then(() => {
        navigate(`/my-trip/${idTrip}`); // Navigate to the trip
        toast.success('La proposition a bien été modifiée !', {
          // Display a toast message success
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error('Une erreur est survenue, veuillez réessayer plus tard.', {
          // Display a toast message error
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  return (
    <Main>
      <h1 className="main-title">Modifier une proposition</h1>
      <section className="new-proposition-container">
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <h2 className="new-proposition-form-title">Ma Proposition</h2>
            <InputFieldEdit
              name="url"
              label="Adresse URL"
              placeholder="Changer l'adresse URL"
              type="url"
              icon="fa-solid fa-link"
            />
            <InputFieldEdit
              name="localisation"
              label="Localisation"
              placeholder="Changer la localisation"
              type="text"
              icon="fa-solid fa-location-dot"
            />
            <TextareaFieldEdit
              name="description"
              label="Descritpion"
              placeholder="Changer la description"
              icon="fa-solid fa-pen-nib"
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
