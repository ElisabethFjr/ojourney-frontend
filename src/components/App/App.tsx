import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux';

import Loading from './Loading/Loading';

import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';

import Home from '../../pages/Home/Home';
import SignInUp from '../../pages/SignInUp/SignInUp';
import Profil from '../../pages/Profil/Profil';
import ConfirmAccount from '../../pages/ConfirmAccount/ConfirmAccount';
import ConfirmInvite from '../../pages/ConfirmInvite/ConfirmInvite';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import MyTrips from '../../pages/MyTrips/MyTrips';
import MyTrip from '../../pages/MyTrip/MyTrip';
import NewTrip from '../../pages/NewTrip/NewTrip';
import NewProposition from '../../pages/NewProposition/NewProposition';
import NewPassword from '../../pages/NewPassword/NewPassword';
import EditTrip from '../../pages/EditTrip/EditTrip';
import EditProposition from '../../pages/EditProposition/EditProposition';
import EditProfil from '../../pages/EditProfil/EditProfil';
import EditPassword from '../../pages/EditPassword/EditPassword';
import About from '../../pages/About/About';
import Contact from '../../pages/Contact/Contact';
import Terms from '../../pages/Terms/Terms';
import Error from '../../pages/Error/Error';
import FlashMessage from '../FlashMessage/FlashMessage';
import './App.scss';

function App() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const flashMessage = useAppSelector((state) => state.flashMessage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    // Simuler une attente (par exemple, un appel API) avec setTimeout
    setTimeout(() => {
      setLoading(false); // Stopper le chargement après 3 secondes
    }, 2000);
  }, []); // L'effet ne se déclenche qu'une fois (comme componentDidMount)

  if (loading) {
    return <Loading />;
  }
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
        <Route path="*" element={<Error />} />

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
          path="/new-password"
          element={
            <PrivateRoute>
              <NewPassword />
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
          path="/edit-proposition/:idTrip/:idLink"
          element={
            <PrivateRoute>
              <EditProposition />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
      {flashMessage.message && <FlashMessage />}
    </div>
  );
}

export default App;
