import Button from '../atoms/Button';
import Form from '../atoms/Form';
import CoustomEditor from './CustomEditor';
import React from 'react';
import styled from 'styled-components';

const Modify = ({ post, editorValue, handleOnSubmit, handleEditorOnChange }) => {
  const { title, categoryThumbnail } = post;

  return (
    <div>
      <TitleBox>
        <h6>{title}</h6>
      </TitleBox>
      <ImgBox>
        <img src={categoryThumbnail} alt="thumbnail" />
      </ImgBox>
      <Form onSubmit={handleOnSubmit}>
        <CoustomEditor data={editorValue} onChange={handleEditorOnChange} />
        <Button>수정하기</Button>
      </Form>
    </div>
  );
};

const TitleBox = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 1.1;
  ${({ theme }) => theme.media.tab} {
    font-size: 2.5rem;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 1.5rem;
  }
  ${({ theme }) => theme.media.mobileS} {
    font-size: 1.2rem;
  }
`;

const ImgBox = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 400px;
  }
`;

export default Modify;
