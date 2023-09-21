import { Link } from 'react-router-dom';

import './ButtonColor.scss';

interface ButtonColorProps {
  text: string;
  to?: string;
}

function ButtonColor({ text, to }: ButtonColorProps) {
  return (
    <button className="button--color" type="button">
      {to ? (
        <Link to={to} className="button--color-link">
          {text}
        </Link>
      ) : (
        { text }
      )}
    </button>
  );
}

export default ButtonColor;
