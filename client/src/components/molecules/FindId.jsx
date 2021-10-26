import React from 'react';
import Relative from '@/components/molecules/Relative';
import FormInput from '@/components/atoms/FormInput';
import FormLabel from '@/components/atoms/FormLabel';
import Strong from '@/components/atoms/Strong';

const FindId = ({ els }) => {
  return (
    <>
      {els.map((el, key) => {
        return (
          <div key={key}>
            <FormLabel htmlFor={el.props.id}>
              (<Strong>*</Strong>) {el.name}
            </FormLabel>
            <Relative>
              <FormInput {...el.props} onChange={el.handleChange} />
              {el.props.value && (
                <Relative.Cancel {...el.props} onClick={el.handleClick} />
              )}
            </Relative>
          </div>
        );
      })}
    </>
  );
};

export default FindId;
