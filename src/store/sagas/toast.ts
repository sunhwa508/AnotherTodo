import { fork, all, delay, put, takeLatest } from 'redux-saga/effects';
import { SHOW_TOAST, CLOSE_TOAST } from 'store/actions/action';

export function* showToast() {
  yield delay(5000);
  yield put({
    type: CLOSE_TOAST,
  });
}

function* watchToast() {
  yield takeLatest(SHOW_TOAST, showToast);
}

export default function* toastSaga() {
  yield all([fork(watchToast)]);
}
