import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectById, deleteById } from '@/api/userNoticeBoard';
import useFetch from '@/hooks/useFetch';
import Loading from '@/components/atoms/Loading';
import Alert from '@/components/atoms/Alert';
import Notice from '@/components/molecules/Notice';

const NoticeBoardSelectContainer = () => {
  const [post, setPost] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const userInfo = useSelector(({ login }) => login);
  const history = useHistory();
  const param = useParams();
  const { state, callApi } = useFetch();
  const { loading, error, success } = state;

  const boardDelete = id => () => {
    deleteById(id).then(() => history.replace('/noticeBoard'));
  };

  useEffect(() => {
    const { id } = param;
    callApi(() => selectById(id));
  }, [param, callApi]);

  useEffect(() => {
    if (success) {
      const { data } = success;
      setPost(data);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setAlertOpen(true);
      setAlertMessage(
        <div className="red">
          <span>서버에서 에러가 발생했습니다.</span>
        </div>
      );
    }
  }, [error]);

  return (
    <>
      {alertOpen && (
        <Alert isOpen={alertOpen} setIsOpen={setAlertOpen} closeDelay={3000}>
          {alertMessage}
        </Alert>
      )}
      <Loading loading={loading} />
      {post && (
        <Notice post={post} userInfo={userInfo} boardDelete={boardDelete} />
      )}
    </>
  );
};

export default NoticeBoardSelectContainer;
