import { AnyAction } from 'redux';
import { SHOW_TOAST, CLOSE_TOAST } from 'store/actions/action';

const INITIAL_STATE = {
  showToast: false,
};

export interface InitialToastProps {
  showToast: boolean;
  desc: string;
}

export default function toastReducer(state = INITIAL_STATE, action: AnyAction) {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        showToast: true,
        desc: action.data,
      };
    case CLOSE_TOAST:
      return {
        ...state,
        showToast: false,
      };
    default:
      return state;
  }
}
