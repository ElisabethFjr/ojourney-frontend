import { Link } from 'react-router-dom';

import './ButtonColor.scss';

export interface ButtonColorProps {
  text: string;
  to: string;
  icon?: string;
}

function ButtonColor({ text, to, icon }: ButtonColorProps) {
  return (
    <button className="button--color" type="button">
      <Link to={to} className="button--color-link">
        {icon && <i className={icon} />}
        {text}
      </Link>
    </button>
  );
}

export default ButtonColor;
