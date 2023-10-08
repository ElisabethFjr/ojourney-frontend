import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  checkUserPassword,
  deleteUserAccount,
} from '../../store/reducers/user';

import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import ModalContainer from '../ModalContainer/ModalContainer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

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

  // Event handler on the close modal button
  const handleClose = () => {
    setIsOpen(!isOpen);
    closeModal(true);
  };

  // Event handler for the Confirm Password form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Clear all Error Messages
    setErrorMessage(null);

    // Dispatch the action to check the password and set the response on a variable
    try {
      const response = await dispatch(
        checkUserPassword({ formData, id: userData.id })
      );
      // If the password is correct (response success), dispatch the action to delete the account
      if (response.payload.success === 'Correct password !') {
        await dispatch(deleteUserAccount({ id: userData.id }));
        navigate('/', { replace: true });
      }
    } catch {
      // If the password not correct, set an error Message
      setErrorMessage('Le mot de passe est incorrect.');
    }
  };

  return (
    <div>
      {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-delete-account-icon fa-solid fa-triangle-exclamation" />
          <h1 className="modal-delete-account-title">
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
            {/* If ErroMessage, display the error */}
            {errorMessage && (
              <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
            )}
            {/* Password Input */}
            <InputField
              name="password"
              placeholder="Mot de passe"
              type="password"
              icon="fa-solid fa-lock"
              required
              maxlength={128}
            />
            {/* Buttons */}
            <div className="modal-delete-account-button-container">
              <Button
                text="Annuler"
                type="button"
                customClass="outline-dark"
                onClick={handleClose}
              />
              <Button text="Supprimer" type="submit" customClass="danger" />
            </div>
          </form>
        </ModalContainer>
      )}
    </div>
  );
}

export default ModaleConfirmPassword;
