import produce from 'immer';
import { AnyAction } from 'redux';
import * as TYPES from '../actions/action';
import { ITodoList } from '../../utils/types';

export interface InitialTodosProps {
  todos: ITodoList;
  loadTodosLoading: boolean;
  loadTodosDone: boolean;
  loadTodosError: boolean | null;
  addTodoLoading: boolean;
  addTodoDone: boolean;
  addTodoError: boolean | null;
}

const initialTodosState: InitialTodosProps = {
  todos: {
    count: 0,
    todoList: [
      {
        id: 'asdasd',
        content: '할일',
        isCheck: true,
        createdAt: '2021-05-26T11:51:05.097Z',
      },
    ],
  },
  loadTodosLoading: false,
  loadTodosDone: false,
  loadTodosError: null,
  addTodoLoading: false,
  addTodoDone: false,
  addTodoError: null,
};

const todoReducer = (state = initialTodosState, action: AnyAction) => {
  return produce(state, (draft) => {
    console.log('action data', action.data, action.type);
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
      default:
        return state;
    }
  });
};

export default todoReducer;