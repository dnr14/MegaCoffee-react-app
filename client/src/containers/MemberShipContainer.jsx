import React from 'react';
import Form from '@/components/Form';
import FormInput from '@/components/FormInput/';
import FormLabel from '@/components/FormLabel';
import Button from '@/components/Button';
import useForm from '@/hooks/useForm';
import Error from '@/components/Error';
import Cancel from '@/components/Cancel';
import * as validations from '@/utils/validations';

const MemberShipContainer = () => {
  const { form, handleChange, handleClick } = useForm();
  const { loading, success, error } = form;
  const handleSubmit = e => {
    e.preventDefault();
    const { id, pwd, pwdConfirm, birthDay, name, email } = form;

    if (
      id.error ||
      pwd.error ||
      pwdConfirm.error ||
      birthDay.error ||
      name.error ||
      email.error
    ) {
      return;
    }

    if (
      validations.emptyCheck(id.data) ||
      validations.emptyCheck(pwd.data) ||
      validations.emptyCheck(pwdConfirm.data) ||
      validations.emptyCheck(birthDay.data) ||
      validations.emptyCheck(name.data) ||
      validations.emptyCheck(email.data)
    ) {
      return;
    }

    console.log(id, pwd, pwdConfirm, birthDay, name, email);
  };

  const els = [
    {
      id: 'id',
      name: '아이디',
      type: 'text',
      placeholder: '아이디를 입력해주세요.',
    },
    {
      id: 'pwd',
      name: '비밀번호',
      type: 'password',
      placeholder: '비밀번호를 입력해주세요.',
    },
    {
      id: 'pwdConfirm',
      name: '비밀번호재확인',
      type: 'password',
      placeholder: '비밀번호를 입력해주세요.',
    },
    {
      id: 'birthDay',
      name: '생년월일',
      type: 'text',
      placeholder: 'YYMMDD',
    },
    {
      id: 'name',
      name: '이름',
      type: 'text',
      placeholder: 'ex 홍길동',
    },
    {
      id: 'email',
      name: '이메일',
      type: 'email',
      placeholder: 'test@naver.com',
    },
  ];

  if (success) return <div>회원가입에 성공했습니다.</div>;
  if (loading) {
    return <div>...로딩중</div>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      {els.map((el, idx) => (
        <div key={idx}>
          <FormLabel htmlFor={el.id}>{el.name}</FormLabel>
          {form[el.id].error && <Error>{form[el.id].error}</Error>}
          <div style={{ position: 'relative' }}>
            <FormInput
              id={el.id}
              type={el.type}
              placeholder={el.placeholder}
              error={form[el.id].error}
              value={form[el.id].data}
              onChange={handleChange}
            />
            {form[el.id].data && <Cancel id={el.id} onClick={handleClick} />}
          </div>
        </div>
      ))}
      <div>
        <Button>회원가입</Button>
      </div>
    </Form>
  );
};

export default MemberShipContainer;
