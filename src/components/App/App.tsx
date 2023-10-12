// Import React-Router-Dom
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
// Import React Hooks
import { useState, useEffect } from 'react';
// Import React-Toastify
import { ToastContainer, Slide } from 'react-toastify';
// Import Redux Hooks
import { useAppDispatch } from '../../hooks/redux';
import { checkUserInfos } from '../../store/reducers/user';

// Import axios instance
import axiosInstance from '../../utils/axios';

// Import Layout
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
// Import Component
import Loading from '../Loading/Loading';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

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
import ErrorServer from '../../pages/ErrorServer/ErrorServer';

// Import Styles
import './App.scss';
// Import styles 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Initializing Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Check the connected user's information for authentication (token or cookies in headers), if ok dispatch the user's data
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
      dispatch(checkUserInfos());
    }
  }, [dispatch]);

  // Scroll to the top of the page when the location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="app-container">
      <Header />
      <Routes>
        {/* Public Routes (visitor) */}
        <Route path="/" element={<Home />} />
        <Route path="/signin-signup" element={<SignInUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/confirm-account" element={<ConfirmAccount />} />
        <Route path="/confirm-invite" element={<ConfirmInvite />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/invite" element={<ConfirmInvite />} />
        <Route path="*" element={<ErrorNotFound />} />
        <Route path="/500" element={<ErrorServer />} />

        {/* Private Routes (user connected) */}
        <Route
          path="/profil"
          element={
            <PrivateRoute>
              <Profil />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-trips"
          element={
            <PrivateRoute>
              <MyTrips />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-trip/:id"
          element={
            <PrivateRoute>
              <MyTrip />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-trip"
          element={
            <PrivateRoute>
              <NewTrip />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-proposition/:id"
          element={
            <PrivateRoute>
              <NewProposition />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profil"
          element={
            <PrivateRoute>
              <EditProfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-password"
          element={
            <PrivateRoute>
              <EditPassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-trip/:id"
          element={
            <PrivateRoute>
              <EditTrip />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-proposition/:tripId/:propositionId"
          element={
            <PrivateRoute>
              <EditProposition />
            </PrivateRoute>
          }
        />
        {/* Interceptor to redirect the user to the /500 route if status code of the response if 500 (Internal Server Error). */}
        {axiosInstance.interceptors.response.use(
          (response) => response,
          (error) => {
            if (error.response && error.response.status === 500) {
              navigate('/500');
            }
            return Promise.reject(error);
          }
        )}
      </Routes>
      <Footer />
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
