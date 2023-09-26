import './ButtonDanger.scss';

interface ButtonDangerProps {
  text: string;
}

function ButtonDanger({ text }: ButtonDangerProps) {
  return (
    <button className="button--danger" type="button">
      {text}
    </button>
  );
}

export default ButtonDanger;
