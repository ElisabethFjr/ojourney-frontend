import { Route, Routes } from 'react-router-dom';

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

import './App.scss';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signInSignUp" element={<SignInUp />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/newTrip" element={<NewTrip />} />
        <Route path="/myTrips" element={<MyTrips />} />
        <Route path="/myTrip" element={<OneTrip />} />
        <Route path="/new-proposition" element={<NewProposition />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
