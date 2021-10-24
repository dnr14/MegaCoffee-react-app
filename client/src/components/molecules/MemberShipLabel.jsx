import React, { memo } from 'react';
import Error from '@/components/atoms/Error';
import FormLabel from '@/components/atoms/FormLabel';

const MemberShipLabel = ({ el, error }) => (
  <>
    <FormLabel htmlFor={el.id}>{el.name}</FormLabel>
    {error && <Error>{error}</Error>}
  </>
);

export default memo(MemberShipLabel);
