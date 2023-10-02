import userReducer from './user';
import flashMessageReducer from './flashMessage';

const reducer = {
  user: userReducer,
  flashMessage: flashMessageReducer,
};

export default reducer;
