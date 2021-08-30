import { combineReducers } from 'redux';

import todoReducer from './todoReducer';
import toastReducer from './toastReducer';

export default combineReducers({
  todoReducer,
  toastReducer,
});
