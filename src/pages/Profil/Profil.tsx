import './Profil.scss';

function Profil() {
  return (
    <main className="main-profil">
      <h1>Profil</h1>

      <div className="main-information">
        <h2>Vos informations :</h2>
        <p>Email : </p>
        <p>Mot de pass : </p>
        <p>Projet voyage(s) en cours :</p>

        <button className="button-profil" type="button">
          Modifier infos
        </button>
      </div>

      <div className="main-data">
        <h2>Vos données :</h2>

        <p>
          Vous pouvez à tout moment consulter toutes les données vous concernant
          recueillies par l&apos;application
        </p>
        <button className="button-profil" type="button">
          Télécharger mes données
        </button>
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
        <button className="button-profil" type="button">
          Modifier mes consentements
        </button>
      </div>

      <div className="main-delete">
        <h2>Droits à l&apos;oubli : </h2>
        <p>
          Vous pouvez à tout moment demander la suppression de votre compte et
          de toutes les données vous concernant. Cette action est définitive et
          irréversible
        </p>
        <button className="button-profil" type="button">
          Supprimer compte
        </button>
      </div>
    </main>
  );
}

export default Profil;
