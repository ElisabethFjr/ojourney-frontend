// Imports React
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Imports modules
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';

// Imports Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUserData } from '../../store/reducers/user';

// Imports Components
import Main from '../../layout/Main/Main';
import Button from '../../components/Button/Button';

import './EditProfil.scss';

function EditProfil() {
  // Initialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get user data and environment from Redux store
  const userData = useAppSelector((state) => state.user.data);
  const toastSuccess = useAppSelector((state) => state.user.toastSuccess);

  // States variables declaration
  const [lastname, setLastname] = useState(userData.lastname || '');
  const [firstname, setFirstname] = useState(userData.firstname || '');
  const [email, setEmail] = useState(userData.email || '');

  // Event handler input and textarea changes
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setValue: (value: string) => void
  ) => {
    const { value } = event.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setValue(sanitizedValue);
  };

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    // Dispatch the updated user data to Redux store
    dispatch(updateUserData({ formData, id: userData.id }));
    if (toastSuccess) {
      navigate('/profil');
      toast.success('Les informations ont bien été mises à jour !');
    } else {
      toast.error(
        'Échec de la mise à jour des informations, veuillez réessayer plus tard.'
      );
    }
  };

  return (
    <Main>
      <h1 className="main-title">Modifier votre information</h1>
      <div className="edit-profil-container">
        <form className="edit-profil-form" onSubmit={handleSubmit}>
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
              maxLength={100}
            />
            <div className="field-edit-icon">
              <i className="fa-solid fa-at" />
            </div>
          </div>
          <Button
            text="Modifier"
            customClass="color button-style--width"
            type="submit"
          />
        </form>
      </div>
    </Main>
  );
}

export default EditProfil;
