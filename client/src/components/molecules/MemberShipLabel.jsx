import React, { memo } from 'react';
import Error from '@/components/atoms/Error';
import FormLabel from '@/components/atoms/FormLabel';

const MemberShipLabel = ({ el, error }) => (
  <div style={{ position: 'relative' }}>
    <FormLabel htmlFor={el.id}>{el.name}</FormLabel>
    {error && <Error>{error}</Error>}
  </div>
);

export default memo(MemberShipLabel);
