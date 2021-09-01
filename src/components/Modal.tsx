import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { closeModal } from 'store/actions/action';
import { ITodo } from 'utils/types';
import { dateToString } from 'utils/commons';

interface Props {
  data: ITodo;
}

function Modal({ data }: Props) {
  const dispatch = useDispatch();

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <ModalOverlay onClick={() => dispatch(closeModal())}>
      <ModalWrapper onClick={stopPropagation}>
        <h1>할일 상세</h1>
        <h3>{data.content}</h3>
        <span>{dateToString(data.deadLine)}</span>
        <span>까지</span>
        <span>{data.status}</span>
        <button type="button" onClick={() => dispatch(closeModal())}>
          확인
        </button>
      </ModalWrapper>
    </ModalOverlay>
  );
}

export { Modal };

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 10px 20px 100px 20px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  transform: translateX(-50%) translateY(-50%);
  & h3 {
    margin: 15px 0;
    padding: 20px;
    border: 1px solid black;
  }
  & span {
    margin: 15px 0;
    border-radius: 5px;
    padding: 2px;
    margin: 0 2px;
  }
  & button {
    width: 400px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #959595;
    padding: 15px 10px;
    border-radius: 0 0 5px 5px;
    cursor: pointer;
    &:hover {
      background-color: #cacaca;
    }
  }
`;
