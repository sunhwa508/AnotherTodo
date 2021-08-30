import { put, delay, takeLatest, all, fork, call } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios, { AxiosResponse } from 'axios';
import {
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  REMOVE_TODO_REQUEST,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILURE,
} from 'store/actions/action';
import { BASE_URL } from 'utils/constants';
import { InitialTodosProps } from 'store/reducers/todoReducer';

function loadTodosAPI(): Promise<AxiosResponse<InitialTodosProps>> | undefined {
  try {
    return axios.get(`${BASE_URL}/todo`);
  } catch (err) {
    // console.warn(err);
    throw new Error('Cannot find loadTodosAPI');
  }
}

export function* loadTodos(action: AnyAction) {
  const { data } = yield call(loadTodosAPI);
  try {
    yield delay(2000);
    yield put({
      type: LOAD_TODOS_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: LOAD_TODOS_FAILURE,
    });
  }
}

export function* addTodo(action: AnyAction) {
  // const { data } = yield call(loadTodosAPI);
  try {
    yield delay(2000);
    yield put({
      type: ADD_TODO_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: ADD_TODO_FAILURE,
      data: error,
    });
  }
}

export function* removeTodo(action: AnyAction) {
  // const { data } = yield call(loadTodosAPI);
  try {
    yield delay(2000);
    yield put({
      type: REMOVE_TODO_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: REMOVE_TODO_FAILURE,
      data: error,
    });
  }
}

function* watchLoadTodos() {
  yield takeLatest(LOAD_TODOS_REQUEST, loadTodos);
}

function* watchAddTodo() {
  yield takeLatest(ADD_TODO_REQUEST, addTodo);
}

function* watchRemoveTodo() {
  yield takeLatest(REMOVE_TODO_REQUEST, removeTodo);
}

export default function* todosSaga() {
  yield all([fork(watchLoadTodos), fork(watchAddTodo), fork(watchRemoveTodo)]);
}
