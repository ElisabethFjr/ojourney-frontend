import LoadingButton from '../LoadingButton/LoadingButton';

import './Button.scss';

export interface ButtonProps {
  text: string;
  customClass: string;
  type?: 'submit' | 'reset' | 'button';
  icon?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

function Button({
  text,
  customClass,
  icon,
  onClick,
  isLoading,
  type = 'button',
}: ButtonProps) {
  console.log('isLOadding', isLoading);
  return (
    <button
      className={`button-style button-style--${customClass || ''}`}
      type={type}
      onClick={onClick}
    >
      {icon && <i className={icon} />}
      {isLoading ? <LoadingButton /> : text}
    </button>
  );
}

export default Button;
