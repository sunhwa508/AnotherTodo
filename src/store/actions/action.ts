import { ITodo } from 'utils/types';

export const LOAD_TODOS_REQUEST = 'LOAD_TODOS_REQUEST';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const REMOVE_TODO_REQUEST = 'REMOVE_TODOS_REQUEST';
export const REMOVE_TODO_SUCCESS = 'REMOVE_TODOS_SUCCESS';
export const REMOVE_TODO_FAILURE = 'REMOVE_TODOS_FAILURE';

export const MODIFY_TODO_REQUEST = 'MODIFY_TODOS_REQUEST';
export const MODIFY_TODO_SUCCESS = 'MODIFY_TODOS_SUCCESS';
export const MODIFY_TODO_FAILURE = 'MODIFY_TODOS_FAILURE';

export const SHOW_TOAST = 'SHOW_TOAST';
export const CLOSE_TOAST = 'CLOSE_TOAST';

export function loadTodosRequest() {
  return {
    type: LOAD_TODOS_REQUEST,
  };
}

export const addTodoRequest = (data: ITodo) => ({
  type: ADD_TODO_REQUEST,
  data,
});

export function removeTodoRequest(data: ITodo) {
  return {
    type: REMOVE_TODO_REQUEST,
    data,
  };
}

export function modifyTodoRequest(data: ITodo) {
  return {
    type: MODIFY_TODO_REQUEST,
    data,
  };
}

export const showToast = () => {
  return { type: SHOW_TOAST };
};

export const closeToast = () => {
  return { type: CLOSE_TOAST };
};
