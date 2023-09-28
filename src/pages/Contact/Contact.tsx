import Main from '../../layout/Main/Main';

import './Contact.scss';

import ChangePassword from '../../components/ModalChangePassword/ModalChangePassword';

function Contact() {
  return (
    <Main>
      <ChangePassword />
      <h1 className="main-title">Nous contacter</h1>
    </Main>
  );
}

export default Contact;
