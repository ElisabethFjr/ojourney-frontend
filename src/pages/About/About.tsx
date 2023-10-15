// Import Images
import michel from '../../assets/images/DeveloperMan1.png';
import brice from '../../assets/images/DeveloperMan2.png';
import megane from '../../assets/images/DeveloperWoman1.png';
import lucie from '../../assets/images/DeveloperWoman2.png';
import eli from '../../assets/images/DevelopperWoman3.png';

// Import styles
import './About.scss';

function About() {
  return (
    <main className="about-main">
      <h1 className="main-title">Notre équipe</h1>
      <section className="about-container">
        <article className="about-card">
          <img
            className="about-image"
            src={michel}
            alt="Michel, développeur frontend."
          />
          <h2 className="about-name">COLACINO Michel</h2>
          <p className="about-role">Front Dev</p>
          <p className="about-role">Scrum Master</p>
        </article>
        <article className="about-card">
          <img
            className="about-image"
            src={brice}
            alt="Brice, développeur backend."
          />
          <h2 className="about-name">FRYDMAN Brice</h2>
          <p className="about-role">Back Dev</p>
          <p className="about-role">Référent Technos</p>
        </article>
        <article className="about-card">
          <img
            className="about-image"
            src={megane}
            alt="Mégane, développeuse frontend."
          />
          <h2 className="about-name">DE AMORIN Mégane</h2>
          <p className="about-role">Front Dev</p>
          <p className="about-role">Reférent Git</p>
        </article>
        <article className="about-card">
          <img
            className="about-image"
            src={lucie}
            alt="Lucie, développeuse backend."
          />
          <h2 className="about-name">BAROILLER Lucie</h2>
          <p className="about-role">Lead Back Dev</p>
        </article>
        <article className="about-card">
          <img
            className="about-image"
            src={eli}
            alt="Eli, développeuse frontend."
          />
          <h2 className="about-name">FAUJOUR Elisabeth</h2>
          <p className="about-role">Lead Front Dev</p>
          <p className="about-role">Product Owner</p>
        </article>
      </section>
    </main>
  );
}

export default About;
