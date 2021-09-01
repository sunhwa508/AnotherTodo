import { fork, all, delay, put, throttle } from 'redux-saga/effects';
import { SHOW_TOAST, CLOSE_TOAST } from 'store/actions/action';

export function* showToast() {
  yield delay(3000);
  yield put({
    type: CLOSE_TOAST,
  });
}

/**
 * 반복 클릭 방지
 * 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 함
 */
function* watchToast() {
  yield throttle(3000, SHOW_TOAST, showToast);
}

export default function* toastSaga() {
  yield all([fork(watchToast)]);
}
