import React, { useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';

import styled from 'styled-components';

const CommentEditor = ({ ...rest }) => {
  const { onUpdate } = rest;
  const editorConfiguration = useMemo(
    () => ({
      language: 'ko',
      plugins: [Essentials, Paragraph, WordCount],
      placeholder: '댓글을 적어주세요. (최대300자 들여쓰기 20번까지) ',
      wordCount: {
        onUpdate,
      },
    }),
    [onUpdate]
  );

  return (
    <Layout>
      <CKEditor editor={ClassicEditor} config={editorConfiguration} {...rest} />
    </Layout>
  );
};

const Layout = styled.div`
  .ck-editor__editable_inline {
    min-height: 100px;
    max-height: 100px;
  }

  ${({ theme }) => theme.media.tab} {
    font-size: 0.7rem;
  }
  ${({ theme }) => theme.media.mobile} {
    font-size: 0.6rem;
  }
  ${({ theme }) => theme.media.mobileS} {
    font-size: 0.5rem;
  }
`;

export default CommentEditor;
