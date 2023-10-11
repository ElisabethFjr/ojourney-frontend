// Import React Hooks & FormEvent
import { useState, FormEvent } from 'react';
// Import React-Toastify
import { toast } from 'react-toastify';
// Import Axios Instance
import axiosInstance from '../../utils/axios';

// Import Component
import ModalContainer from '../ModalContainer/ModalContainer';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

// Import Styles
import './ModalConfirmEmail.scss';

interface ModalConfirmEmailProps {
  closeModal: (value: React.SetStateAction<boolean>) => void;
}

function ModalConfirmEmail({ closeModal }: ModalConfirmEmailProps) {
  // State Variable
  const [isOpen, setIsOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Close modal
  const handleClose = () => {
    setIsOpen(!isOpen);
    closeModal(true);
  };

  // Event handler on the invite member submit form
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Get the current form
    const form = event.currentTarget;
    // Create a FormData object
    const formData = new FormData(form);
    // Convert a JSON object
    const jsonData = Object.fromEntries(formData.entries());

    // Clear all Error Messages
    setErrorMessage(null);

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
        closeModal(true);
        toast.success("L'email a bien été envoyé !");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 404 &&
          error.response.data.error === "This user doesn't exist in DB !"
        ) {
          setErrorMessage(
            "Vous n'avez pas de compte ou avez déjà validé votre email."
          );
        }
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
          <p className="modal-confirm-email-text">
            Vous allez recevoir un e-mail avec un lien afin de valider votre
            compte.
          </p>
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
            <Button text="Confirmer" type="submit" customClass="color" />
          </form>
        </ModalContainer>
      )}
    </div>
  );
}

export default ModalConfirmEmail;
