import {
  loadTodosRequest,
  addTodoRequest,
  removeTodoRequest,
  modifyTodoRequest,
  showToast,
  closeToast,
} from './action';

// 모든 액션 관리
const rootAction = {
  loadTodosRequest,
  addTodoRequest,
  removeTodoRequest,
  modifyTodoRequest,
  showToast,
  closeToast,
};

export default rootAction;
