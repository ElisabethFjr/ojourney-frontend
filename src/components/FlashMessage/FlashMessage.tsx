import './FlashMessage.scss';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FlashMessage() {
  const notify = () =>
    toast.success(' Wow so easy!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  return (
    <div>
      <button type="button" onClick={notify}>
        Notify!
      </button>
      <ToastContainer />
    </div>
  );
}

export default FlashMessage;
