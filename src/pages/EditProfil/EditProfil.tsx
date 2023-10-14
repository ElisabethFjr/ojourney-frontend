// Imports react
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Imports modules
import DOMPurify from 'dompurify';

// Imports Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUserProfil } from '../../store/reducers/user';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';

import './EditProfil.scss';

function EditProfil() {
  // Initialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get user data and environment from Redux store
  const userData = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  // Declaration States Variables
  const [lastname, setLastname] = useState(userData.lastname || '');
  const [firstname, setFirstname] = useState(userData.firstname || '');
  const [email, setEmail] = useState(userData.email || '');
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

  // Event handler for the Confirm Profil form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Clear all Error Messages
    setErrorMessage(null);

    // Check if one field is empty and set an errorMessage
    if (!firstname || !lastname || !email) {
      setErrorMessage('Veuillez renseigner tous les champs.');
      return;
    }

    // Dispatch the updated user data to Redux store
    await dispatch(updateUserProfil({ formData, id: userData.id }));
    navigate('/profil');
  };

  return (
    <Main>
      <h1 className="main-title">Modifier vos information personnelles</h1>
      <div className="edit-profil-container">
        <form className="edit-profil-form" onSubmit={handleSubmit}>
          <div className="edit-profil-back-btn">
            <ButtonIcon
              icon="fa-solid fa-arrow-left"
              handleClick={() => navigate(-1)} // Go back to the previous page
              customClass="back"
            />
          </div>

          {/* If ErroMessage, display the error */}
          {errorMessage && <ErrorMessage text={errorMessage} />}

          {/* Lastname Input */}
          <div className="field-edit">
            <label className="field-edit-label" htmlFor="lastname">
              Nom
            </label>
            <input
              className="field-edit-input"
              value={lastname}
              onChange={(event) => handleInputChange(event, setLastname)}
              name="lastname"
              placeholder="Modifier le Nom"
              autoComplete="autocomplete"
              id="lastname"
              type="text"
              maxLength={100}
            />
            <div className="field-edit-icon">
              <i className="fa-solid fa-user" />
            </div>
          </div>

          {/* Firstname Input */}
          <div className="field-edit">
            <label className="field-edit-label" htmlFor="firstname">
              Prénom
            </label>
            <input
              className="field-edit-input"
              value={firstname}
              onChange={(event) => handleInputChange(event, setFirstname)}
              name="firstname"
              placeholder="Modifier le Prénom"
              autoComplete="autocomplete"
              id="firstname"
              type="text"
              maxLength={100}
            />
            <div className="field-edit-icon">
              <i className="fa-solid fa-user" />
            </div>
          </div>

          {/* Email Input */}
          <div className="field-edit">
            <label className="field-edit-label" htmlFor="email">
              Email
            </label>
            <input
              className="field-edit-input"
              value={email}
              onChange={(event) => handleInputChange(event, setEmail)}
              name="email"
              placeholder="Modifier l'Email"
              autoComplete="autocomplete"
              id="email"
              type="text"
              maxLength={320}
            />
            <div className="field-edit-icon">
              <i className="fa-solid fa-at" />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            text="Modifier"
            customClass="color button-style--width"
            type="submit"
            isLoading={isLoading}
          />
        </form>
      </div>
    </Main>
  );
}

export default EditProfil;
