import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axios';
import { useAppSelector } from '../../hooks/redux';

import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import ModalContainer from '../ModalContainer/ModalContainer';

import 'react-toastify/dist/ReactToastify.css';
import './ModalInviteMember.scss';

interface ModalInviteMemberProps {
  id: number | null;
}

function ModalInviteMember({ id }: ModalInviteMemberProps) {
  // Declaration state variables
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Fetch states from Redux store
  const env = useAppSelector((state) => state.user.env);

  // Event handler on the invite member submit form
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());

    // Axios options: If in development mode (using token) or production mode (using cookies)
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

    // Send email (JSON) to the server
    await axiosInstance
      .post(`/trips/${id}/invite`, jsonData, axiosOptions)
      .then((response) => {
        console.log("L'email a bien été envoyé", response.data);
        toast.success("L'invitation a bien été envoyée !", {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setIsOpen(!isOpen);
      })
      .catch((error) => {
        console.error(
          "Une erreur est survenue lors la récupération de l'email.",
          error
        );
        toast.error(
          "L'invitation n'a pas pu être envoyée." ||
            error.response.data.message,
          {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          }
        );
      });
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <ModalContainer handleClose={handleClose}>
          <i className="modal-icon-email fa-solid fa-envelope-circle-check" />
          <h1 className="modal-invite-member-title">
            Invitation d&apos;un membre
          </h1>
          <p className="modal-invite-member-text">
            Veuillez renseigner l&apos;adresse mail du nouveau membre.
          </p>
          <form onSubmit={handleSubmit}>
            <InputField
              name="email"
              placeholder="e-mail"
              type="email"
              icon="fa-solid fa-envelope-circle-check"
            />
            <div className="modal-invite-member-button-container">
              <Button
                text="Annuler"
                type="button"
                customClass="outline-dark"
                onClick={handleClose}
              />

              <Button
                text="Confirmer"
                type="submit"
                customClass="outline-dark"
              />
            </div>
          </form>
        </ModalContainer>
      )}
    </div>
  );
}

export default ModalInviteMember;
