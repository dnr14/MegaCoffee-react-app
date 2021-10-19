import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from '@/components/Form';
import FormInput from '@/components/FormInput/';
import FormLabel from '@/components/FormLabel';
import Button from '@/components/Button';
import useForm from '@/hooks/useForm';
import Error from '@/components/Error';
import Cancel from '@/components/Cancel';
import Modal from '@/components/Modal';
import Loading from '@/components/Loading';
import * as validations from '@/utils/validations';
import * as users from '@/api/users';
import useFetch from '@/hooks/useFetch';

const MemberShipContainer = () => {
  const history = useHistory();
  const { form, handleChange, handleClick } = useForm();
  const { state, callApi } = useFetch();
  const [isOpne, setIsOpne] = useState(false);
  const [message, setMessage] = useState(null);
  const { loading, success, error } = state;

  const messages = useMemo(
    () => [
      <>
        <div>
          <span>에러가 있습니다.</span>
        </div>
        <div>
          <span>수정 해주세요.</span>
        </div>
      </>,
      <>
        <div>
          <span>빈칸이 있습니다.</span>
        </div>
        <div>
          <span>모두 채워주세요.</span>
        </div>
      </>,
      <>
        <div>{error?.message}</div>
      </>,
    ],
    [error]
  );

  const els = useMemo(() => {
    return [
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
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const { id, pwd, birthDay, name, email } = form;

    if (id.error || pwd.error || birthDay.error || name.error || email.error) {
      setMessage(messages[0]);
      setIsOpne(prevState => !prevState);
      return;
    }

    if (
      validations.emptyCheck(id.data) ||
      validations.emptyCheck(pwd.data) ||
      validations.emptyCheck(birthDay.data) ||
      validations.emptyCheck(name.data) ||
      validations.emptyCheck(email.data)
    ) {
      setMessage(messages[1]);
      setIsOpne(prevState => !prevState);
      return;
    }
    callApi(() =>
      users.insert({
        id: id.data,
        pwd: pwd.data,
        birthDay: birthDay.data,
        name: name.data,
        email: email.data,
      })
    );
  };

  useEffect(() => {
    if (error) {
      setMessage(messages[2]);
      setIsOpne(prevState => !prevState);
    }
  }, [error, messages]);

  useEffect(() => {
    if (success) {
      history.push('/welcome', {
        props: {
          id: form.id.data,
        },
      });
    }
  }, [success, history, form]);

  return (
    <>
      <Loading loading={loading} />
      <Modal isOpne={isOpne} backgroundTransparent setIsOpne={setIsOpne}>
        {message}
      </Modal>
      <Form onSubmit={handleSubmit}>
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
    </>
  );
};

export default MemberShipContainer;
