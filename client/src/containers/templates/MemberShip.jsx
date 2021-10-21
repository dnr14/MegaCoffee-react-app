import React from 'react';
import MemberShipContainer from '@/containers/organisms/MemberShipContainer';
import Layout from '@/components/atoms/Layout';
import Title from '@/components/atoms/Title';

const MemberShip = () => {
  return (
    <Layout>
      <Title>Mega Coffee 회원가입</Title>
      <MemberShipContainer />
    </Layout>
  );
};

export default MemberShip;
