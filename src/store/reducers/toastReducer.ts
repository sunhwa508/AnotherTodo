import { AnyAction } from 'redux';
import { SHOW_TOAST, CLOSE_TOAST } from 'store/actions/action';

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
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        showToast: true,
        desc: action.data.desc,
        title: action.data.title,
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
