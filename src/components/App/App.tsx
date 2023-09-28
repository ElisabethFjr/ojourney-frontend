import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import Loading from './Loading';

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
        <Route path="/profil" element={<Profil />} />
        <Route path="/new-trip" element={<NewTrip />} />
        <Route path="/edit-trip" element={<EditTrip />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/my-trip/:id" element={<OneTrip />} />
        <Route path="/new-proposition/:id" element={<NewProposition />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/confirm-account" element={<ConfirmAccount />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
