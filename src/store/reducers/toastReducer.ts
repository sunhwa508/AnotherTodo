import { AnyAction } from 'redux';
import * as TYPES from 'store/actions/action';
import produce from 'immer';

const INITIAL_STATE = {
  showToast: false,
  title: '',
  desc: '',
};

export interface InitialToastProps {
  showToast: boolean;
  title: string;
  desc: string;
}

export default function toastReducer(state = INITIAL_STATE, action: AnyAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case TYPES.SHOW_TOAST:
        draft.showToast = true;
        draft.desc = action.data.desc;
        draft.title = action.data.title;
        break;
      case TYPES.CLOSE_TOAST:
        draft.showToast = false;
        break;
      default:
        return state;
    }
  });
}
