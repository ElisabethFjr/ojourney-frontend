// Import React Hooks & FormEvent
import { useState, FormEvent } from 'react';
// Import React-Toastify
import { toast } from 'react-toastify';
// Import Axios Instance
import axiosInstance from '../../utils/axios';
// Import Redux Hooks
import { useAppSelector } from '../../hooks/redux';
// Import Components
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import ModalContainer from '../ModalContainer/ModalContainer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
// Import Styles
import 'react-toastify/dist/ReactToastify.css';
import './ModalInviteMember.scss';

interface ModalInviteMemberProps {
  id: number | null; // Trip id
  closeModal: (value: React.SetStateAction<boolean>) => void;
}

function ModalInviteMember({ id, closeModal }: ModalInviteMemberProps) {
  // Declaration state variables
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch states from Redux store
  const members = useAppSelector((state) => state.trip.trip.members); // Members of the trip
  // Event handler on the invite member submit form

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Get the current from
    const form = event.currentTarget;
    // Create a FormData Object
    const formData = new FormData(form);
    // Convert a JSON object
    const jsonData = Object.fromEntries(formData.entries());

    // Clear all Error Messages
    setErrorMessage(null);

    // Extract email from formData
    const email = formData.get('email') as string;

    // Error : Check if input is empty before submit
    if (!jsonData.email) {
      setErrorMessage('Veuillez renseigner une adresse e-mail.');
      return;
    }

    // Error : Check is the member email already exist in the trip
    const isMemberAlreadyExists = members.some(
      (member) => member.email === email
    );
    if (isMemberAlreadyExists) {
      setErrorMessage('Ce membre existe déjà dans le voyage.');
      return;
    }

    // Send a POST request to invite a member with his email
    await axiosInstance
      .post(`/trips/${id}/invite`, jsonData)
      .then(() => {
        setIsOpen(!isOpen);
        closeModal(true);
        toast.success("L'invitation a bien été envoyée !");
      })
      .catch((error) => {
        error(
          "Une erreur est survenue lors la récupération de l'email.",
          error
        );
        toast.error("L'invitation n'a pas pu être envoyée.");
      });
  };
  // Close Modal
  const handleClose = () => {
    setIsOpen(!isOpen);
    closeModal(true);
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
            {/* Email Input */}
            <InputField
              name="email"
              placeholder="E-mail"
              type="email"
              icon="fa-solid fa-envelope-circle-check"
              maxlength={320}
              required
            />
            {/* Buttons */}
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
