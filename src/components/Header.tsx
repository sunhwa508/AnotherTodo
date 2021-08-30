import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  display: fixed;
  width: 100vw;
  font-size: 2rem; ;
`;
const Header = () => {
  return <Wrapper>HEADER</Wrapper>;
};

export { Header };
