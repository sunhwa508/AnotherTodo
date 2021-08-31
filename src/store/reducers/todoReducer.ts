import produce from 'immer';
import { AnyAction } from 'redux';
import * as TYPES from '../actions/action';
import { ITodoList, Status } from '../../utils/types';
import { timelineEnd } from 'console';

export interface InitialTodosProps {
  todos: ITodoList;
  loadTodosLoading: boolean;
  loadTodosDone: boolean;
  loadTodosError: boolean | null;
  addTodoLoading: boolean;
  addTodoDone: boolean;
  addTodoError: boolean | null;
  removeTodoLoading: boolean;
  removeTodoDone: boolean;
  removeTodoError: boolean | null;
  editTodoLoading: boolean;
  editTodoDone: boolean;
  editTodoError: boolean | null;
}

const initialTodosState: InitialTodosProps = {
  todos: {
    count: 0,
    todoList: [
      {
        id: 'asdasd',
        content: '할일',
        isCheck: true,
        createdAt: '8월 31일 (화)',
        deadLine: '8월 31일 (화)',
        status: Status.TODO,
      },
      {
        id: 'asdasdasasd',
        content: '할일',
        isCheck: true,
        createdAt: '8월 31일 (화)',
        deadLine: '8월 31일 (화)',
        status: Status.TODO,
      },
    ],
  },
  loadTodosLoading: false,
  loadTodosDone: false,
  loadTodosError: null,
  addTodoLoading: false,
  addTodoDone: false,
  addTodoError: null,
  removeTodoLoading: false,
  removeTodoDone: false,
  removeTodoError: null,
  editTodoLoading: false,
  editTodoDone: false,
  editTodoError: null,
};

const todoReducer = (state = initialTodosState, action: AnyAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case TYPES.LOAD_TODOS_REQUEST:
        draft.loadTodosLoading = true;
        draft.loadTodosDone = false;
        draft.loadTodosError = null;
        break;
      case TYPES.LOAD_TODOS_SUCCESS:
        draft.loadTodosLoading = false;
        draft.loadTodosDone = true;
        draft.todos.todoList = action.data.todoList.concat(draft.todos.todoList);
        break;
      case TYPES.LOAD_TODOS_FAILURE:
        draft.loadTodosLoading = false;
        draft.loadTodosError = action.error;
        break;
      case TYPES.ADD_TODO_REQUEST:
        draft.addTodoLoading = true;
        draft.addTodoDone = false;
        draft.addTodoError = null;
        break;
      case TYPES.ADD_TODO_SUCCESS:
        draft.addTodoLoading = false;
        draft.addTodoDone = true;
        draft.todos.todoList = [...draft.todos.todoList, action.data];
        draft.todos.count += draft.todos.count;
        break;
      case TYPES.ADD_TODO_FAILURE:
        draft.addTodoLoading = false;
        draft.addTodoError = action.error;
        break;
      case TYPES.REMOVE_TODO_REQUEST:
        draft.removeTodoLoading = true;
        draft.removeTodoDone = false;
        draft.removeTodoError = null;
        break;
      case TYPES.REMOVE_TODO_SUCCESS:
        draft.removeTodoLoading = false;
        draft.removeTodoDone = true;
        draft.todos.todoList = draft.todos.todoList.filter((v) => v.id !== action.data.id);
        break;
      case TYPES.REMOVE_TODO_FAILURE:
        draft.removeTodoLoading = false;
        draft.removeTodoError = action.error;
        break;
      case TYPES.EDIT_TODO_REQUEST:
        draft.editTodoLoading = true;
        draft.editTodoDone = false;
        draft.editTodoError = null;
        break;
      case TYPES.EDIT_TODO_SUCCESS:
        draft.editTodoLoading = false;
        draft.editTodoDone = true;
        draft.todos.todoList.find((v) => v.id === action.data.id)!.status = action.data.status;
        draft.todos.todoList.find((v) => v.id === action.data.id)!.content = action.data.content;
        break;
      case TYPES.EDIT_TODO_FAILURE:
        draft.editTodoLoading = false;
        draft.editTodoError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default todoReducer;
