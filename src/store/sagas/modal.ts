import { fork, all, delay, put, takeLeading } from 'redux-saga/effects';
import { SHOW_MODAL, CLOSE_MODAL } from 'store/actions/action';

export function* showModal() {
  yield delay(3400);
  yield put({
    type: CLOSE_MODAL,
  });
}

function* watchModal() {
  yield takeLeading(SHOW_MODAL, showModal);
}

export default function* modalSaga() {
  yield all([fork(watchModal)]);
}
