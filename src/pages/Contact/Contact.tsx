// Import React
import { FormEvent, useState } from 'react';
// Import taost from React-Toastify
import { toast } from 'react-toastify';
// Import Axios
import axiosInstance from '../../utils/axios';
// Import Layout & Components
import Main from '../../layout/Main/Main';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import TextareaField from '../../components/TextareaField/TextareaField';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
// Import Image
import sendmessage from '../../assets/images/sendmessage.png';
// Import Style
import './Contact.scss';

function Contact() {
  // Declaration state variables
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading indicator

  // Event handler on the contact form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Set the loading button pending
    setIsLoading(true);
    // Get the current from
    const form = event.currentTarget;
    // Create a FormData Object
    const formData = new FormData(form);
    // Convert a JSON object
    const jsonData = Object.fromEntries(formData.entries());

    // Clear all Error Messages
    setErrorMessage(null);

    // Check if one field is empty and set an errorMessage
    if (!jsonData.name || !jsonData.email || !jsonData.message) {
      setErrorMessage('Veuillez renseigner tous les champs.');
      return;
    }

    // Send a POST request to invite a member with his email
    await axiosInstance
      .post('/contact', jsonData)
      .then(() => {
        setIsLoading(false);
        toast.success('Le message a bien été envoyé !');
      })
      .catch(() => {
        setIsLoading(false);
        toast.error(
          "Le message n'a pas pu être envoyé, veuillez réessayer plus tard."
        );
      });
  };

  return (
    <Main>
      <section className="contact-container">
        <div className="contact-overview-page">
          <div className="contact-image-container">
            <img
              src={sendmessage}
              className="contact-image"
              alt="Send message to contact O'Journey"
              width="150"
              height="150"
              loading="lazy"
            />
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h1 className="contact-title">Nous contacter</h1>
            {/* Error Message */}
            {errorMessage && <ErrorMessage text={errorMessage} />}
            {/* Input Name */}
            <InputField
              name="name"
              label="Nom"
              placeholder="Votre nom"
              type="text"
              icon="fa-solid fa-user"
              maxlength={100}
            />
            {/* Input Email */}
            <InputField
              name="email"
              label="E-mail"
              placeholder="Votre e-mail"
              type="email"
              icon="fa-solid fa-at"
              maxlength={320}
            />
            {/* Textarea Message */}
            <TextareaField
              name="message"
              label="Message"
              placeholder="Votre message"
              icon="fa-solid fa-pen-nib"
              maxlength={500}
            />
            {/* Submit Button */}
            <Button
              text="Envoyer"
              type="submit"
              isLoading={isLoading}
              customClass="color button-style--width"
            />
          </form>
        </div>
      </section>
    </Main>
  );
}

export default Contact;
