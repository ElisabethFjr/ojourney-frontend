// Import Image
import road from '../../assets/images/road.png';

// Import Styles
import './ErrorNotFound.scss';

function ErrorNotFound() {
  return (
    <main className="error">
      <h1 className="error-title">Erreur 404</h1>
      <p className="error-message">
        Whoops ! Il semblerait que cette page soit partie en vacances.
      </p>

      <img
        className="error-image"
        src={road}
        alt="Autocollant de route O'Journey orange jaune erreur 404"
        width="180"
        height="180"
        loading="lazy"
      />
    </main>
  );
}

export default ErrorNotFound;
