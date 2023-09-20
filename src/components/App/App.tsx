import { Route, Routes } from 'react-router-dom';

import Header from '../../layout/Header/Header';
import Home from '../../pages/Home/Home';
import SignInUp from '../../pages/SignInUp/SignInUp';
import Footer from '../../layout/Footer/Footer';
import './App.scss';
import Profil from '../../pages/Profil/Profil';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signInSignUp" element={<SignInUp />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
