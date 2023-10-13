// Import React Hook
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { checkUserAuth } from '../../store/reducers/user';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Import Components
import Button from '../../components/Button/Button';

// Import Styles
import './Home.scss';
import Loading from '../../components/Loading/Loading';

function Home() {
  // Initializing Hooks
  const dispatch = useAppDispatch();

  // Check the connected user's information for authentication (token or cookies in headers), if ok dispatch the user's data
  useEffect(() => {
    checkUserAuth();
  }, [dispatch]);

  // Fetch Redux States
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  return (
    <main className="home">
      {isLoading && <Loading />}
      <div className="home-container">
        <div className="home-container-box">
          <h1 className="home-title">
            Organisez vos voyages en groupe avec <span>O&apos;Journey.</span>
          </h1>
          <p className="home-overview">
            Simplifiez la planification de vos futurs voyages avec vos proches.
            Regroupez informations et idées, décidez ensemble et vivez des
            aventures inoubliables. Connectez-vous ou créez un compte pour
            commencer.
          </p>
          <Link
            to={isAuth ? '/new-trip' : '/signin-signup'}
            className="home-link"
          >
            {/* Button */}
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
