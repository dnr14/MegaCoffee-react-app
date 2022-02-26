import * as users from '@/api/users';
import Button from '@/components/atoms/Button';
import Form from '@/components/atoms/Form';
import Loading from '@/components/atoms/Loading';
import Modal from '@/components/atoms/Modal';
import MemberShipLabel from '@/components/molecules/MemberShipLabel';
import Relative from '@/components/molecules/Relative';
import useFetch from '@/hooks/useFetch';
import useForm from '@/hooks/useForm';
import { emptyCheck } from '@/utils/validations';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

const MemberShipContainer = () => {
  const history = useHistory();
  const { form, handleChange, handleClick } = useForm();
  const { state, callApi } = useFetch();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const { loading, success, error } = state;

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
        name: '비밀번호 재확인',
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

  const setMessages = useCallback(
    metas =>
      metas.map((meta, idx) => (
        <div key={idx}>
          <span>{meta}</span>
        </div>
      )),
    []
  );

  const handleSubmit = e => {
    e.preventDefault();
    const { id, pwd, birthDay, name, email } = form;

    if (id.error || pwd.error || birthDay.error || name.error || email.error) {
      setMessage(setMessages(['에러가 있습니다.', '수정 해주세요.']));
      setIsOpen(prevState => !prevState);
      return;
    }

    if (
      emptyCheck(id.data) ||
      emptyCheck(pwd.data) ||
      emptyCheck(birthDay.data) ||
      emptyCheck(name.data) ||
      emptyCheck(email.data)
    ) {
      setMessage(setMessages(['빈칸이 있습니다.', '모두 채워주세요.']));
      setIsOpen(prevState => !prevState);
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
      setMessage(setMessages([`${error.message}`, '에러가 발생했습니다.']));
      setIsOpen(prevState => !prevState);
    }
  }, [error, setMessages]);

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
      <Modal isOpen={isOpen} backgroundTransparent setIsOpen={setIsOpen}>
        {message}
      </Modal>
      <Form onSubmit={handleSubmit}>
        {els.map((el, idx) => (
          <div key={idx}>
            <MemberShipLabel el={el} error={form[el.id].error} />
            <Relative>
              <Relative.FormInput
                id={el.id}
                type={el.type}
                placeholder={el.placeholder}
                error={form[el.id].error}
                value={form[el.id].data}
                onChange={handleChange}
                isSignup
              />
              {form[el.id].data && <Relative.Cancel id={el.id} onClick={handleClick} />}
            </Relative>
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
