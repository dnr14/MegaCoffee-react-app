import Title from '@/components/Title';
import MemberShipContainer from '@/containers/MemberShipContainer';
import React from 'react';
import Layout from '@/components/Layout';

const MemberShip = () => {
  return (
    <Layout>
      <Title>회원가입</Title>
      <MemberShipContainer />
    </Layout>
  );
};

export default MemberShip;
