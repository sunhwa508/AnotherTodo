import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { AddTodoForm, TodoList, AppLayout } from './components';
import { InitialTodosProps } from './store/reducers/todoReducer';

function App() {
  const todoReducer = useSelector((state: InitialTodosProps) => state);
  console.log('data', todoReducer);
  // const dispatch = useDispatch();

  return (
    <AppLayout>
      <AddTodoForm />
      <TodoList />
    </AppLayout>
  );
}

export default App;
