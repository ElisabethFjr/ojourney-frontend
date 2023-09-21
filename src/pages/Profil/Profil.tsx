import Main from '../../layout/Main/Main';
import ButtonColor from '../../components/ButtonColor/ButtonColor';
import './Profil.scss';
import ButtonDanger from '../../components/ButtonDanger/ButtonDanger';

function Profil() {
  return (
    <Main>
      <h1>Profil</h1>

      <div className="main-information">
        <h2>Vos informations :</h2>
        <p>Email : </p>
        <p>Mot de pass : </p>
        <p>Projet voyage(s) en cours :</p>

        <ButtonColor text="Modifier les informations" to="#" />
      </div>

      <div className="main-data">
        <h2>Vos données :</h2>

        <p>
          Vous pouvez à tout moment consulter toutes les données vous concernant
          recueillies par l&apos;application
        </p>
        <ButtonColor text="Télécharger mes données" to="#" />
      </div>

      <div className="main-consent">
        <h2>Traitement de vos données :</h2>
        <p>
          Vos choix pour le traitement de vos données sont les suivants :
          <ul>
            <li>Usage commercial : Refusé</li>
            <li>Newsletter : Autorisé</li>
          </ul>
        </p>

        <ButtonColor text="Modifier mes consentements" to="#" />
      </div>

      <div className="main-delete">
        <h2>Droits à l&apos;oubli : </h2>
        <p>
          Vous pouvez à tout moment demander la suppression de votre compte et
          de toutes les données vous concernant. Cette action est définitive et
          irréversible
        </p>
        <ButtonDanger text="Supprimer le compte" />
      </div>
    </Main>
  );
}

export default Profil;
