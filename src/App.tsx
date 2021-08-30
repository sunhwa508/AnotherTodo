import './App.css';
import { useSelector } from 'react-redux';
import { InitialTodosProps } from 'store/reducers/todoReducer';
import { InitialToastProps } from 'store/reducers/toastReducer';
import { AddTodoForm, TodoList, AppLayout, Toast } from 'components';

function App() {
  const todoReducer = useSelector((state: InitialTodosProps) => state);
  const { showToast } = useSelector((state: InitialToastProps) => state);
  // const dispatch = useDispatch();

  return (
    <AppLayout>
      <AddTodoForm />
      <TodoList />
    </AppLayout>
  );
}

export default App;
