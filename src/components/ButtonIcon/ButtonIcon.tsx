import './ButtonIcon.scss';

export interface ButtonIconProps {
  icon: string;
  handleClick: () => void;
  customClass?: string;
  ariaLabel?: string;
  title?: string;
}

function ButtonIcon({
  icon,
  handleClick,
  customClass,
  ariaLabel,
  title,
}: ButtonIconProps) {
  return (
    <button
      className={`button-icon button-icon--${customClass || ''}`}
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      title={title}
    >
      <i className={`button-icon--i ${icon}`} />
    </button>
  );
}

export default ButtonIcon;
