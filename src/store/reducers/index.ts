import tripReducer from './trip';
import userReducer from './user';

const reducer = {
  user: userReducer,
  trip: tripReducer,
};

export default reducer;
