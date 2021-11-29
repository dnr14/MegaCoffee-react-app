import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectById, deleteById } from '@/api/userNoticeBoard';
import useFetch from '@/hooks/useFetch';
import Alert from '@/components/atoms/Alert';
import Notice from '@/components/molecules/Notice';
import { emptyCheck } from '@/utils/validations';
import CommentEditor from '@/components/molecules/CommentEditor';
import Button from '@/components/atoms/Button';
import Form from '@/components/atoms/Form';
import * as comment from '@/api/comment';
import Comment from '@/components/molecules/Comment';
import NoComments from '@/components/molecules/NoComments';
import FlexBox from '@/components/atoms/FlexBox';
import Strong from '@/components/atoms/Strong';

const CLOSE_TIME = 600;
const COMMENT_VALUE_MAX_LENG = 300;
const COMMENT_VALUE_REGEX = /<p>/gi;
const ALERT_CLASS_NAME_ENUM = {
  error: 'red',
  success: 'green',
};

const NoticeBoardSelectContainer = () => {
  const [post, setPost] = useState({});
  const [currentModifyCommentId, setCurrentModifyCommentId] = useState(null);
  const [comments, setComments] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [modifyDisabled, setModifyDisabled] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [commentValueLength, setCommentValueLength] = useState(0);
  const [modifyCommentValue, setModifyCommentValue] = useState('');
  const [modifyCommentValueLength, setModifyCommentValueLength] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const userInfo = useSelector(({ login }) => login);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const param = useParams();
  const { state, callApi } = useFetch();
  const { loading, error, success } = state;
  const { page, totalPages, results } = comments;
  const { id } = userInfo;
  const up = useRef();

  const setAlert = (text, className) => {
    setAlertOpen(true);
    setAlertMessage(
      <div className={className}>
        <span>{text}</span>
      </div>
    );
  };

  // 댓글 수정 모달 닫기
  const commentModifyEditorClose = () => {
    if (up.current instanceof Function) up.current();
  };

  // 댓글 state 상태 체크
  const commentValueValidation = (valueLength, value) => {
    const result = value.match(COMMENT_VALUE_REGEX);
    let isDisabled = false;
    if (valueLength > COMMENT_VALUE_MAX_LENG || result?.length > 20) {
      isDisabled = true;
    }
    return isDisabled;
  };

  // 신규 댓글 쓰기 state 입력
  const handleEditorOnChange = useCallback(
    (_, editor) => {
      const value = editor.getData();
      const isDisabled = commentValueValidation(commentValueLength, value);
      setDisabled(isDisabled);
      setCommentValue(value);
    },
    [commentValueLength]
  );

  // 댓글 수정 state입력
  const handleCommentModifyOnChange = useCallback(
    (_, editor) => {
      const value = editor.getData();
      const isDisabled = commentValueValidation(
        modifyCommentValueLength,
        value
      );
      setModifyDisabled(isDisabled);
      setModifyCommentValue(value);
    },
    [modifyCommentValueLength]
  );
  // commentEditor에서 html태그를 제외한 text 개수 가져오기
  const handleEditorOnUpdate = useCallback(
    ({ characters }) => setCommentValueLength(characters),
    []
  );

  const handleCommentModifyEditorOnUpdate = useCallback(
    ({ characters }) => setModifyCommentValueLength(characters),
    []
  );

  // 댓글 입력하기 api
  const handleOnSubmit = useCallback(
    e => {
      e.preventDefault();
      if (emptyCheck(commentValue)) {
        setAlert('댓글을 입력해주세요.', ALERT_CLASS_NAME_ENUM.error);
        return;
      }

      if (emptyCheck(id)) {
        setAlert('로그인을 입력해주세요.', ALERT_CLASS_NAME_ENUM.error);
        return;
      }

      const obj = {
        id: param.id,
        writer: id,
        body: commentValue,
      };

      (async () => {
        const response = await comment.insert(obj);
        const { data } = response;
        setAlert('댓글이 등록되었습니다.', ALERT_CLASS_NAME_ENUM.success);
        setCommentValue('');
        setComments(prev => ({
          ...prev,
          results: [data, ...prev.results],
        }));
      })();
    },
    [commentValue, param, id]
  );

  // 댓글 수정하기 모달 열기
  const handleCommentModifyOnClick = useCallback(
    currentId => () => {
      commentModifyEditorClose();
      setTimeout(() => {
        const { body } = results.find(({ _id }) => _id === currentId);
        setModifyCommentValue(body);
        setCurrentModifyCommentId(currentId);
        setIsOpen(true);
      }, CLOSE_TIME);
    },
    [results]
  );

  // 댓글 수정하기 api
  const handleCommentModify = id => () => {
    if (emptyCheck(modifyCommentValue)) {
      setAlert('댓글을 입력해주세요.', ALERT_CLASS_NAME_ENUM.error);
      return;
    }

    (async () => {
      try {
        const response = await comment.modifyById(id, {
          body: modifyCommentValue,
        });
        setAlert('댓글이 수정되었습니다.', ALERT_CLASS_NAME_ENUM.success);
        commentModifyEditorClose();
        setTimeout(() => {
          const { _id: responseId } = response.data;
          const results = comments.results.map(result => {
            const { _id } = result;
            if (responseId === _id) return response.data;
            return result;
          });
          setComments({ ...comments, results });
        }, CLOSE_TIME);
      } catch (error) {
        setAlert('서버에서 에러가 발생했습니다.', ALERT_CLASS_NAME_ENUM.error);
      }
    })();
  };

  // 댓글 더 가져오기
  const handleCommentsHasMore = useCallback(async () => {
    const { page, limit, totalPages, results } = comments;
    if (page !== totalPages) {
      const { id } = param;
      const response = await comment.select(page + 1, limit, id);
      const { data } = response;
      setComments({ ...data, results: [...data.results, ...results] });
    }
  }, [comments, param]);

  // 게시글 삭제
  const noticeDelete = useCallback(
    currentId => () => callApi(() => deleteById(currentId)),
    [callApi]
  );

  // 댓글 삭제
  const commentDelete = currentId => async () => {
    try {
      await comment.deleteById(currentId);
      setAlert('댓글이 삭제되었습니다.', ALERT_CLASS_NAME_ENUM.success);
      setComments({
        ...comments,
        results: comments.results.filter(({ _id }) => _id !== id),
      });
    } catch (error) {
      setAlert(
        '댓글 삭제 중  오류가 발생했습니다.',
        ALERT_CLASS_NAME_ENUM.error
      );
    }
  };

  // 첫 랜더시 댓글 10개 호출
  useEffect(() => {
    (async () => {
      try {
        const { id } = param;
        // 게시글 호출
        callApi(() => selectById(id));
        const { data } = await comment.select(1, 10, id);
        setComments(data);
      } catch (error) {
        setAlert(
          '서버 호출 중 오류가 발생했습니다.',
          ALERT_CLASS_NAME_ENUM.error
        );
      }
    })();
  }, [param, callApi]);

  // 첫 호출시 게시글 가져오기
  useEffect(() => {
    if (success) {
      const { data } = success;
      // 게시글 삭제
      if (emptyCheck(data)) {
        history.replace('/noticeBoard');
      } else {
        setPost(data);
      }
    }
  }, [success, history]);

  useEffect(() => {
    if (error) {
      setAlert('서버에서 에러가 발생했습니다.', ALERT_CLASS_NAME_ENUM.error);
    }
  }, [error]);

  const notice = emptyCheck(results) ? (
    <NoComments />
  ) : (
    results.map(comment => (
      <Comment
        ref={up}
        key={comment.id}
        comment={comment}
        currentModifyCommentId={currentModifyCommentId}
        isOpen={isOpen}
        modifyCommentValue={modifyCommentValue}
        modifyDisabled={modifyDisabled}
        setIsOpen={setIsOpen}
        commentDelete={commentDelete}
        handleCommentModify={handleCommentModify}
        commentModifyEditorClose={commentModifyEditorClose}
        handleCommentModifyOnClick={handleCommentModifyOnClick}
        handleCommentModifyOnChange={handleCommentModifyOnChange}
        handleCommentModifyEditorOnUpdate={handleCommentModifyEditorOnUpdate}
      />
    ))
  );

  const commentValueMatch = commentValue.match(COMMENT_VALUE_REGEX);

  return (
    <>
      {alertOpen && (
        <Alert isOpen={alertOpen} setIsOpen={setAlertOpen} closeDelay={3000}>
          {alertMessage}
        </Alert>
      )}
      <Notice
        post={post}
        loading={loading}
        userInfo={userInfo}
        noticeDelete={noticeDelete}
      />
      <div>
        <Form onSubmit={handleOnSubmit}>
          <FlexBox>
            <div>
              <span>들여쓰기</span>
              <span>
                ({commentValueMatch === null ? 0 : commentValueMatch.length})
              </span>
            </div>
            <div>
              <span>최대</span>
              <spsan>({commentValueLength} / 300)</spsan>
            </div>
            <div>
              {emptyCheck(id) ? (
                <span>
                  <Strong>(*)</Strong> 로그인을 해야 댓글등록이 가능합니다.
                </span>
              ) : (
                <span>{id}</span>
              )}
            </div>
          </FlexBox>
          <CommentEditor
            data={commentValue}
            onChange={handleEditorOnChange}
            onUpdate={handleEditorOnUpdate}
          />
          <Button
            disabled={emptyCheck(commentValue) || emptyCheck(id) || disabled}
          >
            등록하기
          </Button>
        </Form>
      </div>
      {notice}
      <div>
        <Button onClick={handleCommentsHasMore} disabled={page === totalPages}>
          더보기
        </Button>
      </div>
    </>
  );
};

export default NoticeBoardSelectContainer;
