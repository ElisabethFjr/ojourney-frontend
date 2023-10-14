import './ErrorMessage.scss';

interface ErrorMessageProps {
  text: string;
}

function ErrorMessage({ text }: ErrorMessageProps) {
  return (
    <div className="error-message-container">
      <i className="error-message-icon fa-solid fa-circle-exclamation" />
      <p className="error-message-text">{text}</p>
    </div>
  );
}

export default ErrorMessage;
