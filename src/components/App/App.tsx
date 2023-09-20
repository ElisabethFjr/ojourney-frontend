import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from '../../layout/Header/Header';
import Home from '../../pages/Home/Home';
import SignInUp from '../../pages/SignInUp/SignInUp';
import Footer from '../../layout/Footer/Footer';
import './App.scss';

function App() {
  const location = useLocation();

  const [homePageStyle, setHomePageStyle] = useState<boolean>(false);

  useEffect(() => {
    setHomePageStyle(location.pathname === '/');
  }, [location.pathname]);

  return (
    <div className="app-container">
      <Header homePageStyle={homePageStyle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signInSignUp" element={<SignInUp />} />
      </Routes>
      <Footer homePageStyle={homePageStyle} />
    </div>
  );
}

export default App;
