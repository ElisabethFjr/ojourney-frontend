import Main from '../../layout/Main/Main';

import './Contact.scss';

import ChangePassword from '../../components/ModalInviteMember/ModalInviteMember';

function Contact() {
  return (
    <Main>
      <InviteMember />
      <h1 className="main-title">Nous contacter</h1>
    </Main>
  );
}

export default Contact;
