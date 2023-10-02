import { ToastContainer, toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/redux';
import { useDispatch } from 'react-redux';
import { resetFlashMessage } from '../../store/reducers/flashMessage';

import 'react-toastify/dist/ReactToastify.css';

import './FlashMessage.scss';

function FlashMessage() {
  const dispatch = useDispatch();

  const flashMessage = useAppSelector((state) => state.flashMessage);

  const notifySuccess = () =>
  toast.success(flashMessage.message || 'Wow so easy!', {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

  const notifyError = () =>
    toast.error(flashMessage.message || 'Something went wrong!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

    setTimeout(() => {
      dispatch(resetFlashMessage());
    }, 5000);

  return (
    <div>
    <ToastContainer />
    {flashMessage.message && (flashMessage.isSuccess ? notifySuccess() : notifyError())}
  </div>
  );
}

export default FlashMessage;
