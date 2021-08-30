import './App.css';
import { useSelector } from 'react-redux';
import { IrootType } from 'store/reducers';
import { AddTodoForm, TodoList, AppLayout, Toast } from 'components';

function App() {
  const { showToast, desc } = useSelector((state: IrootType) => state.toastReducer);
  return (
    <AppLayout>
      <AddTodoForm />
      <TodoList />
      <Toast active={showToast} desc={desc} />
    </AppLayout>
  );
}

export default App;
