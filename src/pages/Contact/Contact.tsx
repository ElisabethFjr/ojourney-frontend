import Main from '../../layout/Main/Main';

import FormContainer from '../../components/FormContainer/FormContainer';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import TextareaField from '../../components/TextareaField/TextareaField';


import './Contact.scss';

function Contact() {
  return (
    <Main>
      <section className="contact-container">
  <FormContainer>
    <form>
      <h1 className="contact-title">Nous contacter</h1>

      <InputField
              name="name"
              placeholder="Votre nom"
              type="text"
              icon="fa-solid fa-user"
            />

<InputField
              name="email"
              placeholder="Votre e-mail"
              type="email"
              icon="fa-solid fa-at"
            />

<TextareaField
              name="message"
              placeholder="Votre message"
              icon="fa-solid fa-pen-nib"
              maxlength={200}
           />

<Button
              text="Envoyer"
              type="submit" 
              customClass="color button-style--width"
            />
</form>
</FormContainer>
      </section>
    </Main>
  );
}

export default Contact;
