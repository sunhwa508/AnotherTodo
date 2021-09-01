import styled from 'styled-components';

const Header = () => {
  return <Wrapper>할일 기록장</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  display: fixed;
  width: 100vw;
  font-size: 2rem;
  margin-bottom: 20px;
  padding: 30px 0;
`;
export { Header };
