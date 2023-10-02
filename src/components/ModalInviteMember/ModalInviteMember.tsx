import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';

import { showFlashMessage, resetFlashMessage } from '../../store/reducers/flashMessage';

import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import ModalContainer from '../ModalContainer/ModalContainer';

import './ModalInviteMember.scss';

interface ModalInviteMemberProps {
  id: number | null;
}

function ModalInviteMember({ id }: ModalInviteMemberProps) {
  // Initialize Hooks
  const dispatch = useDispatch();

  // Declaration state variables
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Fetch states from Redux store
  const env = useAppSelector((state) => state.user.env);
  const flashMessage = useAppSelector((state) => state.flashMessage);

  // Event handler on the invite member submit form
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    // Axios options if local (token) or not (cookie)
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

    // Send email (JSON) to the server
    await axiosInstance
      .post(`/trips/${id}/invite`, jsonData, axiosOptions)
      .then((response) => {
        console.log(jsonData);
        console.log("L'email a bien été envoyé", response.data);
        dispatch(showFlashMessage({ isSuccess: true, message: "L'email a bien été envoyé"}));
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors la récupération de l'email.",
          error
        );
      })
      .finally(() => {
        setIsOpen(!isOpen);
      });
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-icon-email fa-solid fa-envelope-circle-check" />
          <h1 className="modal-invite-member-title">
            Invitation d&apos;un membre
          </h1>
          <p className="modal-invite-member-text">
            Veuillez renseigner l&apos;adresse mail du nouveau membre.
          </p>
          <form onSubmit={handleSubmit}>
            <InputField
              name="email"
              placeholder="e-mail"
              type="email"
              icon="fa-solid fa-envelope-circle-check"
            />
            <div className="modal-invite-member-button-container">
              <Button
                text="Annuler"
                type="button"
                customClass="outline-dark"
                onClick={handleClose}
              />

              <Button
                text="Confirmer"
                type="submit"
                customClass="outline-dark"
              />
            </div>
          </form>
        </ModalContainer>
      )}
    </div>
  );
}

export default ModalInviteMember;
