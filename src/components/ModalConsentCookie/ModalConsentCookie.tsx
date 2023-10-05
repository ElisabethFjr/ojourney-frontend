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
      Nous et certains partenaires tiers UE et hors UE (y compris Fournisseurs certifiés IAB) utilisons des cookies et d’autres technologies de suivi similaires à des fins techniques et, avec votre consentement, à d’autres fins (y compris le marketing et la publicité personnalisée) comme spécifié dans notre Politique des cookies. En ce qui concerne la publicité, nous-même et les tiers que nous avons sélectionnés pouvons utiliser des données de géolocalisation précises et analyser activement les caractéristiques de votre appareil à des fins d’identification, afin de stocker et/ou d’accéder à des informations sur l’appareil et de traiter des données à caractère personnel comme par exemple vos données d’utilisation pour les fins publicitaires suivantes : publicités et contenus personnalisés, mesures liées aux publicités et aux contenus, renseignements concernant l’audience et développement de produits. Vous pouvez à tout moment donner, refuser ou retirer votre consentement, y compris en ce qui concerne le transfert de données dans les pays hors UE, en accédant au panneau « Gérer les cookies » ou en cliquant sur « Tout refuser » pour poursuivre sans les cookies non essentiels. Si vous consentez à leur utilisation (y compris au transfert de données hors UE) conformément à notre politique en matière de cookies, et souhaitez continuer, veuillez cliquer sur « Accepter tout »
      </p>

      <div className="modal-consent-cookie-button">
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
            </div>
    </section>



  )

};

export default ModalConsentCookie;
