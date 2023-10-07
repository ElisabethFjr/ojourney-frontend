import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';

import ModalContainer from '../ModalContainer/ModalContainer';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import './ModalConfirmEmail.scss';

function ModalConfirmEmail() {
  const [isOpen, setIsOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  // Event handler on the invite member submit form
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    // Check if input is empty before submit
    if (!jsonData.email || !jsonData.password) {
      setErrorMessage('Veuillez renseigner tous les champs.');
      return;
    }

    // Send a POST request to send a validation email if last one expired
    await axiosInstance
      .post('/confirm', jsonData)
      .then(() => {
        setIsOpen(!isOpen);
        toast.success('Le mail a bien été envoyé !');
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors la récupération de l'email.",
          error
        );
        toast.error('Une erreur est survenue, veuillez réessayer plus tard.');
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <div className="modal-confirm-email-container">
      {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-confirm-email-icon fa-solid fa-envelope-circle-check" />
          <h1 className="modal-confirm-email-title">
            Veuillez renseigner votre adresse email et votre mot de passe.
          </h1>
          {/* If ErroMessage, display the error */}
          <form className="modal-confirm-email-form" onSubmit={handleSubmit}>
            {errorMessage && (
              <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
            )}
            <InputField
              name="email"
              placeholder="E-mail"
              type="email"
              icon="fa-solid fa-envelope-circle-check"
              required
            />
            <InputField
              name="password"
              placeholder="Mot de passe"
              type="password"
              icon="fa-solid fa-lock"
              required
            />
            <p className="modal-confirm-email-text">
              Vous allez recevoir un e-mail avec un lien afin de valider votre
              compte.
            </p>
            <Button
              text="Confirmer"
              type="submit"
              customClass="color"
              onClick={handleClose}
            />
          </form>
        </ModalContainer>
      )}
    </div>
  );
}

export default ModalConfirmEmail;
