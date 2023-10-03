import { ChangeEvent, FormEvent, useState } from 'react';
// Import React Router
import { useParams, useNavigate } from 'react-router-dom';
// Import Package react-toastify
import { toast } from 'react-toastify';
// Import Package DOMPufiry
import DOMPurify from 'dompurify';
// Import Curstom Redux Hook
import { useAppSelector } from '../../hooks/redux';
// Import AxiosInstance
import axiosInstance from '../../utils/axios';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import FormContainer from '../../components/FormContainer/FormContainer';
import Button from '../../components/Button/Button';

import './EditProposition.scss';

function EditProposition() {
  // Inilialize Hooks
  const navigate = useNavigate();

  // States variables declaration
  const [url, setUrl] = useState('Url par défault');
  const [localisation, setLocalisation] = useState('Localisation par défault');
  const [description, setDescription] = useState('Description par défault');

  // Fetch states from Redux store
  const env = useAppSelector((state) => state.user.env);

  // Get the trip id and the proposition id from url
  const { idLink } = useParams();
  const { idTrip } = useParams();

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
