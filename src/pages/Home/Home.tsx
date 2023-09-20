import ButtonColor from '../../components/ButtonColor/ButtonColor';
import './Home.scss';

function Home() {
  return (
    <main className="main home">
      <div className="home-container">
        <div className="home-container-box">
          <h1 className="home-title">
            Organisez vos voyages en groupe avec <span>O&apos;Journey.</span>
          </h1>
          <p className="home-overview">
            Simplifiez la planification de votre futur voyages avec vos proches.
            Regroupez informations et idées, décidez ensemble et vivez des
            aventures inoubliables. Connectez-vous ou créez un compte pour
            commencer.
          </p>
          <ButtonColor text="Commencer à planifier" to="/SignInSignUp" />
        </div>
      </div>
    </main>
  );
}

export default Home;
