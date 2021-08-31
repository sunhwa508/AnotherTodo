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
  EDIT_TODO_REQUEST,
  EDIT_TODO_SUCCESS,
  EDIT_TODO_FAILURE,
  SORT_BY_DEADLINE_REQUEST,
  SORT_BY_DEADLINE_SUCCESS,
  SORT_BY_CREATEDAT_REQUEST,
  SORT_BY_CREATEDAT_SUCCESS,
} from 'store/actions/action';
import { BASE_URL } from 'utils/constants';
import { InitialTodosProps } from 'store/reducers/todoReducer';

function loadTodosAPI(): Promise<AxiosResponse<InitialTodosProps>> | undefined {
  try {
    return axios.get(`${BASE_URL}/todo`);
  } catch (err) {
    throw new Error('Cannot find loadTodosAPI');
  }
}

export function* loadTodos() {
  // const { data } = yield call(loadTodosAPI);
  try {
    yield delay(1000);
    yield put({
      type: LOAD_TODOS_SUCCESS,
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
    yield delay(1000);
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
    yield delay(1000);
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

export function* editTodo(action: AnyAction) {
  // const { data } = yield call(loadTodosAPI);
  try {
    yield put({
      type: EDIT_TODO_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    yield put({
      type: EDIT_TODO_FAILURE,
      data: error,
    });
  }
}

export function* sortByDeadline(action: AnyAction) {
  // const { data } = yield call(loadTodosAPI);
  try {
    yield put({
      type: SORT_BY_DEADLINE_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    throw new Error('sorting ERROR');
  }
}

export function* sortByCreatedAt(action: AnyAction) {
  // const { data } = yield call(loadTodosAPI);
  try {
    yield put({
      type: SORT_BY_CREATEDAT_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    throw new Error('sorting ERROR');
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

function* watchEditTodo() {
  yield takeLatest(EDIT_TODO_REQUEST, editTodo);
}
function* watchSortByDeadline() {
  yield takeLatest(SORT_BY_DEADLINE_REQUEST, sortByDeadline);
}
function* watchSortByCreatedAt() {
  yield takeLatest(SORT_BY_CREATEDAT_REQUEST, sortByCreatedAt);
}
export default function* todosSaga() {
  yield all([
    fork(watchLoadTodos),
    fork(watchAddTodo),
    fork(watchRemoveTodo),
    fork(watchEditTodo),
    fork(watchSortByDeadline),
    fork(watchSortByCreatedAt),
  ]);
}
