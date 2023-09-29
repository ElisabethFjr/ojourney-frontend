import Main from '../../layout/Main/Main';

import './Contact.scss';

import ModalConfirmMessage from '../../components/ModalConfirmMessage/ModalConfirmMessage';

function Contact() {
  return (
    <Main>
      <ModalConfirmMessage />
      <h1 className="main-title">Nous contacter</h1>
    </Main>
  );
}

export default Contact;
