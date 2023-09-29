import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loading from './Loading';

import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';

import Home from '../../pages/Home/Home';
import SignInUp from '../../pages/SignInUp/SignInUp';
import Profil from '../../pages/Profil/Profil';
import NewTrip from '../../pages/NewTrip/NewTrip';
import MyTrips from '../../pages/MyTrips/MyTrips';
import OneTrip from '../../pages/OneTrip/OneTrip';
import NewProposition from '../../pages/NewProposition/NewProposition';
import About from '../../pages/About/About';
import Contact from '../../pages/Contact/Contact';
import Terms from '../../pages/Terms/Terms';
import Error from '../../pages/Error/Error';
import ConfirmAccount from '../../pages/ConfirmAccount/ConfirmAccount';
import EditTrip from '../../pages/EditTrip/EditTrip';
import NewPassword from '../../pages/NewPassword/NewPassword';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import './App.scss';

function App() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

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
        <Route path="/" element={<Home />} />
        <Route path="/signin-signup" element={<SignInUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<Error />} />
        <Route
          path="/profil"
          element={
            <PrivateRoute>
              <Profil />
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
          path="/edit-trip"
          element={
            <PrivateRoute>
              <EditTrip />
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
              <OneTrip />
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
          path="/confirm-account"
          element={
            <PrivateRoute>
              <ConfirmAccount />
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
