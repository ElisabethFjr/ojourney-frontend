// Imports React Hook
import { Link, useNavigate } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useState, FormEvent } from 'react';

// Import Curstom Redux Hook
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { updateConsent } from '../../store/reducers/user';

// Imports Layout & Components
import Main from '../../layout/Main/Main';
import PdfDisplay from '../../components/PdfDisplay/PdfDisplay';
import Button from '../../components/Button/Button';
import ModaleConfirmPassword from '../../components/ModalConfirmPassword/ModalConfirmPassword';

// Import Styles
import './Profil.scss';

function Profil() {
  // Inilialize Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Fetch states from Redux store
  const userData = useAppSelector((state) => state.user.data);

  // States variables declaration
  const [showModalConfirmPassword, setShowModalConfirmPassword] =
    useState<boolean>(false);
  const [commercialConsent, setCommercialConsent] = useState<boolean>(
    userData.consent_commercial
  );
  const [newsletterConsent, setNewsletterConsent] = useState(
    userData.consent_newsletter
  );

  // Toggle consent state
  const handleCommercialToggle = () => {
    setCommercialConsent(!commercialConsent);
  };
  const handleNewsletterToggle = () => {
    setNewsletterConsent(!newsletterConsent);
  };

  // Event handler for the EditProposition form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('consent_commercial', commercialConsent.toString());
    formData.append('consent_newsletter', newsletterConsent.toString());
    dispatch(updateConsent({ formData, id: userData.id }));
    navigate('/profil');
  };

  // *****************************

  const handleClickDeleteAccount = () => {
    setShowModalConfirmPassword(!showModalConfirmPassword);
  };

  return (
    <Main>
      <h1 className="main-title">Profil</h1>
      <section className="profil-card">
        <h2 className="profil-card-subtitle">Vos informations</h2>
        <p>
          Nom : <span className="profil-card-text">{userData.lastname}</span>
        </p>
        <p>
          Prénom :{' '}
          <span className="profil-card-text">{userData.firstname}</span>
        </p>
        <p>
          Email : <span className="profil-card-text">{userData.email}</span>
        </p>
        <p>
          Projet voyage(s) en cours :{' '}
          <span className="profil-card-text">{userData.trips.length}</span>
        </p>
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
          recueillies par l&apos;application.
        </p>
        <div className="profil-card-btn-container">
          <PDFDownloadLink
            document={<PdfDisplay data={userData} />}
            fileName={`${userData.firstname}_${userData.lastname}.pdf`}
            className="button-style button-style--color"
          >
            {({ loading }) =>
              loading ? 'Chargement...' : ' Téléchargez maintenant !'
            }
          </PDFDownloadLink>
        </div>
      </section>
      {/* *********************** */}
      <section className="profil-card">
        <h2 className="profil-card-subtitle">Traitement de vos données</h2>
        <div>
          Vos choix pour le traitement de vos données sont les suivants:
          <form onSubmit={handleSubmit}>
            {/* Checkbox Button Commercial */}
            <div className="profil-card-toggle-container">
              <p className="profil-card-toggle-text"> commercial :</p>
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
            {/*  Checkbox Button Newsletter */}
            <div className="profil-card-toggle-container">
              <p className="profil-card-toggle-text">Usage newsletter :</p>
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

            {/*  Submit Button */}
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
          irréversible.
        </p>
        <div className="profil-card-btn-container">
          {/*  Danger Button */}
          <Button
            text="Supprimer le compte"
            customClass="danger"
            type="button"
            onClick={handleClickDeleteAccount}
          />
        </div>
      </section>
      {showModalConfirmPassword && (
        <ModaleConfirmPassword
          closeModal={() => setShowModalConfirmPassword(false)}
        />
      )}
    </Main>
  );
}

export default Profil;
