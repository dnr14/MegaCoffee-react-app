import React, { useContext, useEffect, useState } from 'react';
import CoustomEditor from '@/components/molecules/CustomEditor';
import { menuInsert } from '@/api/admin';
import ThumbnailBox from '@/components/molecules/ThumbnailBox';
import InsertMenubar from '@/components/molecules/InsertMenubar';
import Button from '@/components/atoms/Button';
import AdminMenuBox from '@/components/molecules/AdminMenuBox';
import MenuEditor from '@/components/molecules/MenuEditor';
import { emptyCheck } from '@/utils/validations';
import { MenuContext } from './MenuContextProvider';
import Thumbnail from '@/components/atoms/Thumbnail';
import Form from '@/components/atoms/Form';
import Alert from '@/components/atoms/Alert';
import useFetch from '@/hooks/useFetch';
import Loading from '@/components/atoms/Loading';
import Title from '@/components/atoms/Title';

const CATEGORY_ENUMS = {
  coffee: '커피',
  beverage: '음료',
  tea: '차',
  juice: '쥬스',
  ade: '에이드',
};

const TEMPERATURE_ENUMS = {
  hot: '따뜻한',
  ice: '차가운',
};

const MenuInsertContainer = () => {
  const { setList } = useContext(MenuContext);
  const [editorValue, setEditorValue] = useState('');
  const [fileValue, setFileValue] = useState(null);
  const [base64, setBase64] = useState(null);
  const [category, setCategory] = useState('coffee');
  const [temperature, setTemperature] = useState('hot');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [temperatureOpen, setTemperatureOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const { state, callApi } = useFetch();
  const { loading, success, error } = state;

  const handleOnSubmit = e => {
    e.preventDefault();
    const { target } = e;
    const titleValue = target.title.value;
    const categoryValue = category;
    const temperatureValue = temperature;
    const bodyValue = editorValue;

    if (
      emptyCheck(titleValue) ||
      emptyCheck(categoryValue) ||
      emptyCheck(temperatureValue) ||
      emptyCheck(bodyValue)
    ) {
      setAlertOpen(true);
      setAlertMessage(
        <div className="red">
          <span>내용을 채워 주세요.</span>
        </div>
      );
      return;
    }

    const formData = new FormData();
    formData.append('title', titleValue);
    formData.append('category', categoryValue);
    formData.append('temperature', temperatureValue);
    formData.append('body', editorValue);
    formData.append('image', fileValue);
    callApi(() => menuInsert(formData));
    setBase64(null);
    setEditorValue('');
    target.title.value = '';
  };

  const handleEditorOnChange = (_, editor) => setEditorValue(editor.getData());
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
  const handleImgRemoveClick = () => setBase64(null);
  const hanleMenuOpenClose = e => {
    if (e.defaultPrevented) return;
    setCategoryOpen(false);
    setTemperatureOpen(false);
  };

  const handleCategoryOpenClick = e => {
    e.preventDefault();
    if (temperatureOpen === false) setCategoryOpen(true);
  };
  const handleTemperatureOpenClick = e => {
    e.preventDefault();
    if (categoryOpen === false) setTemperatureOpen(true);
  };

  const handleCategoryClicked = e => setCategory(e.target.id);
  const handleTemperatureClicked = e => setTemperature(e.target.id);

  useEffect(() => {
    if (success) {
      const { data } = success;
      setList(prevState => ({
        ...prevState,
        results: [data, ...prevState.results],
      }));
      setAlertOpen(true);
      setAlertMessage(
        <div className="green">
          <span>메뉴가 등록되었습니다.</span>
        </div>
      );
    }
  }, [success, setList]);

  useEffect(() => {
    if (error) {
      console.error(error);
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
      <Title>음료 사진</Title>
      <Form onSubmit={handleOnSubmit} onClick={hanleMenuOpenClose}>
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
        <AdminMenuBox>
          <InsertMenubar
            currentId={temperature}
            ENUMS={TEMPERATURE_ENUMS}
            isOpen={temperatureOpen}
            setIsOpen={setTemperatureOpen}
            menuClick={handleTemperatureOpenClick}
            menuClicked={handleTemperatureClicked}
          />
          <InsertMenubar
            currentId={category}
            ENUMS={CATEGORY_ENUMS}
            isOpen={categoryOpen}
            setIsOpen={setCategoryOpen}
            menuClick={handleCategoryOpenClick}
            menuClicked={handleCategoryClicked}
          />
        </AdminMenuBox>
        <MenuEditor>
          <CoustomEditor
            id="body"
            data={editorValue}
            onChange={handleEditorOnChange}
          />
        </MenuEditor>
        <Button>제출하기</Button>
      </Form>
    </>
  );
};

export default MenuInsertContainer;
