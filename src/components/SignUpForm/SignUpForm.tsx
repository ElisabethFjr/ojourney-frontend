import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';

import InputField from '../InputField/InputField';
import ButtonSubmit from '../Button/ButtonSubmit/ButtonSubmit';

import './SignUpForm.scss';

function SignUpForm() {
  const navigate = useNavigate();

  // Gérer la soumission du formulaire d'inscription
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    // setShowSuccessMessage(true);

    // Envoyer les données du formulaire d'inscription sous forme JSON avec Axios
    try {
      const jsonData = Object.fromEntries(formData.entries());
      const { data } = await axiosInstance.post('/signUp', jsonData);
      navigate('/my-trips', { replace: true });
      console.log('Inscription réussie', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="form-content" onSubmit={handleSubmit}>
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
