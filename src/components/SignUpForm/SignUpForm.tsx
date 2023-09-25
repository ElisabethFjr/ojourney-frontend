import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';

import InputField from '../InputField/InputField';
import ButtonSubmit from '../Button/ButtonSubmit/ButtonSubmit';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import './SignUpForm.scss';

function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // Gérer la soumission du formulaire d'inscription
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const password = formData.get('password') as string;
    const confirmation = formData.get('confirmation') as string;

    if (password !== confirmation) {
      setErrorMessage("La confirmation de mot de passe n'est pas valide.");
      return;
    }
    setErrorMessage(null);

    // Envoyer les données du formulaire d'inscription sous forme JSON avec Axios
    const jsonData = Object.fromEntries(formData.entries());
    await axiosInstance
      .post('/signUp', jsonData)
      .then((data) => {
        console.log('Inscription réussie', data);
        // setShowSuccessMessage(true);
        navigate('/my-trips', { replace: true });
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
      />
      <InputField
        name="confirmation"
        placeholder="Mot de passe (confirmation)"
        type="password"
        icon="fa-solid fa-lock"
      />
      <ButtonSubmit text="S'inscrire" />
    </form>
  );
}

export default SignUpForm;
