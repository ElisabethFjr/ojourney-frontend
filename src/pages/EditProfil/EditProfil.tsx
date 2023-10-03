import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateUserData } from '../../store/reducers/user';

import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';

import './EditProfil.scss';

function EditProfil() {
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
      lastname: formData.get('lastname') as string | null,
      firstname: formData.get('firstname') as string | null,
      email: formData.get('email') as string | null,
    };

    try {
      // Send a patch request to update user data
      await axiosInstance.patch(
        `/users/${userData.id}`,
        updatedUserData,
        axiosOptions
      );

      // Dispatch the updated user data to Redux store
      dispatch(updateUserData(updatedUserData));

      // Redirect to the profile page after successful update
      navigate(`/profil`);
    } catch (error) {
      console.error(
        "Une erreur est survenue lors de l'édition de la proposition.",
        error
      );
    }
  };

  return (
    <Main>
      <h1 className="main-title">Modifier votre information</h1>
      <div className="edit-profil-container">
        <form className="edit-profil-form" onSubmit={handleSubmit}>
          <InputField
            name="lastname"
            placeholder={`${userData.lastname}`}
            type="text"
            icon="fa-solid fa-user"
          />
          <InputField
            name="firstname"
            placeholder={`${userData.firstname}`}
            type="text"
            icon="fa-solid fa-user"
          />
          <InputField
            name="email"
            placeholder={`${userData.email}`}
            type="email"
            icon="fa-solid fa-at"
          />
          <Button
            text="Modifier"
            customClass="color button-style--width"
            type="submit"
          />
        </form>
      </div>
    </Main>
  );
}

export default EditProfil;
