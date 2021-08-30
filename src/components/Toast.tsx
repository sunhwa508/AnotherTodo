import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

type StyledProps = {
  active: boolean;
};

const fadein = keyframes`
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
`;
const expand = keyframes`
    from {min-width: 50px}
    to {min-width: 350px}
`;
const stay = keyframes`
    from {min-width: 350px} 
    to {min-width: 350px}
`;
const shrink = keyframes`
    from {min-width: 350px;} 
    to {min-width: 50px;}
`;
const fadeout = keyframes`
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 60px; opacity: 0;}
`;

const Wrapper = styled.div`
  visibility: hidden;
  max-width: 50px;
  height: 60px;
  /*margin-left: -125px;*/
  margin: auto;
  background-color: #f8a4a4;
  font-weight: bold;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 30px;
  font-size: 17px;
  white-space: nowrap;

  &.show {
    visibility: visible;
    animation: ${fadein} 0.5s, ${expand} 0.5s 0.5s, ${stay} 3s 1s, ${shrink} 0.5s 4s, ${fadeout} 0.5s 4.5s;
  }

  & div {
    color: #fff;
    padding: 16px;
    overflow: hidden;
    white-space: nowrap;
  }
`;
interface Props {
  active: boolean;
  desc: string;
}
function Toast({ active, desc }: Props) {
  return (
    <Wrapper className={`${active ? 'show' : ''}`}>
      등록완료!
      <div>{desc}</div>
    </Wrapper>
  );
}

export { Toast };
