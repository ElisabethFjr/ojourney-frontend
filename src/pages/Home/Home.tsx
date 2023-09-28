import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

import './Home.scss';

function Home() {
  return (
    <main className="home">
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
          <Link to="/signin-signup" className="home-link">
            <Button
              type="button"
              text="Commencer à planifier"
              customClass="color"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;
