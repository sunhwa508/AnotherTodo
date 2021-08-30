import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
  height: 50px;
  display: fixed;
  width: 100vw;
`;
const Header = () => {
  return <Wrapper>HEADER</Wrapper>;
};

export { Header };
