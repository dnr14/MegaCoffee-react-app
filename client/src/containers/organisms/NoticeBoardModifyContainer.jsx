import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import useFetch from '@/hooks/useFetch';
import { selectById, modify } from '@/api/userNoticeBoard';
import { emptyCheck, isEmptyObject } from '@/utils/validations';
import Loading from '@/components/atoms/Loading';
import Alert from '@/components/atoms/Alert';
import Empty from '@/components/atoms/Empty';
import Modify from '@/components/molecules/Modify';

const NoticeBoardModifyContainer = () => {
  const userInfo = useSelector(({ login }) => login);
  const location = useLocation();
  const history = useHistory();
  const [post, setPost] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [editorValue, setEditorValue] = useState();
  const { state, callApi } = useFetch();
  const { loading, success, error } = state;
  const { state: locationState } = location;

  const handleOnSubmit = useCallback(
    e => {
      e.preventDefault();
      const { id } = post;

      callApi(() =>
        modify(id, {
          body: editorValue,
        })
      );
    },
    [post, callApi, editorValue]
  );
  const handleEditorOnChange = useCallback(
    (_, editor) => setEditorValue(editor.getData()),
    []
  );

  useEffect(() => {
    try {
      emptyCheck(locationState);
      callApi(() => selectById(locationState.id));
    } catch (error) {
      alert('잘못된 경로입니다.');
      history.replace('/');
    }
  }, [locationState, history, callApi, userInfo]);

  useEffect(() => {
    if (!success) return;
    const { data, status } = success;
    if (status === 200) {
      setEditorValue(data.body);
      setPost(data);
    }
    if (status === 204) {
      history.goBack();
    }
  }, [success, history]);

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

  if (isEmptyObject(post)) {
    return (
      <>
        <Loading loading={loading} />
        <Empty />
      </>
    );
  }

  return (
    <>
      {alertOpen && (
        <Alert isOpen={alertOpen} setIsOpen={setAlertOpen} closeDelay={3000}>
          {alertMessage}
        </Alert>
      )}
      <Loading loading={loading} />
      <Modify
        post={post}
        editorValue={editorValue}
        handleOnSubmit={handleOnSubmit}
        handleEditorOnChange={handleEditorOnChange}
      />
    </>
  );
};

export default NoticeBoardModifyContainer;
