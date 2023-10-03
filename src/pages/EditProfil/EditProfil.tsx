// Import necessary modules and components
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUserData } from '../../store/reducers/user';

import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import './EditProfil.scss';

function EditProposition() {
  // Initialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Get user data and environment from Redux store
  const userData = useAppSelector((state) => state.user.data);
  const env = useAppSelector((state) => state.user.env);

  // Configure axiosOptions based on the environment
  let axiosOptions = {};
  if (env === 'dev') {
    axiosOptions = {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('token')?.replace(/"|_/g, '') || ''
        }`,
      },
    };
  } else {
    axiosOptions = {
      withCredentials: true,
    };
  }
  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Create an object with updated user data from form inputs
    const updatedUserData = {
      firstname: formData.get('firstname') as string | null,
      lastname: formData.get('lastname') as string | null,
      email: formData.get('email') as string | null,
    };
    // Send a patch request to update user data
    await axiosInstance
      .patch(`/users/${userData.id}`, updatedUserData, axiosOptions)
      .then(() => {
        // Dispatch the updated user data to Redux store
        dispatch(updateUserData(updatedUserData));
        navigate(`/profil`);
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors de l'édition de la proposition.",
          error
        );
      });
  };

  return (
    <Main>
      <h1 className="main-title">Modifier votre information</h1>
      <div className="edit-profil-container">
        <form className="edit-profil-form" onSubmit={handleSubmit}>
          <div className="edit-profil-item">
            <InputField
              name="lastname"
              placeholder="Nom"
              type="text"
              icon="fa-solid fa-user"
            />
            <Button
              text="Modifier le nom"
              customClass="color button-style--width button-style--height"
              type="submit"
            />
          </div>
          <div className="edit-profil-item">
            <InputField
              name="firstname"
              placeholder="Prénom"
              type="text"
              icon="fa-solid fa-user"
            />
            <Button
              text="Modifier prénom"
              customClass="color button-style--width button-style--height"
              type="submit"
            />
          </div>
          <div className="edit-profil-item">
            <InputField
              name="email"
              placeholder="Email"
              type="email"
              icon="fa-solid fa-at"
            />
            <Button
              text="Modifier email"
              customClass="color button-style--width button-style--height"
              type="submit"
            />
          </div>
        </form>
      </div>
    </Main>
  );
}

export default EditProposition;
