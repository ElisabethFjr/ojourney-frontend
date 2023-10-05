import { Link } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { updateConsent } from '../../store/reducers/user';
import PdfDisplay from '../../components/PdfDisplay/PdfDisplay';

import Main from '../../layout/Main/Main';

import Button from '../../components/Button/Button';
// import ChangePassword from '../../components/ModalChangePassword/ModalChangePassword';
import ModaleConfirmPassword from '../../components/ModalConfirmPassword/ModalConfirmPassword';

import './Profil.scss';

function Profil() {
  const data = useAppSelector((state) => state.user.data);
  const userData = useAppSelector((state) => state.user.data);

  const dispatch = useAppDispatch();

  // *********************************** MODAL
  const [showModalConfirmPassword, setShowModalConfirmPassword] =
    useState<boolean>(false);
  const handleClickDeleteAccount = () => {
    setShowModalConfirmPassword(!showModalConfirmPassword);
  };
  // *********************************** USESTATE
  const [usageCommercial, setUsageCommercial] = useState<boolean>(false);
  const [newsletter, setNewsletter] = useState<boolean>(false);
  // *********************************** COMMERCIAL
  const handleUsageCommercialChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setUsageCommercial(value === 'true');
    if (userData && userData.id) {
      dispatch(updateConsent({ formData: value, id: userData.id }));
      console.log('Usage Commercial:', value);
    } else {
      console.error('userData or userData.id is undefined');
    }
  };

  // *********************************** NEWSLETTER
  const handleNewsletterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewsletter(value === 'true');
    if (userData && userData.id) {
      dispatch(updateConsent({ formData: value, id: userData.id }));
      console.log('Usage newsletter:', value);
    } else {
      console.error('userData or userData.id is undefined');
    }
  };
  // ***********************************

  return (
    <Main>
      <h1 className="main-title">Profil</h1>
      <section className="profil-card">
        <h2 className="profil-card-subtitle">Vos informations</h2>
        <p>
          Nom : <span className="profil-card-text">{data.lastname}</span>
        </p>
        <p>
          Prénom : <span className="profil-card-text">{data.firstname}</span>
        </p>
        <p>
          Email : <span className="profil-card-text">{data.email}</span>
        </p>

        {/* <p>Projet voyage(s) en cours : {data.trips.length}</p> */}
        <div className="profil-card-btn-container">
          <Link to="/edit-profil/">
            <Button
              text="Modifier les informations"
              customClass="color"
              type="button"
            />
          </Link>
        </div>
      </section>
      <section className="profil-card">
        <h2 className="profil-card-subtitle">Mot de passe</h2>
        <p>
          Mot de passe :
          <span className="profil-card-text"> ************* </span>
        </p>
        <div className="profil-card-btn-container">
          <Link to="/edit-password">
            <Button
              text="Changer le mot de passe"
              customClass="color"
              type="button"
            />
          </Link>
        </div>
      </section>
      <section className="profil-card">
        <h2 className="profil-card-subtitle">Vos données</h2>
        <p>
          Vous pouvez à tout moment consulter toutes les données vous concernant
          recueillies par l&apos;application
        </p>
        <div className="profil-card-btn-container">
          <PDFDownloadLink
            document={<PdfDisplay data={userData} />}
            fileName={`${userData.firstname}_${userData.lastname}.pdf`}
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Chargement...' : ' Téléchargez maintenant !'
            }
          </PDFDownloadLink>

          {/* <Button
            text="Télécharger mes données"
            customClass="color"
            type="button"
            onClick={generatePdf}
          /> */}
        </div>
      </section>
      {/* *********************** */}
      <section className="profil-card">
        <h2 className="profil-card-subtitle">Traitement de vos données</h2>

        <div>
          Vos choix pour le traitement de vos données sont les suivants:
          <form>
            <ul>
              <li>
                Usage commercial :{' '}
                <label>
                  <input
                    type="radio"
                    value="true"
                    checked={usageCommercial === true}
                    onChange={handleUsageCommercialChange} // Utilisez le gestionnaire d'événements pour le changement
                  />
                  True
                </label>{' '}
                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={usageCommercial === false}
                    onChange={handleUsageCommercialChange}
                  />
                  False
                </label>
              </li>
              <li>
                Newsletter :{' '}
                <label>
                  <input
                    type="radio"
                    value="true"
                    checked={newsletter === true}
                    onChange={handleNewsletterChange}
                  />
                  True
                </label>{' '}
                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={newsletter === false}
                    onChange={handleNewsletterChange}
                  />
                  False
                </label>
              </li>
            </ul>
          </form>
        </div>
      </section>
      {/* *********************** */}
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
            onClick={handleClickDeleteAccount}
          />
        </div>
      </section>
      {showModalConfirmPassword && <ModaleConfirmPassword />}
    </Main>
  );
}

export default Profil;

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
