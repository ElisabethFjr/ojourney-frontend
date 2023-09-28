import './Button.scss';

export interface ButtonProps {
  text: string;
  customClass: string;
  type?: 'submit' | 'reset' | 'button';
  icon?: string;
  onClick?: () => void;
}

function Button({
  text,
  customClass,
  icon,
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      className={`button-style button-style--${customClass || ''}`}
      type={type}
      onClick={onClick}
    >
      {icon && <i className={icon} />}
      {text}
    </button>
  );
}

export default Button;
