import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updatePassword } from '../../store/reducers/user';

import Main from '../../layout/Main/Main';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import './EditPassword.scss';

function EditPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state) => state.user.data);
  const toastSuccess = useAppSelector((state) => state.user.toastSuccess);

  // Declaration state variables
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to display an error message

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setValue: (value: string) => void
  ) => {
    const { value } = event.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setValue(sanitizedValue);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Extract password and confirmation from formData
    const newPassword = formData.get('password') as string;
    const confirmPassword = formData.get('confirmation') as string;

    // Check match password and confirmation, if not, display an error message// Check match password and confirmation, if not, display an error message
    if (newPassword !== confirmPassword) {
      setErrorMessage("La confirmation de mot de passe n'est pas valide.");
      return;
    }
    setErrorMessage(null);

    // Remove the 'confirmation' field from the data to be sent
    formData.delete('confirmation');

    // Dispatch the updated password to Redux store
    dispatch(updatePassword({ formData, id: userData.id }));
    if (toastSuccess) {
      navigate('/profil');
      toast.success('Les informations ont bien été mises à jour !');
    }
  };

  return (
    <Main>
      <h1 className="main-title">Modifier votre mot de passe</h1>
      <div className="edit-password-container">
        <form className="edit-password-form" onSubmit={handleSubmit}>
          {errorMessage && (
            <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
          )}
          {/* Affichage de l'erreur */}
          <div className="field-edit">
            <label className="field-edit-label" htmlFor="password">
              Mot de passe
            </label>
            <input
              className="field-edit-input"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
              name="password"
              placeholder="Modifier le mot de passe"
              id="password"
              type="password"
              required
            />
            <div className="field-edit-icon">
              <i className="fa-solid fa-lock" />
            </div>
          </div>
          <div className="field-edit">
            <label className="field-edit-label" htmlFor="Confirmation">
              Confirmation du mot de passe
            </label>
            <input
              className="field-edit-input"
              value={confirmation}
              onChange={(e) => handleInputChange(e, setConfirmation)}
              name="confirmation"
              placeholder="Modifier le mot de passe"
              id="Confirmation"
              type="password"
              required
            />
            <div className="field-edit-icon">
              <i className="fa-solid fa-lock" />
            </div>
          </div>
          <Button
            text="Modifier votre mot de passe"
            customClass="color button-style--width button-style--height"
            type="submit"
          />
        </form>
      </div>
    </Main>
  );
}

export default EditPassword;
