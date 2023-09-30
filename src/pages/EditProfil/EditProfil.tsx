import { FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';

import Main from '../../layout/Main/Main';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import './EditProfil.scss';

function EditProposition() {
  const { idUser } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const formSent = Object.fromEntries(formData);

    await axiosInstance
      .patch(`/users/${idUser}`, formSent, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${
            localStorage.getItem('token')?.replace(/"|_/g, '') || ''
          }`,
        },
      })
      .then(() => {
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
              required
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
              required
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
              required
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
