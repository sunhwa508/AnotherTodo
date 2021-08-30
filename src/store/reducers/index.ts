import { combineReducers } from 'redux';

import todoReducer, { InitialTodosProps } from './todoReducer';
import toastReducer, { InitialToastProps } from './toastReducer';

export interface IrootType {
  todoReducer: InitialTodosProps;
  toastReducer: InitialToastProps;
}

export default combineReducers({
  todoReducer,
  toastReducer,
});
