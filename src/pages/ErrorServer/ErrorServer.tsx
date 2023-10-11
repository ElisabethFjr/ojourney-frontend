// Import Image
import road from '../../assets/images/road.png';

// Import Styles
import './ErrorServer.scss';

function ErrorServer() {
  return (
    <main className="error">
      <h1 className="error-title">Erreur 500</h1>
      <p className="error-message">
        Whoops ! Notre serveur a décidé de faire ses valises pour une
        destination inconnue. Merci de bien vouloir patienter jusqu&apos;à son
        retour.
      </p>
      <img
        className="error-image"
        src={road}
        alt="O'Journey road sticker orange yellow error server 500"
      />
    </main>
  );
}

export default ErrorServer;
