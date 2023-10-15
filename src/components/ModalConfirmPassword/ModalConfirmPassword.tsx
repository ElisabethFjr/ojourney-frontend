// Import React Hooks & FormEvent
import { useState, FormEvent } from 'react';
// Import React-Router-Dom
import { useNavigate } from 'react-router-dom';
// Import Redux Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
// Import Redux Actions
import {
  checkUserPassword,
  deleteUserAccount,
} from '../../store/reducers/user';
// Import Components
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import ModalContainer from '../../layout/ModalContainer/ModalContainer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
// Import Styles
import './ModalConfimPassword.scss';

interface ModaleConfirmPasswordProps {
  closeModal: (value: React.SetStateAction<boolean>) => void;
}

function ModaleConfirmPassword({ closeModal }: ModaleConfirmPasswordProps) {
  // Initialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Declaration state variables
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch states from Redux store
  const userData = useAppSelector((state) => state.user.data);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  // Close Modal
  const handleClose = () => {
    setIsOpen(!isOpen);
    closeModal(true);
  };

  // Event handler for the Confirm Password form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Get the current from
    const form = event.currentTarget;
    // Create a FormData Object
    const formData = new FormData(form);

    // Clear all Error Messages
    setErrorMessage(null);

    // Dispatch the action
    try {
      const response = await dispatch(
        checkUserPassword({ formData, id: userData.id })
      );
      // If the password is correct, dispatch the action to delete the account
      if (response.payload.success === 'Correct password !') {
        await dispatch(deleteUserAccount({ id: userData.id }));
        navigate('/', { replace: true });
      }
    } catch {
      // Error Message
      setErrorMessage('Le mot de passe est incorrect.');
    }
  };

  return (
    <div>
      {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-delete-account-icon fa-solid fa-triangle-exclamation" />
          <h1 className="modal-delete-account-title modal-title">
            Supprimer votre compte ?
          </h1>
          <p className="modal-delete-account-text">
            Attention, vous êtes sur le point de supprimer définitivement votre
            compte. Vos données personnelles seront perdues.
          </p>
          <p className="modal-delete-account-text">
            Pour confirmer la suppression, veuillez valider votre identité en
            saisissant votre mot de passe.
          </p>
          <form className="modal-delete-account-form" onSubmit={handleSubmit}>
            {errorMessage && <ErrorMessage text={errorMessage} />}
            <InputField
              name="password"
              label="Mot de passe"
              placeholder="Mot de passe"
              type="password"
              icon="fa-solid fa-lock"
              required
              maxlength={128}
            />
            <div className="modal-delete-account-button-container">
              <Button
                text="Annuler"
                type="button"
                customClass="outline-dark"
                onClick={handleClose}
              />
              <Button
                text="Supprimer"
                type="submit"
                customClass="danger"
                isLoading={isLoading}
              />
            </div>
          </form>
        </ModalContainer>
      )}
    </div>
  );
}

export default ModaleConfirmPassword;
