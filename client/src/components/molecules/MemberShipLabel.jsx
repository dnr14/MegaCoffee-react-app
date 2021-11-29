import React, { memo } from 'react';
import styled from 'styled-components';
import Error from '@/components/atoms/Error';
import FormLabel from '@/components/atoms/FormLabel';

const Container = styled.div`
  span {
    position: static;
    display: inline;
    margin-left: 10px;
  }
`;

const MemberShipLabel = ({ el, error }) => (
  <Container>
    <FormLabel htmlFor={el.id}>{el.name}</FormLabel>
    {error && <Error>{error}</Error>}
  </Container>
);

export default memo(MemberShipLabel);
