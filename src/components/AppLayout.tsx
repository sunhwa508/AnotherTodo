import React from 'react';
import styled from 'styled-components';
import { Header } from 'components';

interface Props {
  children: React.ReactNode;
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AppLayout = ({ children }: Props) => (
  <Layout>
    <Header />
    {children}
  </Layout>
);

export { AppLayout };
