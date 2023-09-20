import { Link } from 'react-router-dom';

import './Home.scss';

function Home() {
  return (
    <main className="main home">
      <h1>Voici notre site O&apos;journey</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis tempora
        neque tenetur nostrum fugit cupiditate consequuntur odit dignissimos
        reprehenderit, doloremque aliquam deserunt voluptas aliquid in possimus
        unde iure facere impedit.
      </p>
      <button type="button">
        <Link to="/SignInSignUp">S&apos;inscrire/Se connecter</Link>
      </button>
    </main>
  );
}

export default Home;
