import './ButtonSubmit.scss';

export interface ButtonSubmitProps {
  text: string;
  icon?: string;
}

function ButtonSubmit({ text, icon }: ButtonSubmitProps) {
  return (
    <button className="form-submit-button button--submit " type="submit">
      {icon && <i className={icon} />}
      {text}
    </button>
  );
}

export default ButtonSubmit;
