import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  checkUserPassword,
  deleteUserAccount,
} from '../../store/reducers/user';
import axiosInstance from '../../utils/axios';

import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import ModalContainer from '../ModalContainer/ModalContainer';

import './ModalConfimPassword.scss';

function ModaleConfirmPassword() {
  // Initialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Declaration state variables
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [showModalDeleteConfirm, setShowModalDeleteConfirm] =
    useState<boolean>(false);

  // Fetch states from Redux store
  const env = useAppSelector((state) => state.user.env);
  const userData = useAppSelector((state) => state.user.data);
  const checkedPassword = useAppSelector((state) => state.user.checkedPassword);

  // Event handler on the close modal button
  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  //

  // Event handler for the Confirm Password form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const passwordData = formData.get('password') as string;
    dispatch(checkUserPassword({ passwordData, id: userData.id }));
    // If checkedPassword is true (promise checkUserPassword fulfilled), delete the account by dispatch redux action
    if (checkedPassword) {
      dispatch(deleteUserAccount({ id: userData.id }));
      navigate('/', { replace: true });
      toast.success('Le compte a bien été supprimé !');
    } else {
      toast.error('Mot de passe incorrect. Veuillez réessayer.');
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
            <InputField
              name="password"
              placeholder="Mot de passe"
              type="password"
              icon="fa-solid fa-lock"
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
