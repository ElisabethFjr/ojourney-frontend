import Main from '../../layout/Main/Main';

import ButtonColor from '../../components/Button/ButtonColor/ButtonColor';
import ButtonDanger from '../../components/Button/ButtonDanger/ButtonDanger';

import './Profil.scss';

function Profil() {
  return (
    <Main>
      <h1 className="main-title">Profil</h1>

      <section className="profil-card">
        <h2 className="profil-card-subtitle">Vos informations</h2>
        <p>Email : 123@123.fr</p>
        <p>Mot de passe : *******</p>
        <p>Projet voyage(s) en cours : 3</p>
        <div className="profil-card-btn-container">
          <ButtonColor text="Modifier les informations" to="#" />
        </div>
      </section>

      <section className="profil-card">
        <h2 className="profil-card-subtitle">Vos données</h2>
        <p>
          Vous pouvez à tout moment consulter toutes les données vous concernant
          recueillies par l&apos;application
        </p>
        <div className="profil-card-btn-container">
          <ButtonColor text="Télécharger mes données" to="#" />
        </div>
      </section>

      <section className="profil-card">
        <h2 className="profil-card-subtitle">Traitement de vos données</h2>
        <p>
          Vos choix pour le traitement de vos données sont les suivants :
          <ul>
            <li>Usage commercial : Refusé</li>
            <li>Newsletter : Autorisé</li>
          </ul>
        </p>
        <div className="profil-card-btn-container">
          <ButtonColor text="Modifier mes consentements" to="#" />
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
          <ButtonDanger text="Supprimer le compte" />
        </div>
      </section>
    </Main>
  );
}

export default Profil;
