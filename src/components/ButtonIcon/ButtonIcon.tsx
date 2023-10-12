import './ButtonIcon.scss';

export interface ButtonIconProps {
  icon: string;
  handleClick: () => void;
  customClass?: string;
  buttonIcon: string;
}

function ButtonIcon({ icon, handleClick, customClass }: ButtonIconProps) {
  return (
    <button
      className={`button-icon button-icon--${customClass || ''}`}
      type="button"
      onClick={handleClick}
    >
      <i className={`button-icon--i ${icon}`} />
    </button>
  );
}

export default ButtonIcon;
