import { all, fork } from 'redux-saga/effects';

import todosSaga from './todo';
import toastSaga from './toast';

// rootSaga를 만들고 우리가 하고싶은 비동기 함수들을 넣어준다.
export default function* rootSaga() {
  yield all([fork(todosSaga), fork(toastSaga)]);
}
