# 소개

즐겨가는 메가커피에 사이트는 유저의 의견을 건의받는 게시판이 없습니다. 이용하는 유저가 무엇을 원하는지 의견을 받을 수있는 게시판이 있으면 좋겠다 생각해서 만들게되었다.

# 기술스택

## FE

1. react,react-dom 17v
2. styled-components
3. redux-tookit
4. react-router-dom
5. ckeditor5

## BE

1. express 4v
2. multer,multer-s3
3. mongoose
4. jsonwebtoken

# api 목록

| API                  | Method | 설명                     |
| -------------------- | ------ | ------------------------ |
| /api/users           | POST   | 회원가입                 |
| /api/users/:id       | PATCH  | 회원정보 수정            |
| /api/users/me        | GET    | 유저정보 호출            |
| /api/auth/login      | POST   | 로그인                   |
| /api/auth/find/id    | POST   | 유저 아이디찾기          |
| /api/auth/find/pwd   | POST   | 유저 비밀번호찾기        |
| /api/admin/users     | GET    | 등록된 유저 목록         |
| /api/admin/users/:id | GET    | 등록된 유저 가져오기     |
| /api/admin/users     | PATCH  | 등록된 유저정보 수정하기 |
| /api/admin/menu      | GET    | 메뉴 가져오기            |
| /api/admin/menu      | POST   | 메뉴 등록하기            |
| /api/admin/menu      | DELETE | 메뉴 삭제하기            |
| /api/noticeBoard     | GET    | 건의하기 게시글 가져오기 |
| /api/noticeBoard/:id | GET    | 건의하기 게시글 상세     |
| /api/noticeBoard     | POST   | 건의하기 게시글 등록     |
| /api/noticeBoard     | PATCH  | 건의하기 게시글 수정     |
| /api/noticeBoard     | DELETE | 건의하기 게시글 삭제     |
| /api/comments        | GET    | 건의하기 댓글 가져오기   |
| /api/comments/:id    | GET    | 건의하기 댓글 상세       |
| /api/comments        | POST   | 건의하기 댓글 등록       |
| /api/comments/:id    | PATCH  | 건의하기 댓글 수정       |
| /api/comments        | DELETE | 건의하기 댓글 삭제       |

## 개발 후 느낀점

1. 이번에 처음으로 redux-tookit을 이용을 했다. 기존 redux 코드 량이 줄어드는 걸보면서 사용하기 잘한거 같다. createSlice라는 함수 하나로 action, reduce를 모두 끝낼 수 있어서 좋고 tookit은 기본적으로 thunk를 제공을 해준다. 그래서 따로 어떤 미들웨어를 쓸 지 고민을 안 해도된다. 이번 프로젝트에도 thunk를 적용을 했고 tookit에서 제공해주는 createAsyncThunk 함수를 통해 간단히 login api를 처리를 하였다.
2. 이번 프로젝트에서는 이미지들은 모두 s3에서 업로드 하도록 처리를 하였다.
   서버쪽에서 multer-s3를 이용한다면 간단히 s3에 업로드를 할 수 있어서 로컬에서 이미지 관리를 안해도 되어서 너무 편했다.
3. ckeditor5를 이용하여 게시판을 구현을 하였다. 문제는 빌드를 하였을 때 번들링된 용량이 133kb정도 된다. axios가 50kb도 안된다 거의 2.5배가 차이가 난다. 기능은 많지만 다 사용하지않는다. 사용하는 기능에 비해 용량이 너무 큰거 같다. 어떻게하면 줄일 수 있을지 고민을 해봐야겠다. 아니면 대체제 react-quill를 이용을 해보자.
