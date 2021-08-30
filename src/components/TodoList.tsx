import React from 'react';
import { useSelector } from 'react-redux';
import { ITodo } from 'utils/types';
import { TodoItem } from 'components';

function TodoList() {
  const { todos } = useSelector((state: any) => state.todoReducer);
  return (
    <div>
      {todos.todoList.map((todo: ITodo) => (
        <TodoItem todo={todo} />
      ))}
    </div>
  );
}

export { TodoList };
