import { all, fork } from 'redux-saga/effects';

import todosSaga from './todo';
import toastSaga from './toast';

export default function* rootSaga() {
  yield all([fork(todosSaga), fork(toastSaga)]);
}
