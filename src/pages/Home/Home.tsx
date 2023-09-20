import ButtonColor from '../../components/ButtonColor/ButtonColor';
import './Home.scss';

function Home() {
  return (
    <main className="main home">
      <div className="home-container">
        <div className="home-container-box">
          <h1 className="home-title">
            Explorons le monde ensemble avec <span>O&apos;Journey.</span>
          </h1>
          <p className="home-overview">
            Simplifiez la planification de votre voyage en couple, entre amis ou
            en famille. Regroupez informations et idées, décidez ensemble et
            vivez des aventures inoubliables.
          </p>
          <ButtonColor text="Commencer" to="/SignInSignUp" />
        </div>
      </div>
    </main>
  );
}

export default Home;
