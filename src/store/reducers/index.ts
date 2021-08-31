import { combineReducers } from 'redux';

import todoReducer, { InitialTodosProps } from './todoReducer';
import toastReducer, { InitialToastProps } from './toastReducer';
import modalReducer, { InitialModalProps } from './modalReducer';

export interface IrootType {
  todoReducer: InitialTodosProps;
  toastReducer: InitialToastProps;
  modalReducer: InitialModalProps;
}

export default combineReducers({
  todoReducer,
  toastReducer,
  modalReducer,
});
