import { useState, useEffect } from 'react';
import './FlashMessage.scss';

export interface Flash {
  type: 'success' | 'error';
  text: string;
  duration?: number; // optionnel
}

function FlashMessage({ type, duration = 3000, text }: Flash) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    // Cleanup on component unmount
    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  if (!isVisible) {
    return null; // Si le message n'est pas visible, ne renvoyez rien.
  }

  console.log('Flash message render');

  return (
    <div
      className={`flash flash--${type}`}
      style={{ animationDuration: `${duration}ms` }}
    >
      <p className="flash-message">{text}</p>
    </div>
  );
}

export default FlashMessage;
