import { Route, Routes } from 'react-router-dom';

import Header from '../../layout/Header/Header';
import Home from '../../pages/Home/Home';
import SignInUp from '../../pages/SignInUp/SignInUp';
import CreateTrip from '../../pages/CreateTrip/CreateTrip';
import Footer from '../../layout/Footer/Footer';

import './App.scss';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signInSignUp" element={<SignInUp />} />
        <Route path="/createTrip" element={<CreateTrip />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
