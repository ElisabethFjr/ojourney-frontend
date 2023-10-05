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
        Email </h1>
    </section>



  )

};

export default ModalConfirmEmail;
