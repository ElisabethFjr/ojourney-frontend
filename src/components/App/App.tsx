import { Route, Routes } from 'react-router-dom';

import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';

import Home from '../../pages/Home/Home';
import SignInUp from '../../pages/SignInUp/SignInUp';
import CreateTrip from '../../pages/CreateTrip/CreateTrip';
import MyTrips from '../../pages/MyTrips/MyTrips';
import Profil from '../../pages/Profil/Profil';
import OneTrip from '../../pages/OneTrip/OneTrip';

import './App.scss';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signInSignUp" element={<SignInUp />} />
        <Route path="/createTrip" element={<CreateTrip />} />
        <Route path="/myTrips" element={<MyTrips />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/myTrip" element={<OneTrip />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
