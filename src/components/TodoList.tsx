import React from 'react';
import { useSelector } from 'react-redux';
import { ITodo } from 'utils/types';
import { TodoItem } from 'components';
import styled from 'styled-components';

const Wrapper = styled.table`
  border-collapse: collapse;
  min-width: 500px;
  margin-top: 30px;
  & .table_header {
    background-color: #bbb;
  }
  & th {
    border: solid 2px #000;
    padding: 10px;
  }
  & td {
    border: solid 2px #000;
    padding: 10px;
  }
  & .odd_color {
    background-color: #ddd;
  }
`;
const Title = styled.tr`
  background-color: #f1cfcf;
`;
function TodoList() {
  const { todos } = useSelector((state: any) => state.todoReducer);

  const itemsElements = todos.todoList.map((todo: ITodo, index: number) => (
    <tr key={todo.id} className={index % 2 !== 0 ? 'odd_color' : ''}>
      <TodoItem todo={todo} />
    </tr>
  ));

  return (
    <Wrapper>
      <thead>
        <tr className="table_header">
          <th>Description</th>
          <th>Is done</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{itemsElements}</tbody>
    </Wrapper>
  );
}

export { TodoList };
