import './ErrorMessage.scss';

interface ErrorMessageProps {
  icon: string;
  text: string;
}

function ErrorMessage({ icon, text }: ErrorMessageProps) {
  return (
    <div className="error-message-container">
      <i className={`error-message-icon ${icon}`} />
      <p className="error-message-text">{text}</p>
    </div>
  );
}

export default ErrorMessage;
