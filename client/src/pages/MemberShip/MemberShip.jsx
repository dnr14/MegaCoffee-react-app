import React from 'react';
import Title from '@/components/Title';
import MemberShipContainer from '@/containers/MemberShipContainer';
import Layout from '@/components/Layout';

const MemberShip = () => {
  return (
    <Layout>
      <Title>Mega Coffee 회원가입</Title>
      <MemberShipContainer />
    </Layout>
  );
};

export default MemberShip;
