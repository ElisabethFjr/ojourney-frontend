import { useState } from 'react';
import Button from '../Button/Button';

import "./ModalConsentCookie.scss";

function ModalConsentCookie() {

  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  return(

    <section className="modal-consent-cookie-container">
      <div className="modal-consent-cookie-background">
      <h1 className="cmodal-onsent-cookie-title">
        O'journey respecte votre vie privée 
      </h1>
      <p className="modal-consent-cookie-paragraph">
      Notre site utilise des cookies pour améliorer votre expérience de 
      navigation. En continuant à utiliser notre site, vous acceptez notre 
      utilisation de cookies conformément à notre politique de confidentialité.
      </p>

      <div className="modal-consent-cookie-button">
              <Button
                text="Paramétrer les cookies"
                type="button"
                customClass="outline-dark"
              />
              <Button text="Tout accepter" 
              type="submit" 
              customClass="color" />
              <Button
              text="Annuler"
              type="button"
              customClass="outline-dark"
              onClick={handleClose}
            />
            </div>
            </div>
    </section>



  )

};

export default ModalConsentCookie;
