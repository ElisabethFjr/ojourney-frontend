import { FormEvent, useState } from 'react';
import axiosInstance from '../../utils/axios';

import InputField from '../InputField/InputField';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
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

    // Extract password and confirmation from formData
    const password = formData.get('password') as string;
    const confirmation = formData.get('confirmation') as string;

    // Check match password and confirmation, if not, display an error message
    if (password !== confirmation) {
      setErrorMessage("La confirmation de mot de passe n'est pas valide.");
      return;
    }
    setErrorMessage(null);

    // Remove the 'confirmation' field from the data to be sent
    formData.delete('confirmation');

    // Send registration form data (JSON) to the server with Axios
    const jsonData = Object.fromEntries(formData.entries());
    await axiosInstance
      .post('/signUp', jsonData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((data) => {
        console.log('Inscription réussie', data);
        setShowModalConfirm(true);
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("Une erreur s'est produite lors de l'inscription.");
        }
      });
  };

  return (
    <form className="form-content" onSubmit={handleSubmit}>
      {showModalConfirm && <ConfirmModal />}
      {errorMessage && (
        <ErrorMessage icon="fa-solid fa-xmark" text={errorMessage} />
      )}
      <InputField
        name="lastname"
        placeholder="Nom"
        type="text"
        icon="fa-solid fa-user"
      />
      <InputField
        name="firstname"
        placeholder="Prénom"
        type="text"
        icon="fa-solid fa-user"
      />
      <InputField
        name="email"
        placeholder="Email"
        type="email"
        icon="fa-solid fa-at"
      />
      <InputField
        name="password"
        placeholder="Mot de passe"
        type="password"
        icon="fa-solid fa-lock"
        autocomplete="off"
      />
      <InputField
        name="confirmation"
        placeholder="Mot de passe (confirmation)"
        type="password"
        icon="fa-solid fa-lock"
        autocomplete="off"
      />
      <Button
        text="S'inscrire"
        customClass="color button-style--width"
        type="submit"
      />
    </form>
  );
}

export default SignUpForm;
