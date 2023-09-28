import Main from '../../layout/Main/Main';

import ButtonColor from '../../components/Button/ButtonColor/ButtonColor';
import ButtonDanger from '../../components/Button/ButtonDanger/ButtonDanger';

import './Profil.scss';
import { useAppSelector } from '../../hooks/redux';

function Profil() {
  const data = useAppSelector((state) => state.user.data);

  // const handleClickOnGetData = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   dispatch(login(formData));
  //   if (!errorMessage) {
  //     navigate('/my-trips'); // If no error (login success), redirect the use to '/my-trips'
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
          <ButtonColor
            text="Télécharger mes données"
            // onClick={handleClickOnGetData}
            to="#"
          />
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
