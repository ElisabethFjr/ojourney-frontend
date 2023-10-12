// Import Layout & Components
import Main from '../../layout/Main/Main';
import FormContainer from '../../layout/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import TextareaField from '../../components/TextareaField/TextareaField';
import sendmessage from '../../assets/images/sendmessage.png';

// Import Style
import './Contact.scss';

function Contact() {
  return (
    <Main>
      <section className="contact-container">
        <div className="contact-overview-page">
          <div className="contact-image-container">
            <img
              src={sendmessage}
              className="contact-image"
              alt="Send message to contact O'Journey"
            />
          </div>

          <form className="contact-form">
            <h1 className="modal-title">Nous contacter</h1>
            {/* Input Name */}
            <InputField
              name="name"
              placeholder="Votre nom"
              type="text"
              icon="fa-solid fa-user"
              maxlength={100}
            />
            {/* Input Email */}
            <InputField
              name="email"
              placeholder="Votre e-mail"
              type="email"
              icon="fa-solid fa-at"
              maxlength={320}
            />
            {/* Textarea Message */}
            <TextareaField
              name="message"
              placeholder="Votre message"
              icon="fa-solid fa-pen-nib"
              maxlength={500}
            />
            {/* Submit Button */}
            <Button
              text="Envoyer"
              type="submit"
              customClass="color button-style--width"
              arial-label="Envoiez votre formulaire de contact"
            />
          </form>
        </div>
      </section>
    </Main>
  );
}

export default Contact;
