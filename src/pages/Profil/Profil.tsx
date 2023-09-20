
import './Profil.scss';

import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';

function Profil()
{
  return (

  <main className="main-profil">
    <h1>Profil</h1>

<div className="main-information">
<h2>Vos informations</h2>
<p>Email : </p>
<p>Mot de pass : </p>
<p>Projet voyage(s) en cours :</p>

<button type="button-information">
        Modifier infos
      </button>
</div>

<div className="main-data">
<h2>Vos données</h2>

<p>Vous pouvez à tout moment consulter toutes les données vous concernant recueillies par l'application</p>
<button type="button-data">
        Télécharger mes données
      </button>
</div>

<div className="main-consent">
<h2>Traitement de vos données</h2>
<p>Vos choix pour le traitement de vos données sont les suivants : 
  <ul>
<li>Usage commercial : Refusé</li>
<li>Newsletter : Autorisé</li>
  </ul>
</p>
<button type="button-consent">
        Modifier mes consentements
      </button>
</div>

<div className="main-delete">
<h2>Droits à l'oubli</h2>
<p>Vous pouvez à tout moment demander la suppression de votre compte et de toutes les données vous concernant.
  Cette action est définitive et irréversible
</p>
<button type="button-delete">
        Supprimer compte
      </button>
</div>
  </main>

    );
  }

  export default Profil ;