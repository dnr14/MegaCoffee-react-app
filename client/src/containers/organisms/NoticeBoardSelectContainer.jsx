import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { selectById, deleteById } from '@/api/userNoticeBoard';
import useFetch from '@/hooks/useFetch';
import Loading from '@/components/atoms/Loading';
import Alert from '@/components/atoms/Alert';
import Notice from '@/components/molecules/Notice';
import { emptyCheck, isEmptyObject } from '@/utils/validations';
import Empty from '@/components/atoms/Empty';
import CommentEditor from '@/components/molecules/CommentEditor';
import Button from '@/components/atoms/Button';
import Form from '@/components/atoms/Form';
import * as comment from '@/api/comment';
import Comment from '@/components/molecules/Comment';
import NoComments from '@/components/molecules/NoComments';
import FlexBox from '@/components/atoms/FlexBox';
import Strong from '@/components/atoms/Strong';

const CLOSE_TIME = 600;

const NoticeBoardSelectContainer = () => {
  const [post, setPost] = useState({});
  const [checkedId, setCheckedId] = useState(null);
  const [comments, setComments] = useState({});
  const [commentsValue, setCommentsValue] = useState('');
  const [modifyCommentValue, setModifyCommentValue] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const userInfo = useSelector(({ login }) => login);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const param = useParams();
  const { state, callApi } = useFetch();
  const { loading, error, success } = state;
  const { page, totalPages } = comments;
  const up = useRef();

  // 댓글 수정 모달 닫기
  const commentModifyEditorClose = () => {
    if (up.current instanceof Function) up.current();
  };

  // 댓글 쓰기 state 입력
  const handleEditorOnChange = useCallback(
    (_, editor) => {
      const regex = /&nbsp;/gi;
      if (editor.getData().match(regex) !== null) {
        if (editor.getData().match(regex).length > 20) {
          setCommentsValue(commentsValue);
        } else {
          setCommentsValue(editor.getData());
        }
      } else {
        setCommentsValue(editor.getData());
      }
    },
    [commentsValue]
  );

  // 댓글 수정 들여쓰기 제한
  const handleCommentModifyOnChange = (_, editor) => {
    const regex = /&nbsp;/gi;
    if (editor.getData().match(regex) !== null) {
      if (editor.getData().match(regex).length > 20) {
        setModifyCommentValue(commentsValue);
      } else {
        setModifyCommentValue(editor.getData());
      }
    } else {
      setModifyCommentValue(editor.getData());
    }
  };

  // 댓글 입력하기 api
  const handleOnSubmit = e => {
    e.preventDefault();

    if (emptyCheck(commentsValue)) {
      setAlertOpen(true);
      setAlertMessage(
        <div className="red">
          <span>댓글을 입력해주세요.</span>
        </div>
      );
      return;
    }

    const writer = userInfo.id;
    const { id } = param;

    const obj = { body: commentsValue, writer, id };

    comment.insert(obj).then(response => {
      const { data } = response;

      setAlertOpen(true);
      setAlertMessage(
        <div className="green">
          <span>댓글이 등록되었습니다.</span>
        </div>
      );
      setCommentsValue('');
      setComments(prev => ({
        ...prev,
        results: [data, ...prev.results],
      }));
    });
  };

  // 댓글 수정하기 모달 열기
  const handleCommentModifyOnClick = id => () => {
    const [comment] = comments.results.filter(comment => {
      const { _id } = comment;
      return _id === id;
    });
    const { body } = comment;
    commentModifyEditorClose();
    setTimeout(() => {
      setModifyCommentValue(body);
      setCheckedId(id);
      setIsOpen(true);
    }, CLOSE_TIME);
  };

  // 댓글 수정하기 api
  const handleCommentModify = id => () => {
    const value = modifyCommentValue;

    if (emptyCheck(value)) {
      setAlertOpen(true);
      setAlertMessage(
        <div className="red">
          <span>댓글을 입력해주세요.</span>
        </div>
      );
      return;
    }

    comment
      .modifyById(id, { body: value })
      .then(response => {
        setAlertOpen(true);
        setAlertMessage(
          <div className="green">
            <span>댓글이 수정되었습니다.</span>
          </div>
        );
        commentModifyEditorClose();
        setTimeout(() => {
          const { _id: responseId } = response.data;

          setComments(prev => {
            const { results } = prev;
            const newResults = results.map(result => {
              const { _id } = result;
              if (responseId === _id) return response.data;
              return result;
            });

            return {
              ...prev,
              results: newResults,
            };
          });
        }, CLOSE_TIME);
      })
      .catch(() => {
        setAlertOpen(true);
        setAlertMessage(
          <div className="red">
            <span>서버에서 에러가 발생했습니다.</span>
          </div>
        );
      });
  };

  // 댓글 더 가져오기
  const handleCommentsHasMore = () => {
    const { page, limit, totalPages } = comments;
    if (page === totalPages) return;
    const { id } = param;
    comment.select(page + 1, limit, id).then(response => {
      const { data } = response;
      setComments(prev => ({
        ...data,
        results: [...data.results, ...prev.results],
      }));
    });
  };

  // 게시글 삭제
  const boardDelete = useCallback(
    id => () => callApi(() => deleteById(id)),
    [callApi]
  );

  // 댓글 삭제
  const commentDelete = id => () => {
    comment.deleteById(id).then(() => {
      const { results } = comments;
      const newResults = results.filter(result => {
        const { _id } = result;
        return _id !== id;
      });
      setAlertOpen(true);
      setAlertMessage(
        <div className="green">
          <span>댓글이 삭제되었습니다.</span>
        </div>
      );
      setComments({
        ...comments,
        results: newResults,
      });
    });
  };

  // 첫 랜더시 댓글 10개 호출
  useEffect(() => {
    const { id } = param;
    callApi(() => selectById(id));
    comment.select(1, 10, id).then(re => {
      setComments(re.data);
    });
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

  // api 에러시 모달 오픈
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

  // 첫랜더시 css 높이 잡아는주는 용도
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
      <Notice post={post} userInfo={userInfo} boardDelete={boardDelete} />
      <div>
        <Form onSubmit={handleOnSubmit}>
          <FlexBox>
            <div>
              <span>들여쓰기</span>
              <span>
                (
                {commentsValue.match(/&nbsp;/gi) === null
                  ? 0
                  : commentsValue.match(/&nbsp;/gi).length}
                )
              </span>
            </div>
            {userInfo.id ? (
              <span>{userInfo.id}</span>
            ) : (
              <span>
                <Strong>(*)</Strong> 로그인을 해야 댓글등록이 가능합니다.
              </span>
            )}
          </FlexBox>
          <CommentEditor data={commentsValue} onChange={handleEditorOnChange} />
          <Button>등록하기</Button>
        </Form>
      </div>
      {comments.results.length !== 0 ? (
        comments.results.map(comment => (
          <Comment
            ref={up}
            key={comment.id}
            checkedId={checkedId}
            comment={comment}
            isOpen={isOpen}
            modifyCommentValue={modifyCommentValue}
            setIsOpen={setIsOpen}
            commentDelete={commentDelete}
            handleCommentModify={handleCommentModify}
            commentModifyEditorClose={commentModifyEditorClose}
            handleCommentModifyOnClick={handleCommentModifyOnClick}
            handleCommentModifyOnChange={handleCommentModifyOnChange}
          />
        ))
      ) : (
        <NoComments />
      )}
      <div>
        <Button onClick={handleCommentsHasMore} disabled={page === totalPages}>
          더보기
        </Button>
      </div>
    </>
  );
};

export default NoticeBoardSelectContainer;
