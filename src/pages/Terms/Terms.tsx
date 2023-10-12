// Import Layout
import Main from '../../layout/Main/Main';

// Import Styles
import './Terms.scss';

function Terms() {
  return (
    <Main>
      <h1 className="main-title">Mentions Légales</h1>
      <p className="terms-date">01 Octobre 2023</p>
      <section className="terms-container">
        <h2 className="terms-subtitle">Éditeur du site</h2>
        <p className="terms-text">
          Le site web O&apos;Journey est édité par une équipe de développeur
          dans le cadre d&apos;une formation avec la société O&apos;Clock dont
          le siège social est situé au 10 rue de Penthievre à Paris (75008) et
          immatriculée sous le numéro 818 614 588 au RCS de Paris. L&apos;équipe
          est composée des membres suivants : COLACINO Michel, DE AMORIN Mégane,
          FRYDMAN Brice, BAROILLER Lucie et FAUJOUR Elisabeth.
        </p>
      </section>
      <section className="terms-container">
        <h2 className="terms-subtitle">Adresse de courrier électronique</h2>
        <p className="terms-text">ojourney.website@gmail.com</p>
      </section>
      <section className="terms-container">
        <h2 className="terms-subtitle">Hébergement du site</h2>
        <p className="terms-text">
          Le site O&apos;Journey est hébergé par ..., une société ... dont le
          siège social est situé à ....
        </p>
      </section>
      <section className="terms-container">
        <h2 className="terms-subtitle">Traitement des données personnelles</h2>
        <p className="terms-text">
          O&apos;Journey s&apos;engage à protéger la confidentialité de vos
          données personnelles. Les informations que vous nous fournissez lors
          de l&apos;utilisation de notre site sont traitées conformément aux
          normes de confidentialité en vigueur, dans le but de garantir la
          sécurité et la confidentialité de ces données.
        </p>
      </section>
      <section className="terms-container">
        <h2 className="terms-subtitle">Cookies</h2>
        <p className="terms-text">
          Le site web O&apos;Journey peut utiliser des cookies pour améliorer
          l&apos;expérience de l&apos;utilisateur. Nous sommes engagés à
          respecter votre vie privée et à minimiser l&apos;impact des cookies
          sur votre navigation. Si vous avez des préoccupations ou des questions
          concernant l&apos;utilisation des cookies sur notre site, veuillez
          nous contacter à l&apos;adresse e-mail suivante :
        </p>
      </section>
    </Main>
  );
}

export default Terms;
