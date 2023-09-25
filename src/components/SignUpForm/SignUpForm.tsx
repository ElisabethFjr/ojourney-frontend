import { FormEvent } from 'react';
import axiosInstance from '../../utils/axios';

import InputField from '../InputField/InputField';
import ButtonSubmit from '../Button/ButtonSubmit/ButtonSubmit';

import './SignUpForm.scss';

function SignUpForm() {
  // Axio Api post /signUp

  // Gestionnaire d'évenement au submit du formulaire

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    console.log(jsonData);
  };

  //   try {
  //     const jsonData = Object.fromEntries(formData);
  //     const { data } = await axiosInstance.post('/signUp', jsonData);
  //   } catch (error) {}
  // };

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
