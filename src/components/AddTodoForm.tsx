import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { dateToString } from 'utils/commons';
import { ITodo } from 'utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoRequest, showToast } from 'store/actions/action';
import { Loader } from 'components';
import { IrootType } from 'store/reducers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Status } from 'utils/types';
import { IoAddCircleSharp } from 'react-icons/io5';

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const { addTodoLoading } = useSelector((state: IrootType) => state.todoReducer);

  const getRandomId = () => {
    const array = new Uint32Array(1);
    const randomId = window.crypto.getRandomValues(array);
    return String(randomId[0]);
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [inputValue, setInputValue] = useState<ITodo>({
    id: getRandomId(),
    content: '',
    isCheck: false,
    createdAt: dateToString(new Date()),
    deadLine: new Date(),
    status: Status.TODO,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, content: event.target.value });
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const onInputReset = () => {
    setInputValue({
      id: getRandomId(),
      content: '',
      isCheck: false,
      createdAt: dateToString(new Date()),
      deadLine: new Date(),
      status: Status.TODO,
    });
    inputRef?.current?.focus();
    setSelectedDate(new Date());
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

  const getConvertedDate = (date: Date) => {
    setSelectedDate(date);
    setInputValue({ ...inputValue, deadLine: date });
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
          selected={selectedDate}
          onChange={(date: Date) => getConvertedDate(date)}
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
    padding: 0 0.5rem;
  }
  & input {
    width: 20rem;
    border: 1px solid gray;
    &:last-child {
      padding: 10px 0;
      border: 0;
    }
  }
`;
