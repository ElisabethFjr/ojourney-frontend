import './ButtonSubmit.scss';

interface ButtonSubmitProps {
  text: string;
}

function ButtonSubmit({ text }: ButtonSubmitProps) {
  return (
    <button className="form-submit-button button--submit " type="submit">
      {text}
    </button>
  );
}

export default ButtonSubmit;
