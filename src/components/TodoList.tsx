import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ITodo } from 'utils/types';
import { TodoItem } from 'components';
import styled from 'styled-components';
import { Loader } from 'components';
import { FiFilter } from 'react-icons/fi';
import { sortByDeadlineRequest, sortByCreatedAtRequest } from 'store/actions/action';
import { IrootType } from 'store/reducers';

interface IstyleProps {
  done: boolean;
}

function TodoList() {
  const dispatch = useDispatch();
  const { todos, removeTodoLoading } = useSelector((state: IrootType) => state.todoReducer);
  const [sortType, setSortType] = useState(true);

  const handleSorting = (isCreated: boolean) => {
    setSortType((prev) => !prev);
    if (isCreated) {
      dispatch(sortByCreatedAtRequest(sortType));
    } else {
      dispatch(sortByDeadlineRequest(sortType));
    }
  };

  return (
    <>
      <Wrapper>
        <thead>
          <tr className="table_header">
            <th>할일목록</th>
            <th>상태</th>
            <StyledTh>
              마감일
              <button type="button" onClick={() => handleSorting(false)}>
                <FiFilter size={15} />
              </button>
            </StyledTh>
            <th>삭제</th>
            <StyledTh>
              생성일
              <button type="button" onClick={() => handleSorting(true)}>
                <FiFilter size={15} />
              </button>
            </StyledTh>
          </tr>
        </thead>
        <tbody>
          {todos.todoList.map((todo: ITodo, index: number) => (
            <StyledTr
              key={todo.id}
              done={todo.status === '다한 것'}
              className={index % 2 !== 0 ? 'odd_color' : ''}
            >
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
const StyledTh = styled.th`
  position: relative;
  & button {
    position: absolute;
    right: 5px;
  }
`;
