import React from 'react';
import Form from '@/components/atoms/Form';
import FormLabel from '@/components/atoms/FormLabel';
import Strong from '@/components/atoms/Strong';
import Relative from '@/components/molecules/Relative';
import FormInput from '@/components/atoms/FormInput';
import LoginButton from '@/components/molecules/LoginButton';
import Error from '@/components/atoms/Error';

const FindForm = ({ els, handleFindSubmit }) => {
  return (
    <Form onSubmit={handleFindSubmit}>
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
            {el.props.error && <Error>{el.props.error}</Error>}
          </div>
        );
      })}
      <div>
        <LoginButton>찾기</LoginButton>
      </div>
    </Form>
  );
};

export default FindForm;
