import './ButtonIcon.scss';

interface ButtonIconProps {
  icon: string;
  handleClick: () => void;
}

function ButtonIcon({ icon, handleClick }: ButtonIconProps) {
  return (
    <button className="button-icon" type="button" onClick={handleClick}>
      <i className={`button-icon--i ${icon}`} />
    </button>
  );
}

export default ButtonIcon;
