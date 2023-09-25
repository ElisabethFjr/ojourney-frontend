import './FlashMessage.scss';

export interface Flash {
  type: 'success' | 'error';
  text: string;
  duration?: number; // optionnel
}

function FlashMessage({ type, duration, text }: Flash) {
  return (
    <div
      className={`flash flash--${type}`}
      style={{ animationDuration: `${duration ?? 3000}ms` }}
    >
      <p className="flash-message">{text}</p>
    </div>
  );
}

export default FlashMessage;
