import React from 'react';
import styled from 'styled-components';
import { Header } from 'components';

interface Props {
  children: React.ReactNode;
}

const Layout = styled.div`
  display: flex;

  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background-color: #c5c2c21a;
`;

const AppLayout = ({ children }: Props) => (
  <Layout>
    <Header />
    {children}
  </Layout>
);

export { AppLayout };
