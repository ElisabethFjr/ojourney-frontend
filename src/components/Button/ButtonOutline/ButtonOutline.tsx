import { Link } from 'react-router-dom';

import './ButtonOutline.scss';

export interface ButtonOutlineProps {
  text: string;
  to: string;
  icon?: string;
}

function ButtonOutline({ text, to, icon }: ButtonOutlineProps) {
  return (
    <button className="button--outline" type="button">
      <Link to={to} className="button--outline-link">
        <i className={icon} />
        {text}
      </Link>
    </button>
  );
}

export default ButtonOutline;
