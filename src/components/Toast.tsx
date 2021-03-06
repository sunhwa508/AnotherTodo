import styled, { keyframes } from 'styled-components';

interface Props {
  active: boolean;
  desc: string;
  title: string;
}
function Toast({ active, desc, title }: Props) {
  return (
    <Wrapper className={`${active ? 'show' : ''}`}>
      {title}
      <div>{desc}</div>
    </Wrapper>
  );
}

const fadein = keyframes`
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
`;
const expand = keyframes`
    from {min-width: 50px}
    to {min-width: 250px}
`;
const stay = keyframes`
    from {min-width: 250px} 
    to {min-width: 250px}
`;
const shrink = keyframes`
    from {min-width: 250px;} 
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
  margin: auto;
  background-color: #626262;
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
  & div {
    color: #fff;
    padding: 16px;
    overflow: hidden;
    white-space: nowrap;
  }
  &.show {
    visibility: visible;
    animation: ${fadein} 0.5s, ${expand} 0.5s 0.5s, ${stay} 1.5s 1s, ${shrink} 0.5s 2.5s,
      ${fadeout} 0.5s 3s;
  }
`;

export { Toast };
