import {
  loadTodosRequest,
  addTodoRequest,
  deleteTodoRequest,
  modifyTodoRequest,
} from './action';

// 모든 액션 관리
const rootAction = {
  loadTodosRequest,
  addTodoRequest,
  deleteTodoRequest,
  modifyTodoRequest,
};

export default rootAction;
