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

function ModaleConfirmPassword() {
  // Initialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Declaration state variables
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch states from Redux store
  const userData = useAppSelector((state) => state.user.data);
  const checkedPassword = useAppSelector((state) => state.user.checkedPassword);

  // Event handler on the close modal button
  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  // Event handler for the Confirm Password form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    dispatch(checkUserPassword({ formData, id: userData.id }));
    // If checkedPassword is true (promise checkUserPassword fulfilled), delete the account by dispatch redux action
    if (checkedPassword) {
      dispatch(deleteUserAccount({ id: userData.id }));
      navigate('/', { replace: true });
    } else {
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
            <InputField
              name="password"
              placeholder="Mot de passe"
              type="password"
              icon="fa-solid fa-lock"
              required
            />
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
