import { fork, all, delay, put, takeLeading } from 'redux-saga/effects';
import { SHOW_TOAST, CLOSE_TOAST } from 'store/actions/action';

export function* showToast() {
  yield delay(5000);
  yield put({
    type: CLOSE_TOAST,
  });
}

// 반복클릭방지
function* watchToast() {
  yield takeLeading(SHOW_TOAST, showToast);
}

export default function* toastSaga() {
  yield all([fork(watchToast)]);
}
