import { loadTodosRequest, addTodoRequest, removeTodoRequest, editTodoRequest, showToast, closeToast } from './action';

// 모든 액션 관리
const rootAction = {
  loadTodosRequest,
  addTodoRequest,
  removeTodoRequest,
  editTodoRequest,
  showToast,
  closeToast,
};

export default rootAction;
