import { AnyAction } from 'redux';
import * as TYPES from 'store/actions/action';
import produce from 'immer';
import { ITodo } from 'utils/types';

const INITIAL_STATE = {
  showModal: false,
  data: null,
};

export interface InitialModalProps {
  showModal: boolean;
  data: ITodo;
}

export default function toastReducer(state = INITIAL_STATE, action: AnyAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case TYPES.SHOW_MODAL:
        draft.showModal = true;
        draft.data = action.data;
        break;
      case TYPES.CLOSE_MODAL:
        draft.showModal = false;
        break;
      default:
        return state;
    }
  });
}
