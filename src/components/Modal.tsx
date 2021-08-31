import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { closeModal } from 'store/actions/action';
import { ITodo } from 'utils/types';
import { dateToString } from 'utils/commons';

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
  height: 300px;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  transform: translateX(-50%) translateY(-50%);
  & h3,
  h4 {
    margin: 15px 0;
  }
  & button {
    width: 100px;
    background-color: gray;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 20px 0;
  }
`;
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
        <h4>{data.status}</h4>
        <p>{dateToString(data.deadLine)}</p>
        <button type="button" onClick={() => dispatch(closeModal())}>
          확인
        </button>
      </ModalWrapper>
    </ModalOverlay>
  );
}

export { Modal };
