import { useState } from 'react';
import Button from '../Button/Button';

import "./ModalConfirmEmail.scss";

function ModalConfirmEmail() {

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return(

    <section className="modal-confirm-email-container">
      <h1 className="modal-confirm-email-title">
        O'journey respecte votre vie privée 
      </h1>
      <p className="modal-confirm-email-paragraph">
    </p>

      <div className="modal-confirm-email--button">
              <Button text="Accepter" 
              type="submit" 
              customClass="color" />
              <Button
              text="Refuser"
              type="button"
              customClass="outline-dark"
              onClick={handleClose}
            />
            </div>
    </section>



  )

};

export default ModalConsentCookie;
