// Import Layout
import Main from '../../layout/Main/Main';

// Import styles
import './About.scss';

function About() {
  return (
    <main className="about-main">
      <h1 className="main-title">Notre équipe</h1>
      <section className="about-container">
        <article className="about-card">
          <img className="about-image" src="" alt="" />
          <h2 className="about-name">FAUJOUR Elisabeth</h2>
          <p className="about-role">Product Owner - Lead Front Dev</p>
        </article>
        <article className="about-card">
          <img className="about-image" src="" alt="" />
          <h2 className="about-name">COLACINO Michel</h2>
          <p className="about-role">Scrum Master - Front Dev</p>
        </article>
        <article className="about-card">
          <img className="about-image" src="" alt="" />
          <h2 className="about-name">DE AMORIN Mégane</h2>
          <p className="about-role">Reférent Git - Front Dev</p>
        </article>
        <article className="about-card">
          <img className="about-image" src="" alt="" />
          <h2 className="about-name">FRYDMAN Brice</h2>
          <p className="about-role">Reférent Technos - Back Dev</p>
        </article>
        <article className="about-card">
          <img className="about-image" src="" alt="" />
          <h2 className="about-name">BAROILLER Lucie</h2>
          <p className="about-role">Lead Back Dev</p>
        </article>
      </section>
    </main>
  );
}

export default About;