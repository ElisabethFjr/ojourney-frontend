// Import React Hooks & FormEvent
import { useState, FormEvent } from 'react';
// Import React-Toastify
import { toast } from 'react-toastify';
// Import Axios Instance
import axiosInstance from '../../utils/axios';

// Import Component
import ModalContainer from '../../layout/ModalContainer/ModalContainer';
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
  const [isOpen, setIsOpen] = useState(true); // Open Modal
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error Message
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading indicator

  // Close modal
  const handleClose = () => {
    setIsOpen(!isOpen);
    closeModal(true);
  };

  // Event handler on the invite member submit form
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Set the loading button pending
    setIsLoading(true);
    // Get the current form
    const form = event.currentTarget;
    // Create a FormData object
    const formData = new FormData(form);
    // Convert a JSON object
    const jsonData = Object.fromEntries(formData.entries());

    // Clear all Error Messages
    setErrorMessage(null);

    // Check if input is empty before submit
    if (!jsonData.email) {
      setErrorMessage('Veuillez renseigner tous les champs.');
      setIsLoading(false);
      return;
    }

    // Send a POST request to send a validation email if last one expired
    await axiosInstance
      .post('/confirm', jsonData)
      .then(() => {
        setIsOpen(!isOpen);
        closeModal(true);
        setIsLoading(false);
        toast.success("L'email a bien été envoyé !");
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status === 404) {
          setErrorMessage(
            "Vous n'avez pas de compte associé à cet adresse email."
          );
        } else if (error.response.status === 400) {
          setErrorMessage('Vous avez déjà validé votre adresse email.');
        }
      });
  };

  return (
    <div className="modal-confirm-email-container">
      {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-confirm-email-icon fa-solid fa-envelope-circle-check" />
          <h1 className="modal-confirm-email-title modal-title">
            Veuillez renseigner votre adresse email.
          </h1>
          <p className="modal-confirm-email-text">
            Vous allez recevoir un e-mail avec un lien afin de valider votre
            compte.
          </p>
          {/* If ErroMessage, display the error */}
          <form className="modal-confirm-email-form" onSubmit={handleSubmit}>
            {errorMessage && <ErrorMessage text={errorMessage} />}
            <InputField
              name="email"
              placeholder="E-mail"
              type="email"
              icon="fa-solid fa-envelope-circle-check"
              required
            />
            <Button
              text="Confirmer"
              type="submit"
              customClass="color"
              isLoading={isLoading}
            />
          </form>
        </ModalContainer>
      )}
    </div>
  );
}

export default ModalConfirmEmail;
