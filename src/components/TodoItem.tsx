import { useState } from 'react';
import { ITodo } from 'utils/types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodoRequest } from 'store/actions/action';
import { Loader } from 'components';

const Wrapper = styled.div``;
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
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setInputValue({ ...inputValue, [name]: checked });
  };

  return (
    <Wrapper>
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
      <label htmlFor={todo.id}>{todo.content}</label>
      <button onClick={() => removeTodo(todo)} type="button">
        삭제
      </button>
      {removeTodoLoading && <Loader />}
    </Wrapper>
  );
};

export { TodoItem };
