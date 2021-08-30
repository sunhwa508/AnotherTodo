import React, { useState } from 'react';
import { ITodo } from 'utils/types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodoRequest, showToast } from 'store/actions/action';

import { Loader } from 'components';

interface Props {
  todo: ITodo;
}
const TodoItem = ({ todo }: Props) => {
  const dispatch = useDispatch();
  const { removeTodoLoading } = useSelector((state: any) => state.todoReducer);
  const [inputValue, setInputValue] = useState<ITodo>({
    id: todo.id,
    content: todo.content,
    isCheck: todo.isCheck,
    createdAt: todo.createdAt,
  });

  const removeTodo = (data: ITodo) => {
    dispatch(removeTodoRequest(data));
    dispatch(showToast({ showToast: true, title: '🔥', desc: '삭제가 완료 되었습니다' }));
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setInputValue({ ...inputValue, [name]: checked });
  };

  return (
    <>
      <td key="descr">{todo.content}</td>
      <td key="done" className="td_center">
        <input
          onChange={(e) => {
            onChange(e);
          }}
          key={todo.id}
          id={todo.id}
          type="checkbox"
          name="isCheck"
          checked={inputValue.isCheck}
        />
        <label htmlFor={todo.id}>{}</label>
      </td>
      <td>
        <button onClick={() => removeTodo(todo)} type="button">
          삭제
        </button>
      </td>
      {removeTodoLoading && <Loader />}
    </>
  );
};

export { TodoItem };
