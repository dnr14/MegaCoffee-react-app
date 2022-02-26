import { menuSelect } from '@/api/admin';
import { insert } from '@/api/userNoticeBoard';
import Alert from '@/components/atoms/Alert';
import Button from '@/components/atoms/Button';
import Form from '@/components/atoms/Form';
import Loading from '@/components/atoms/Loading';
import Thumbnail from '@/components/atoms/Thumbnail';
import CoustomEditor from '@/components/molecules/CustomEditor';
import InsertMenubar from '@/components/molecules/InsertMenubar';
import Slide from '@/components/molecules/Slide';
import ThumbnailBox from '@/components/molecules/ThumbnailBox';
import useFetch from '@/hooks/useFetch';
import { emptyCheck } from '@/utils/validations';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const CATEGORY_ENUMS = {
  coffee: '커피',
  beverage: '음료',
  tea: '차',
  juice: '쥬스',
  ade: '에이드',
};

const NoticeBoardInsertContainer = () => {
  const [list, setList] = useState([]);
  const history = useHistory();
  const { user } = useSelector(({ login }) => login);
  const [checked, setChecked] = useState(null);
  const [base64, setBase64] = useState(null);
  const [fileValue, setFileValue] = useState(null);
  const [editorValue, setEditorValue] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [category, setCategory] = useState('coffee');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const { state, callApi } = useFetch();
  const { loading, success, error } = state;

  const handleEditorOnChange = (_, editor) => setEditorValue(editor.getData());
  const handleClick = ({ currentTarget }) => {
    let obj;
    const { id } = currentTarget;
    list.forEach(rows => {
      rows.forEach(cols => {
        if (cols.id === id) {
          obj = cols;
        }
      });
    });

    setChecked({ obj, id });
  };
  const handleImgRemoveClick = () => setBase64(null);
  const handleFileOnchange = async ({ target }) => {
    const file = target.files[0];
    const toBase64 = file =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    const base64 = await toBase64(file);
    setBase64(base64);
    setFileValue(file);
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    const { target } = e;
    const titleValue = target.title.value;
    const bodyValue = editorValue;
    const categoryObj = checked?.obj ?? '';
    if (emptyCheck(titleValue) || emptyCheck(bodyValue) || emptyCheck(categoryObj)) {
      setAlertOpen(true);
      setAlertMessage(
        <div className="red">
          <span>내용을 채워 주세요.</span>
        </div>
      );
      return;
    }

    const { category, thumbnail } = categoryObj;
    const formData = new FormData();
    formData.append('title', titleValue);
    formData.append('category', category);
    formData.append('categoryThumbnail', thumbnail);
    formData.append('writer', user.id);
    formData.append('body', bodyValue);
    formData.append('image', fileValue);
    callApi(() => insert(formData));
    setBase64(null);
    setEditorValue('');
    target.title.value = '';
  };

  const handleCategoryOpenClick = e => {
    e.preventDefault();
    setCategoryOpen(true);
  };
  const handleCategoryClicked = e => setCategory(e.target.id);
  const hanleMenuOpenClose = e => {
    if (e.defaultPrevented) return;
    setCategoryOpen(false);
  };

  useEffect(() => {
    const page = 1;
    const limit = 100;
    const COL_COUNT = 10;
    (async () => {
      const { data } = await menuSelect(page, limit, category);
      const { results } = data;
      const slideArray = [];
      results.forEach((el, idx) => {
        const index = Math.floor(idx / COL_COUNT);
        const obj = {
          ...el,
          checked: false,
        };
        if (slideArray[index]) {
          slideArray[index].push(obj);
        } else {
          slideArray[index] = [];
          slideArray[index].push(obj);
        }
      });
      slideArray.push(slideArray[0]);
      setList(slideArray);
    })();
  }, [category]);

  useEffect(() => {
    if (checked) {
      setList(prevList =>
        prevList.map(rows =>
          rows.map(cols => (cols.id === checked.id ? { ...cols, checked: true } : { ...cols, checked: false }))
        )
      );
    }
  }, [checked]);

  useEffect(() => {
    if (success) {
      history.replace('/noticeBoard');
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

  return (
    <>
      {alertOpen && (
        <Alert isOpen={alertOpen} setIsOpen={setAlertOpen} closeDelay={3000}>
          {alertMessage}
        </Alert>
      )}
      <Loading loading={loading} />
      <h2>건의가 필요한 {CATEGORY_ENUMS[category]}를 클릭 해주세요.</h2>
      <Layout onClick={hanleMenuOpenClose}>
        <InsertMenubar
          currentId={category}
          ENUMS={CATEGORY_ENUMS}
          isOpen={categoryOpen}
          setIsOpen={setCategoryOpen}
          menuClick={handleCategoryOpenClick}
          menuClicked={handleCategoryClicked}
        />
      </Layout>
      <Slide list={list} slideCardClickEevent={handleClick} />
      <Form onSubmit={handleOnSubmit}>
        <div>
          <h6>제목</h6>
          <TitleInput type="text" id="title" maxLength={100} placeholder="제목을 입력해주세요." />
        </div>
        <div>
          <ThumbnailBox>
            <Thumbnail>
              {base64 ? (
                <>
                  <span onClick={handleImgRemoveClick}>제거</span>
                  <img src={base64} alt="thumbnail" />
                </>
              ) : (
                <>
                  <label htmlFor="image">
                    썸네일 업로드
                    <input type="file" id="image" onChange={handleFileOnchange} />
                  </label>
                </>
              )}
            </Thumbnail>
          </ThumbnailBox>
        </div>
        <div>
          <CoustomEditor id="body" data={editorValue} onChange={handleEditorOnChange} />
        </div>
        <Button>출간하기</Button>
      </Form>
    </>
  );
};

const Layout = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  height: 45px;
  box-sizing: border-box;
  border: 1px solid transparent;
  margin-top: 10px;
  ${({ theme }) => theme.boxShadow3};
`;

export default NoticeBoardInsertContainer;
