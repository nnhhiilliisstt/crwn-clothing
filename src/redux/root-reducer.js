import { combineReducers } from 'redux';

import userReducer from '../redux/user/user-reducer';

import cardReducer from '../redux/cart/cart.reducer';

export default combineReducers({
  user: userReducer,
  cart: cardReducer,
});
