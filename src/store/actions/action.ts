import { ITodo } from 'utils/types';

export const LOAD_TODOS_REQUEST = 'LOAD_TODOS_REQUEST';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const DELETE_TODO_REQUEST = 'DELETE_TODOS_REQUEST';
export const DELETE_TODO_SUCCESS = 'DELETE_TODOS_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODOS_FAILURE';

export const MODIFY_TODO_REQUEST = 'MODIFY_TODOS_REQUEST';
export const MODIFY_TODO_SUCCESS = 'MODIFY_TODOS_SUCCESS';
export const MODIFY_TODO_FAILURE = 'MODIFY_TODOS_FAILURE';

export function loadTodosRequest() {
  return {
    type: LOAD_TODOS_REQUEST,
  };
}

export const addTodoRequest = (data: ITodo) => ({
  type: ADD_TODO_REQUEST,
  data,
});

export function deleteTodoRequest() {
  return {
    type: DELETE_TODO_REQUEST,
  };
}

export function modifyTodoRequest() {
  return {
    type: MODIFY_TODO_REQUEST,
  };
}
