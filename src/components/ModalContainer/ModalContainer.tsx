import './ModalContainer.scss';

interface ModalContainerProps {
  handleClose: () => void;
  customClass: string;
  children: React.ReactNode;
}

function ModalContainer({ handleClose, customClass, children }: ModalContainerProps) {
  return (
    <div className={`modal-background ${customClass}`}>
      <div className="modal-container">
        {children}
        <button
          type="button"
          className="modal-confirm-close-btn"
          onClick={handleClose}
        >
          <i className="modal-confirm-close-btn-icon fa-solid fa-xmark" />
        </button>
      </div>
    </div>
  );
}

export default ModalContainer;
