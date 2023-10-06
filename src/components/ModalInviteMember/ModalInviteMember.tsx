import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';

import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import ModalContainer from '../ModalContainer/ModalContainer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import 'react-toastify/dist/ReactToastify.css';
import './ModalInviteMember.scss';

interface ModalInviteMemberProps {
  id: number | null;
}

function ModalInviteMember({ id }: ModalInviteMemberProps) {
  // Declaration state variables
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Event handler on the invite member submit form
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    // Check if input is empty before submit
    if (!jsonData.email) {
      setErrorMessage('Veuillez renseigner une adresse e-mail.');
      return;
    }

    // Send a POST request to invite a member with his email
    await axiosInstance
      .post(`/trips/${id}/invite`, jsonData)
      .then(() => {
        setIsOpen(!isOpen);
        toast.success("L'invitation a bien été envoyée !");
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors la récupération de l'email.",
          error
        );
        toast.error(
          "L'invitation n'a pas pu être envoyée." || error.response.data.message
        );
      });
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-invite-member-icon fa-solid fa-envelope-circle-check" />
          <h1 className="modal-invite-member-title">Inviter un membre</h1>
          <p className="modal-invite-member-text">
            Veuillez renseigner l&apos;adresse email du membre à inviter.
          </p>
          <form className="modal-invite-member-input" onSubmit={handleSubmit}>
            {/* Error Message */}
            {errorMessage && (
              <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
            )}
            <InputField
              name="email"
              placeholder="E-mail"
              type="email"
              icon="fa-solid fa-envelope-circle-check"
              maxlength={320}
              required
            />
            <div className="modal-invite-member-button-container">
              <Button
                text="Annuler"
                type="button"
                customClass="outline-dark"
                onClick={handleClose}
              />
              <Button text="Confirmer" type="submit" customClass="color" />
            </div>
          </form>
        </ModalContainer>
      )}
    </div>
  );
}

export default ModalInviteMember;
