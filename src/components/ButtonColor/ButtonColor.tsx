import { Link } from 'react-router-dom';

import './ButtonColor.scss';

export interface ButtonColorProps {
  text: string;
  to: string;
}

function ButtonColor({ text, to }: ButtonColorProps) {
  return (
    <button className="button--color" type="button">
      <Link to={to} className="button--color-link">
        {text}
      </Link>
    </button>
  );
}

export default ButtonColor;
