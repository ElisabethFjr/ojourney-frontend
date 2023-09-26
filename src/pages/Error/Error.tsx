import road from '../../assets/images/road.png';

import './Error.scss';

function Error() {
  return (
    <main className="error">
      <h1 className="error-title">Erreur 404</h1>
      <p className="error-message">
        Whoops ! Il semblerait que cette page soit partie en vacances.
      </p>

      <img
        className="error-image"
        src={road}
        alt="O'Journey road sticker orange yellow error 404"
      />
    </main>
  );
}

export default Error;
