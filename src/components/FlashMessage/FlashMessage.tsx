import './FlashMessage.scss';

export interface Flash {
  type: 'success' | 'error';
  children: React.ReactNode;
  duration?: number; // optionnel
}

function FlashMessage({ type, duration, children }: Flash) {
  return (
    <div
      className={`flash flash--${type}`}
      style={{ animationDuration: `${duration ?? 3000}ms` }}
    >
      {children}
    </div>
  );
}

export default FlashMessage;
