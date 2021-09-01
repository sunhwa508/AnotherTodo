import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { IoAddCircleSharp } from 'react-icons/io5';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

import { ITodo, Status } from 'utils/types';
import { STATUS_NAME } from 'utils/constants';
import { addTodoRequest, showToast } from 'store/actions/action';

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState<ITodo>({
    content: '',
    isCheck: false,
    created_at: new Date(),
    deadLine: new Date(),
    status: STATUS_NAME[Status.TODO],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const onInputReset = () => {
    setInputValue({
      content: '',
      isCheck: false,
      created_at: new Date(),
      deadLine: new Date(),
      status: STATUS_NAME[Status.TODO],
    });
    inputRef?.current?.focus();
    dispatch(showToast({ showToast: true, title: '등록성공', desc: '등록 완료 되었습니다' }));
  };

  /**
   * 새로운 todo를 추가하는 함수
   * 1. 작성 완료시 혹은 실패시 toast
   * 2. dispatch로 addTodoRequest 요청을 보냄 (api 통신)
   * 3. submit 이후 초기값 리셋
   */
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.content.trim().length === 0) {
      dispatch(showToast({ showToast: true, title: '등록실패', desc: '할일을 입력해주세요' }));
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
