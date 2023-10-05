import './ModalContainer.scss';

interface ModalContainerProps {
  handleClose: () => void;
  children: React.ReactNode;
}

function ModalContainer({ handleClose, children }: ModalContainerProps) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        {children}
        <button type="button" className="modal-close-btn" onClick={handleClose}>
          <i className="modal-close-btn-icon fa-solid fa-xmark" />
        </button>
      </div>
    </div>
  );
}

export default ModalContainer;
