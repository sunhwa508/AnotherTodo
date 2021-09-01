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
  SHOW_TOAST,
} from 'store/actions/action';
import { InitialTodosProps } from 'store/reducers/todoReducer';
import { ITodo } from 'utils/types';
import { globalEnv } from 'config/env';

/**
 * [GET] todos
 * 데이터를 불러온다
 */

function loadTodosAPI(): Promise<AxiosResponse<InitialTodosProps>> | undefined {
  try {
    return axios.get(`${globalEnv.API_ENDPOINT}/todos`);
  } catch (err) {
    throw new Error('Cannot find loadTodosAPI');
  }
}

export function* loadTodos() {
  // call 을 사용하면 특정 함수를 호출하고, 결과물이 반환 될 때까지 기다려줄 수 있다.
  const { data } = yield call(loadTodosAPI);
  try {
    yield delay(1000);
    yield put({
      type: LOAD_TODOS_SUCCESS,
      data,
    });
  } catch (error) {
    yield put({
      type: LOAD_TODOS_FAILURE,
    });
  }
}

/**
 * [POST] 새로운 todo를 추가하고 성공시 toast 생성
 */
function addTodoAPI(data: ITodo) {
  try {
    return axios.post(`${globalEnv.API_ENDPOINT}/todos`, data);
  } catch (err) {
    throw new Error('Cannot find addTodoAPI');
  }
}

export function* addTodo(action: AnyAction) {
  const { data } = yield call(addTodoAPI, action.data);
  const toastData = { showToast: true, title: '등록성공', desc: '등록 완료 되었습니다' };
  try {
    yield delay(1000);
    yield put({
      type: ADD_TODO_SUCCESS,
      data,
    });
    yield put({
      type: SHOW_TOAST,
      data: toastData,
    });
  } catch (error) {
    yield put({
      type: ADD_TODO_FAILURE,
      data: error,
    });
  }
}

/**
 * [DELETE] todo를 삭제하고 성공시 toast 생성
 */
function removeTodoAPI(data: ITodo) {
  try {
    return axios.delete(`${globalEnv.API_ENDPOINT}/todos/${data.id}`);
  } catch (err) {
    throw new Error('Cannot find removeTodoAPI');
  }
}

export function* removeTodo(action: AnyAction) {
  const { data } = yield call(removeTodoAPI, action.data);
  const toastData = { showToast: true, title: '', desc: '삭제가 완료 되었습니다' };
  try {
    yield delay(1000);
    yield put({
      type: REMOVE_TODO_SUCCESS,
      data,
    });
    yield put({
      type: SHOW_TOAST,
      data: toastData,
    });
  } catch (error) {
    yield put({
      type: REMOVE_TODO_FAILURE,
      data: error,
    });
  }
}

/**
 * [PUT] todo를 수정하고 성공시 toast 생성
 */
function editTodoAPI(data: ITodo) {
  try {
    return axios.put(`${globalEnv.API_ENDPOINT}/todos/${data.id}`, data);
  } catch (err) {
    throw new Error('Cannot find editTodoAPI');
  }
}

export function* editTodo(action: AnyAction) {
  const { data } = yield call(editTodoAPI, action.data);
  const toastData = { showToast: true, title: '', desc: '수정이 완료 되었습니다' };
  try {
    yield put({
      type: EDIT_TODO_SUCCESS,
      data,
    });
    yield put({
      type: SHOW_TOAST,
      data: toastData,
    });
  } catch (error) {
    yield put({
      type: EDIT_TODO_FAILURE,
      data: error,
    });
  }
}

/**
 * deadline 순으로 정렬
 */
export function* sortByDeadline(action: AnyAction) {
  try {
    yield put({
      type: SORT_BY_DEADLINE_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    throw new Error('cannot find sortByDeadline');
  }
}

/**
 * created_at 순으로 정렬
 */
export function* sortByCreatedAt(action: AnyAction) {
  try {
    yield put({
      type: SORT_BY_CREATEDAT_SUCCESS,
      data: action.data,
    });
  } catch (error) {
    throw new Error('cannot find sortByCreatedAt');
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
