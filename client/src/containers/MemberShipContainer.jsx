import Form from '@/components/Form';
import React from 'react';
import FormInput from '@/components/FormInput/';
import FormLabel from '@/components/FormLabel';
import FormButton from '@/components/FormButton';
import { css } from 'styled-components';

const MemberShipContainer = () => {
  // 아이디
  // 비밀번호
  // 비밀번호 확인
  // 생년월일
  // 이름
  // 이메일
  const els = [
    {
      id: 'id',
      name: '아이디',
      type: 'text',
    },
    {
      id: 'pwd',
      name: '비밀번호',
      type: 'password',
    },
    {
      id: 'pwdconfirm',
      name: '비밀번호확인',
      type: 'password',
    },
    {
      id: 'birthDay',
      name: '생년월일',
      type: 'text',
    },
    {
      id: 'name',
      name: '이름',
      type: 'text',
    },
    {
      id: 'email',
      name: '이메일',
      type: 'email',
    },
  ];

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {els.map((el, idx) => (
        <div key={idx}>
          <FormLabel htmlFor={el.id}>{el.name}</FormLabel>
          <FormInput id={el.id} type={el.type} />
        </div>
      ))}
      <div>
        <FormButton>회원가입</FormButton>
      </div>
    </Form>
  );
};

export default MemberShipContainer;
