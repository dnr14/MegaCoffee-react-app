import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { selectById } from '@/api/userNoticeBoard';
import { emptyCheck, isEmptyObject } from '@/utils/validations';
import Loading from '@/components/atoms/Loading';
import CoustomEditor from '@/components/molecules/CustomEditor';
import Alert from '@/components/atoms/Alert';

const NoticeBoardModifyContainer = () => {
  const userInfo = useSelector(({ login }) => login);
  const location = useLocation();
  const history = useHistory();
  const [post, setPost] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const { state, callApi } = useFetch();
  const { loading, success, error } = state;
  const { state: locationState } = location;

  useEffect(() => {
    try {
      emptyCheck(locationState);
      if (locationState.writer !== userInfo.id) throw new Error();
      callApi(() => selectById(locationState.id));
    } catch (error) {
      alert('잘못된 경로입니다.');
      history.replace('/');
    }
  }, [locationState, history, callApi, userInfo]);

  useEffect(() => {
    if (!success) return;
    setPost(success.data);
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

  const { body, title, categoryThumbnail } = post;

  return (
    <>
      {alertOpen && (
        <Alert isOpen={alertOpen} setIsOpen={setAlertOpen} closeDelay={3000}>
          {alertMessage}
        </Alert>
      )}
      <Loading loading={loading} />
      {isEmptyObject(post) || (
        <div>
          <div>{title}</div>
          <div>
            <img src={categoryThumbnail} alt="thumbnail" />
          </div>
          <CoustomEditor data={body} />
        </div>
      )}
    </>
  );
};

export default NoticeBoardModifyContainer;
