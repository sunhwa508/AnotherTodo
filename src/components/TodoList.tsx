import React from 'react';
import { useSelector } from 'react-redux';
import { ITodo } from 'utils/types';
import { TodoItem } from 'components';
import styled from 'styled-components';
import { Loader } from 'components';

interface IstyleProps {
  done: boolean;
}

const StyledTr = styled.tr`
  opacity: ${(props: IstyleProps) => (props.done ? '0.3' : '')};
`;

const Wrapper = styled.table`
  border-collapse: collapse;
  min-width: 600px;
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
  const { removeTodoLoading } = useSelector((state: any) => state.todoReducer);

  return (
    <>
      <Wrapper>
        <thead>
          <tr className="table_header">
            <th>Description</th>
            <th>상태</th>
            <th>마감일</th>
            <th>삭제</th>
            <th>생성일</th>
          </tr>
        </thead>
        <tbody>
          {todos.todoList.map((todo: ITodo, index: number) => (
            <StyledTr key={todo.id} done={todo.status === 'DONE'} className={index % 2 !== 0 ? 'odd_color' : ''}>
              <TodoItem todo={todo} />
            </StyledTr>
          ))}
        </tbody>
      </Wrapper>
      {removeTodoLoading && <Loader />}
    </>
  );
}

export { TodoList };
