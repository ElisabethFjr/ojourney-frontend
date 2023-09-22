import { Link } from 'react-router-dom';

import './ButtonOutline.scss';

interface ButtonOutlineProps {
  text: string;
  to: string;
}

function ButtonOutline({ text, to }: ButtonOutlineProps) {
  return (
    <button className="button--outline" type="button">
      <{to} className="button--outline-link">
        {text}
      </Link>
    </button>
  );
}

export default ButtonOutline;
