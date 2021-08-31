import './App.css';
import { useSelector } from 'react-redux';
import { IrootType } from 'store/reducers';
import { AddTodoForm, TodoList, AppLayout, Toast } from 'components';

function App() {
  const { showToast, desc, title } = useSelector((state: IrootType) => state.toastReducer);
  const { todos } = useSelector((state: IrootType) => state.todoReducer);
  console.log(todos);
  return (
    <AppLayout>
      <AddTodoForm />
      <TodoList />
      <Toast active={showToast} title={title} desc={desc} />
    </AppLayout>
  );
}

export default App;
