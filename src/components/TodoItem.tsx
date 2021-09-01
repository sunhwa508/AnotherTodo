/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { BiEditAlt, BiSave } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';

import { editTodoRequest, removeTodoRequest, showToast, showModal } from 'store/actions/action';
import { listOfStatus, STATUS_NAME } from 'utils/constants';
import { dateToString } from 'utils/commons';
import { ITodo } from 'utils/types';

interface IstyleProps {
  done: boolean;
}

interface Props {
  todo: ITodo;
}

const TodoItem = ({ todo }: Props) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState<ITodo>({
    id: todo.id,
    content: todo.content,
    isCheck: todo.isCheck,
    created_at: todo.created_at,
    deadLine: todo.deadLine,
    status: todo.status,
  });

  const removeTodo = (data: ITodo) => {
    dispatch(removeTodoRequest(data));
    dispatch(showToast({ showToast: true, title: '', desc: '삭제가 완료 되었습니다' }));
  };

  /**
   *  todo를 수정하는 함수
   * 1. handleSelectChange status 값이 변경 될 때마다 호출
   * 2. handleInputChange content 값이 변경 될때마다 호출
   * 3. handleCheckChange check 상태가 변경될때마다 호출
   * 4. handleClickEdit content값 수정 후 저장버튼 누르는 경우
   */
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
    dispatch(editTodoRequest({ ...inputValue, [event.target.name]: event.target.value }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setInputValue({ ...inputValue, [name]: checked });
    dispatch(editTodoRequest({ ...inputValue, [name]: checked }));
  };

  const handleClickEdit = () => {
    if (inputValue.content.trim().length === 0) {
      dispatch(showToast({ showToast: true, title: '', desc: '할일을 입력해주세요' }));
      return;
    }
    setEditMode((prev) => !prev);
    dispatch(editTodoRequest(inputValue));
  };

  return (
    <>
      {editMode ? (
        <StyledTd done={todo.status === STATUS_NAME.DONE}>
          <input
            value={inputValue.content}
            name="content"
            placeholder="Add your new todo"
            onChange={(event) => handleInputChange(event)}
          />
          <button type="button" onClick={handleClickEdit}>
            <BiSave size={20} />
          </button>
        </StyledTd>
      ) : (
        <StyledTd done={todo.status === STATUS_NAME.DONE}>
          <div onClick={() => dispatch(showModal(todo))}>{todo.content}</div>
          {!(todo.status === STATUS_NAME.DONE) && (
            <button type="button" onClick={handleClickEdit}>
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
          onChange={(e) => handleSelectChange(e)}
        >
          {listOfStatus.map((status: string) => {
            return (
              <option key={status} defaultValue={inputValue.status} value={status}>
                {status}
              </option>
            );
          })}
        </select>
      </td>
      <td>{dateToString(todo.deadLine)}</td>
      <StyledRemoveTd>
        <button onClick={() => removeTodo(todo)} type="button">
          <RiDeleteBinLine size={20} />
        </button>
      </StyledRemoveTd>
      <td>{dateToString(todo.created_at)}</td>
      <td>
        <StyledInput
          onChange={(e) => {
            handleCheckChange(e);
          }}
          key={todo.id}
          id={todo.id}
          type="checkbox"
          name="isCheck"
          checked={inputValue.isCheck}
        />
        <StyledLabel htmlFor={todo.id}>★</StyledLabel>
      </td>
    </>
  );
};

export { TodoItem };

const StyledLabel = styled.label`
  color: #aab8c2;
  cursor: pointer;
  font-size: 2em;
  align-self: center;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: grey;
  }
  &::selection {
    color: none;
    background: transparent;
  }
`;
const StyledInput = styled.input`
  position: absolute;
  left: -100vw;
  &:checked + label {
    color: #ffd400;
    will-change: font-size;
  }
`;
const StyledRemoveTd = styled.td`
  & button {
    margin: 5px;
  }
`;
const StyledTd = styled.td`
  text-decoration: ${(props: IstyleProps) => (props.done ? 'line-through' : 'none')};
  position: relative;
  cursor: pointer;
  & div {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 50px;
  }
  & input {
    min-width: 200px;
    border: 1px dashed red;
    padding: 5px;
    outline: none;
  }
  & button {
    position: absolute;
    right: 10px;
    top: 15px;
    margin: 0 5px;
  }
`;
