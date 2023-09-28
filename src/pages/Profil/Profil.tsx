import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import axiosInstance from '../../utils/axios';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import Document from './Document.js'

import Main from '../../layout/Main/Main';

import './Profil.scss';
import Button from '../../components/Button/Button';

function Profil() {
  const data = useAppSelector((state) => state.user.data);

  // const handleClickOnGetData = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log(data);
  // };

  // // Envoyer nouveau consents au backend /!\
  // const handleClickChangeConsents = async (
  //   event: FormEvent<HTMLFormElement>
  // ) => {
  //   event.preventDefault();
  //   const formData = new FormData(form);
  //   const formSent = Object.fromEntries(formData);
  //   try {
  //     const response = await axiosInstance.patch(`/users/${data.id}`, formSent);
  //     console.log(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // // Envoyer le password au backend /!\
  // const handleClickDeleteAccount = async (
  //   event: FormEvent<HTMLFormElement>
  // ) => {
  //   event.preventDefault();
  //   const formData = new FormData(form);
  //   const formSent = Object.fromEntries(formData);
  //   try {
  //     const response = await axiosInstance.delete(
  //       `/users/${data.id}`,
  //       formSent
  //     );
  //     console.log(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Main>
      <h1 className="main-title">Profil</h1>

      <section className="profil-card">
        <h2 className="profil-card-subtitle">Vos informations</h2>
        <p>
          Nom prénom : {data.firstname} {data.lastname}
        </p>
        <p>Email : {data.email}</p>
        <p>Mot de passe : {data.password}</p>
        <p>Projet voyage(s) en cours : {data.trips.length}</p>
        <div className="profil-card-btn-container">
          <Link to="/edit-profil">
            <Button
              text="Modifier les informations"
              customClass="color"
              type="button"
            />
          </Link>
        </div>
      </section>
      {/* Installer react-pdf */}
      <section className="profil-card">
        <h2 className="profil-card-subtitle">Vos données</h2>
        <p>
          Vous pouvez à tout moment consulter toutes les données vous concernant
          recueillies par l&apos;application
        </p>
        <div className="profil-card-btn-container">
          <Button
            text="Télécharger mes données"
            customClass="color"
            type="button"
          />
          {/* <PDFDownloadLink document={<PdfFile data={data}/>} fileName="informations.pdf">
            {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Télécharger vos données'
            }
          </PDFDownloadLink> */}
        </div>
      </section>

      <section className="profil-card">
        <h2 className="profil-card-subtitle">Traitement de vos données</h2>
        <div>
          Vos choix pour le traitement de vos données sont les suivants :
          <ul>
            <li>Usage commercial : Refusé</li>
            <li>Newsletter : Autorisé</li>
          </ul>
        </div>
        <div className="profil-card-btn-container">
          <Button
            text="Modifier mes consentements"
            customClass="color"
            type="button"
            // onClick={handleClickChangeConsents}
          />
        </div>
      </section>

      <section className="profil-card">
        <h2 className="profil-card-subtitle">Droits à l&apos;oubli</h2>
        <p>
          Vous pouvez à tout moment demander la suppression de votre compte et
          de toutes les données vous concernant. Cette action est définitive et
          irréversible
        </p>
        <div className="profil-card-btn-container">
          <Button
            text="Supprimer le compte"
            customClass="danger"
            type="button"
            // onClick={handleClickDeleteAccount}
          />
        </div>
      </section>
    </Main>
  );
}

export default Profil;
