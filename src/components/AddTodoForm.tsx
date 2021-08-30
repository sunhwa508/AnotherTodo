import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { dateToString } from 'utils/commons';
import { ITodo } from 'utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoRequest, showToast } from 'store/actions/action';
import { Loader } from 'components';
import { IrootType } from 'store/reducers';

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const { addTodoLoading, addTodoDone } = useSelector((state: IrootType) => state.todoReducer);

  const getRandomId = () => {
    const array = new Uint32Array(1);
    const randomId = window.crypto.getRandomValues(array);
    return String(randomId[0]);
  };

  const [inputValue, setInputValue] = useState<ITodo>({
    id: getRandomId(),
    content: '',
    isCheck: false,
    createdAt: dateToString(new Date()),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, content: event.target.value });
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const onInputReset = () => {
    setInputValue({
      id: '',
      content: '',
      isCheck: false,
      createdAt: dateToString(new Date()),
    });
    inputRef?.current?.focus();
    dispatch(showToast({ showToast: true, title: 'SUCCESS', desc: '등록완료되었습니다' }));
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.content.trim().length === 0) {
      dispatch(showToast({ showToast: true, title: '👀', desc: '할일을 입력해주세요' }));
      return;
    }
    dispatch(addTodoRequest(inputValue));
    onInputReset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormInput
          ref={inputRef}
          value={inputValue.content}
          name="content"
          placeholder="Add your new todo"
          onChange={(event) => handleChange(event)}
        />
        <button type="submit">ADD</button>
      </Form>
      {addTodoLoading && <Loader />}
    </>
  );
};

export { AddTodoForm };

const FormInput = styled.input`
  padding: 10px;
  border: 0;
  margin-right: 1rem;
  line-height: normal;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  & .react-datepicker-wrapper,
  .react-datepicker__input-container input {
    border: 0;
    width: 10rem;
    font-size: 1.1rem;
    margin-right: 1rem;
  }
  & input {
    width: 20rem;
    &:last-child {
      padding: 10px 0;
      border: 0;
    }
  }
`;
