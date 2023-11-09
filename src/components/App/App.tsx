// Import React-Router-Dom
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// Import React Hooks
import { useEffect, useState } from 'react';
// Import React-Toastify
import { ToastContainer, Slide, toast } from 'react-toastify';
// Import Redux Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkUserAuth } from '../../store/reducers/user';
// Import axios instance
import axiosInstance from '../../utils/axios';

// Import Layout
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';

// Import Pages
import Home from '../../pages/Home/Home';
import SignInUp from '../../pages/SignInUp/SignInUp';
import Profil from '../../pages/Profil/Profil';
import ConfirmAccount from '../../pages/ConfirmAccount/ConfirmAccount';
import ConfirmInvite from '../../pages/ConfirmInvite/ConfirmInvite';
import MyTrips from '../../pages/MyTrips/MyTrips';
import MyTrip from '../../pages/MyTrip/MyTrip';
import NewTrip from '../../pages/NewTrip/NewTrip';
import NewProposition from '../../pages/NewProposition/NewProposition';
import EditTrip from '../../pages/EditTrip/EditTrip';
import EditProposition from '../../pages/EditProposition/EditProposition';
import EditProfil from '../../pages/EditProfil/EditProfil';
import EditPassword from '../../pages/EditPassword/EditPassword';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import About from '../../pages/About/About';
import Contact from '../../pages/Contact/Contact';
import Terms from '../../pages/Terms/Terms';
import ErrorNotFound from '../../pages/ErrorNotFound/ErrorNotFound';
import ErrorGeneric from '../../pages/ErrorGeneric/ErrorGeneric';
import Loading from '../Loading/Loading';

// Import Styles
import './App.scss';
// Import styles 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Initializing Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Declaration variable state
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch states from Redux store
  const isAuth = useAppSelector((state) => state.user.isAuth);

  // Check the connected user's information for authentication (token or cookies in headers), if ok dispatch the user's data
  useEffect(() => {
    // Check if a user token is stored in the browser's localStorage
    if (localStorage.getItem('userToken')) {
      const token = localStorage.getItem('userToken');
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch(checkUserAuth()).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  // Scroll to the top of the page when the location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Handle the axios interceptor errors
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          if (error.response.status === 429) {
            toast.error(
              'Vous avez effectué trop de tentatives. Votre adresse IP est temporairement bloquée pendant 30 minutes.'
            );
          } else if (error.response.status === 500) {
            navigate('/error');
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptor when the component unmounts
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return (
    <div className="app-container">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <Routes>
            {/* Public Routes (visitor) */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/confirm-account" element={<ConfirmAccount />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/invite" element={<ConfirmInvite />} />
            <Route path="*" element={<ErrorNotFound />} />
            <Route path="/error" element={<ErrorGeneric />} />
            {/* Public Route for Login/Register (visitor) */}
            <Route
              path="/signin-signup"
              element={isAuth ? <MyTrips /> : <SignInUp />}
            />
            {/* Private Routes (user auth) */}
            <Route
              path="/profil"
              element={isAuth ? <Profil /> : <SignInUp />}
            />
            <Route
              path="/my-trips"
              element={isAuth ? <MyTrips /> : <SignInUp />}
            />
            <Route
              path="/my-trip/:id"
              element={isAuth ? <MyTrip /> : <SignInUp />}
            />
            <Route
              path="/new-trip"
              element={isAuth ? <NewTrip /> : <SignInUp />}
            />
            <Route
              path="/new-proposition/:id"
              element={isAuth ? <NewProposition /> : <SignInUp />}
            />
            <Route
              path="/edit-profil"
              element={isAuth ? <EditProfil /> : <SignInUp />}
            />
            <Route
              path="/edit-password"
              element={isAuth ? <EditPassword /> : <SignInUp />}
            />
            <Route
              path="/edit-trip/:id"
              element={isAuth ? <EditTrip /> : <SignInUp />}
            />
            <Route
              path="/edit-proposition/:tripId/:propositionId"
              element={isAuth ? <EditProposition /> : <SignInUp />}
            />
          </Routes>

          <Footer />
        </>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme="light"
      />
    </div>
  );
}

export default App;
