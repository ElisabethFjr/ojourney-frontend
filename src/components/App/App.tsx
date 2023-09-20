import Header from '../../layout/Header/Header';
import SignInUp from '../../pages/SignInUp/SignInUp';
import Footer from '../../layout/Footer/Footer';
import './App.scss';

function App() {
  return (
    <div className="app-container">
      <Header />
      {/* Composant Header */}
      {/* Routes */}
      <SignInUp />
      {/* Composant Footer */}
      <Footer />
    </div>
  );
}

export default App;
