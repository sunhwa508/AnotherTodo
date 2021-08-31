import { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { IrootType } from 'store/reducers';
import { AddTodoForm, TodoList, AppLayout, Toast } from 'components';
import { loadTodosRequest } from 'store/actions/action';

function App() {
  const { showToast, desc, title } = useSelector((state: IrootType) => state.toastReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodosRequest());
  }, []);

  return (
    <AppLayout>
      <AddTodoForm />
      <TodoList />
      <Toast active={showToast} title={title} desc={desc} />
    </AppLayout>
  );
}

export default App;
