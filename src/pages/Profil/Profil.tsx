import { Link } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { updateConsent } from '../../store/reducers/user';

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

  // ********************************** Consent
  const [commercialConsent, setCommercialConsent] = useState<boolean>(
    userData.consent_commercial
  );
  const [newsletterConsent, setNewsletterConsent] = useState(
    userData.consent_newsletter
  );

  // *********************************** USESTATE

  // const handleUsageCommercialChange = (
  //   event: ChangeEvent<HTMLInputElement>
  // ) => {
  //   const { value } = event.target;
  //   setCommercialConsent(value === 'true'); // Assuming 'value' is a string 'true' or 'false'
  //   if (userData && userData.id) {
  //     dispatch(updateConsent({ formData: value, id: userData.id }));
  // };

  const handleCommercialToggle = () => {
    setCommercialConsent(!commercialConsent);
    console.log('Commercials', commercialConsent);
  };

  const handleNewsletterToggle = () => {
    setNewsletterConsent(!newsletterConsent);
    console.log('Newsletter', newsletterConsent);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form);
    const formData = new FormData(form);
    formData.append('consent_commercial', commercialConsent);

    if (userData && userData.id) {
      dispatch(updateConsent({ formData, id: userData.id }));
    }
  };

  const handleClickDeleteAccount = () => {
    setShowModalConfirmPassword(!showModalConfirmPassword);
  };

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
        </div>
      </section>
      {/* *********************** */}
      <section className="profil-card">
        <h2 className="profil-card-subtitle">Traitement de vos données</h2>
        <div>
          Vos choix pour le traitement de vos données sont les suivants:
          <form onSubmit={handleSubmit}>
            {/* ************************** Commercial  */}
            <div className="profil-card-toggle-container">
              <p>Usage commercial :</p>
              <input
                className="profil-card-checkbox"
                name="consent_commercial"
                type="checkbox"
                id="consentCommercial"
                onChange={handleCommercialToggle}
                checked={commercialConsent}
              />
              {commercialConsent ? 'Accepté' : 'Refusé'}
              <label
                className="profil-card-toggleSwitch"
                htmlFor="consentCommercial"
              >
                <span className="profil-card-checkbox-slider" />
              </label>
            </div>

            {/* ************************** NEWSLETTER   */}
            <div className="profil-card-toggle-container">
              <p>Usage newsletter :</p>
              <input
                className="profil-card-checkbox"
                name="consent_newsletter"
                type="checkbox"
                id="consentNewsletter"
                onChange={handleNewsletterToggle}
                checked={newsletterConsent}
              />
              {newsletterConsent ? 'Accepté' : 'Refusé'}
              <label
                className="profil-card-toggleSwitch"
                htmlFor="consentNewsletter"
              >
                <span className="profil-card-checkbox-slider" />
              </label>
            </div>
            <div className="profil-card-btn-container">
              <Button
                text="Changer vos données"
                customClass="color"
                type="submit"
              />
            </div>
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
