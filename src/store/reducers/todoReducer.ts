import produce from 'immer';
import { AnyAction } from 'redux';
import * as TYPES from 'store/actions/action';
import { ITodoList } from 'utils/types';

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
  sortByDeadlineLoading: boolean;
  sortByDeadlineDone: boolean;
  sortByCreatedAtLoading: boolean;
  sortByCreatedAtDone: boolean;
}

const initialTodosState: InitialTodosProps = {
  todos: {
    count: 0,
    todoList: [],
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
  sortByDeadlineLoading: false,
  sortByDeadlineDone: false,
  sortByCreatedAtLoading: false,
  sortByCreatedAtDone: false,
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
        draft.todos.todoList = action.data;
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
        draft.todos.count = [...draft.todos.todoList, action.data].length;
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
        draft.todos.count = draft.todos.todoList.length;
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
      case TYPES.SORT_BY_DEADLINE_REQUEST:
        draft.sortByDeadlineLoading = true;
        draft.sortByDeadlineDone = false;
        break;
      case TYPES.SORT_BY_DEADLINE_SUCCESS:
        draft.sortByDeadlineLoading = false;
        draft.sortByDeadlineDone = true;
        draft.todos.todoList.sort((a, b) => {
          return action.data
            ? new Date(a.deadLine).getTime() - new Date(b.deadLine).getTime()
            : new Date(b.deadLine).getTime() - new Date(a.deadLine).getTime();
        });
        break;
      case TYPES.SORT_BY_CREATEDAT_REQUEST:
        draft.sortByCreatedAtLoading = true;
        draft.sortByCreatedAtDone = false;
        break;
      case TYPES.SORT_BY_CREATEDAT_SUCCESS:
        draft.sortByCreatedAtLoading = false;
        draft.sortByCreatedAtDone = true;
        draft.todos.todoList.sort((a, b) => {
          return action.data
            ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
        break;
      default:
        return state;
    }
  });
};

export default todoReducer;
