import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoAddCircleSharp } from 'react-icons/io5';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

import { ITodo, Status } from 'utils/types';
import { STATUS_NAME } from 'utils/constants';
import { addTodoRequest, showToast } from 'store/actions/action';
import { IrootType } from 'store/reducers';
import { Loader } from 'components';

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const { addTodoLoading } = useSelector((state: IrootType) => state.todoReducer);
  const { todos } = useSelector((state: any) => state.todoReducer);
  const inputRef = useRef<HTMLInputElement>(null);

  const getRandomId = () => {
    const array = new Uint32Array(1);
    const randomId = window.crypto.getRandomValues(array);
    return String(randomId[0]);
  };

  const [inputValue, setInputValue] = useState<ITodo>({
    id: getRandomId(),
    content: '',
    isCheck: false,
    createdAt: new Date(),
    deadLine: new Date(),
    status: STATUS_NAME[Status.TODO],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const onInputReset = () => {
    setInputValue({
      id: getRandomId(),
      content: '',
      isCheck: false,
      createdAt: new Date(),
      deadLine: new Date(),
      status: STATUS_NAME[Status.TODO],
    });
    inputRef?.current?.focus();
    dispatch(showToast({ showToast: true, title: '성공', desc: '등록 완료 되었습니다' }));
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.content.trim().length === 0) {
      dispatch(showToast({ showToast: true, title: '등록실패', desc: '할일을 입력해주세요' }));
      return;
    }
    dispatch(addTodoRequest(inputValue));
    onInputReset();
    localStorage.setItem('todos', JSON.stringify([...todos.todoList, inputValue]));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormInput
          ref={inputRef}
          value={inputValue.content}
          name="content"
          placeholder="할일을 적으시오"
          onChange={(event) => handleChange(event)}
        />
        <DatePicker
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          closeOnScroll
          placeholderText="마감 날짜 선택"
          selected={inputValue.deadLine}
          onChange={(date: Date) => setInputValue({ ...inputValue, deadLine: date })}
        />
        <button type="submit">
          <IoAddCircleSharp size={30} />
        </button>
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
    background-color: #dfdfdf69;
    width: 150px;
    font-size: 1.1rem;
    margin-right: 1rem;
    border-radius: 10px;
    padding: 0 0.5rem;
  }
  & input {
    width: 20rem;
    border: 1px dotted gray;
    border-radius: 10px;
    &:last-child {
      padding: 10px 0;
      border: 0;
    }
  }
`;
