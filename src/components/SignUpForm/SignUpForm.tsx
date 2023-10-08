import { FormEvent, useState } from 'react';
import axiosInstance from '../../utils/axios';

import InputField from '../InputField/InputField';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ConfirmModal from '../ModalConfirmMessage/ModalConfirmMessage';
import Button from '../Button/Button';

import './SignUpForm.scss';

function SignUpForm() {
  // Declaration state variables
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false); // State to display or not confirmation modal
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to display an error message

  // Handle SignUp form submit
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Extract data from formData
    const password = formData.get('password') as string;
    const confirmation = formData.get('confirmation') as string;

    // Clear all Error Messages
    setErrorMessage(null);

    // Check match password and confirmation, if not, display an error message
    if (password !== confirmation) {
      setErrorMessage("La confirmation de mot de passe n'est pas valide.");
      return;
    }

    // Remove the 'confirmation' field from the data to be sent
    formData.delete('confirmation');

    // Send registration form data (JSON) to the server with Axios
    const jsonData = Object.fromEntries(formData.entries());
    await axiosInstance
      .post('/signUp', jsonData)
      .then(() => {
        setShowModalConfirm(true);
      })
      .catch((error) => {
        console.error(error);
        // Set the error message state with the server's error message if available
        setErrorMessage(error.response.data.error);
      });
  };

  return (
    <form className="form-content" onSubmit={handleSubmit}>
      {/* ConfirmModal */}
      {showModalConfirm && (
        <ConfirmModal closeModal={() => setShowModalConfirm(false)} />
      )}
      {/* Error Message */}
      {errorMessage && (
        <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
      )}
      {/* Input Lastname */}
      <InputField
        name="lastname"
        placeholder="Nom"
        type="text"
        icon="fa-solid fa-user"
        maxlength={100}
        required
      />
      {/* Input Firstname */}
      <InputField
        name="firstname"
        placeholder="Prénom"
        type="text"
        icon="fa-solid fa-user"
        maxlength={100}
        required
      />
      {/* Input Email */}
      <InputField
        name="email"
        placeholder="Email"
        type="email"
        icon="fa-solid fa-at"
        maxlength={320}
        required
      />
      {/* Input Password */}
      <InputField
        name="password"
        placeholder="Mot de passe"
        type="password"
        icon="fa-solid fa-lock"
        maxlength={128}
        required
        autocomplete="off"
      />
      {/* Input Confirmation Password */}
      <InputField
        name="confirmation"
        placeholder="Mot de passe (confirmation)"
        type="password"
        icon="fa-solid fa-lock"
        maxlength={128}
        required
        autocomplete="off"
      />
      {/* Submit Button */}
      <Button
        text="S'inscrire"
        customClass="color button-style--width"
        type="submit"
      />
    </form>
  );
}

export default SignUpForm;
