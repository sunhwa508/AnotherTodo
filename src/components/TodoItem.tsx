import React, { useState, useEffect } from 'react';
import { ITodo } from 'utils/types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { editTodoRequest, removeTodoRequest, showToast } from 'store/actions/action';
import { Status } from 'utils/types';
import { BiEditAlt, BiSave } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { STATUS_NAME } from 'utils/constants';
import { dateToString } from 'utils/commons';

interface IstyleProps {
  done: boolean;
}

const StyledTd = styled.td`
  text-decoration: ${(props: IstyleProps) => (props.done ? 'line-through' : 'none')};
  position: relative;

  & div {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 50px;
  }
  & input {
    min-width: 200px;
  }
  & button {
    position: absolute;
    right: 10px;
    top: 12px;
    margin: 0 5px;
  }
`;
interface Props {
  todo: ITodo;
}
const TodoItem = ({ todo }: Props) => {
  const { todos } = useSelector((state: any) => state.todoReducer);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState<ITodo>({
    id: todo.id,
    content: todo.content,
    isCheck: todo.isCheck,
    createdAt: todo.createdAt,
    deadLine: todo.deadLine,
    status: todo.status,
  });

  const removeTodo = (data: ITodo) => {
    dispatch(removeTodoRequest(data));
    dispatch(showToast({ showToast: true, title: '🔥', desc: '삭제가 완료 되었습니다' }));
  };
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos.todoList));
  }, [todos.todoList]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
    dispatch(editTodoRequest({ ...inputValue, [event.target.name]: event.target.value }));
  };
  const onClickEdit = () => {
    if (inputValue.content.trim().length === 0) {
      dispatch(showToast({ showToast: true, title: '👀', desc: '할일을 입력해주세요' }));
      return;
    }
    setEditMode((prev) => !prev);
  };
  const listOfStatus = [
    STATUS_NAME[Status.TODO],
    STATUS_NAME[Status.IN_PROGRESS],
    STATUS_NAME[Status.DONE],
  ];
  return (
    <>
      {editMode ? (
        <StyledTd done={todo.status === '다한 것'}>
          <input
            value={todo.content}
            name="content"
            placeholder="Add your new todo"
            onChange={(event) => handleChange(event)}
          />
          <button type="button" onClick={onClickEdit}>
            <BiSave size={20} />
          </button>
        </StyledTd>
      ) : (
        <StyledTd done={todo.status === '다한 것'}>
          <div>{todo.content}</div>
          {!(todo.status === 'DONE') && (
            <button type="button" onClick={onClickEdit}>
              <BiEditAlt size={20} />
            </button>
          )}
        </StyledTd>
      )}
      <td>
        <select
          value={inputValue.status}
          id="status"
          name="status"
          onChange={(e) => handleChange(e)}
        >
          {listOfStatus.map((status: string, index: number) => {
            return (
              <option key={status} defaultValue={inputValue.status} value={status}>
                {status}
              </option>
            );
          })}
        </select>
      </td>
      <td>{dateToString(todo.deadLine)}</td>
      <td>
        <button onClick={() => removeTodo(todo)} type="button">
          <RiDeleteBinLine size={20} />
        </button>
      </td>
      <td>{dateToString(todo.createdAt)}</td>
    </>
  );
};

export { TodoItem };
