import './FormContainer.scss';

interface FormContainerProps {
  children: React.ReactNode;
}

function FormContainer({ children }: FormContainerProps) {
  return <div className="form-container">{children}</div>;
}

export default FormContainer;
