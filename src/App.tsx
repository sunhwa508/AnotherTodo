import { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { IrootType } from 'store/reducers';
import { AddTodoForm, TodoList, AppLayout, Toast, Modal } from 'components';
import { loadTodosRequest } from 'store/actions/action';

function App() {
  const { showToast, desc, title } = useSelector((state: IrootType) => state.toastReducer);
  const { showModal, data } = useSelector((state: IrootType) => state.modalReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodosRequest());
  }, []);

  return (
    <AppLayout>
      <AddTodoForm />
      <TodoList />
      {showToast && <Toast active={showToast} title={title} desc={desc} />}
      {showModal && <Modal data={data} />}
    </AppLayout>
  );
}

export default App;
