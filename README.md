<h2 align=center > 메가 커피 클론 프로젝트 📚 </h2>

<p align=center> 📆 2021.10.13 ~ 2022.11.20</p>

<div align=center>
    <img src="https://img.shields.io/badge/17.0.2-React-61DAFB?style=flat&logo=react&logoColor=61DAFB"/>
    <img src="https://img.shields.io/badge/5.58.2-Webpack-8DD6F9?style=flat&logo=webpack&logoColor=8DD6F9"/>
    <img src="https://img.shields.io/badge/5.3.0-React router dom-CA4245?style=flat&logo=react router&logoColor=CA4245"/>
    <img src="https://img.shields.io/badge/1.6.2-Redux/toolkit-764ABC?style=flat&logo=redux&logoColor=764ABC"/>
    <img src="https://img.shields.io/badge/5.3.1-Styled components-DB7093?style=flat&logo=styled-components&logoColor=DB7093"/>
    <img src="https://img.shields.io/badge/0.23.0-Axios-FF9E0F?style=flat&logo=axios&logoColor=FF9E0F"/>
    <img src="https://img.shields.io/badge/4.17.1-Express-000000?style=flat&logo=Express&logoColor=000000"/>
    <img src="https://img.shields.io/badge/8.5.1-Jsonwebtoken-000000?style=flat&logo=JSON Web Tokens&logoColor=000000"/>
    <img src="https://img.shields.io/badge/6.0.11-Mongoose-47A248?style=flat&logoColor=47A248"/>
    <img src="https://img.shields.io/badge/1.4.3-Multer-F7B93E?style=flat&logoColor=F7B93E"/>
    <img src="https://img.shields.io/badge/2.10.0-MulterS3-F7B93E?style=flat&logoColor=F7B93E"/>
    <img src="https://img.shields.io/badge/7.32.0-Eslint-4B32C3?style=flat&logo=eslint&logoColor=4B32C3"/>
    <img src="https://img.shields.io/badge/2.4.1-Prettier-F7B93E?style=flat&logo=Prettier&logoColor=F7B93E"/>
    <img src="https://img.shields.io/badge/GitHub Actions-2088FF?style=flat&logo=GitHub Actions&logoColor=FFF"/>
    <img src="https://img.shields.io/badge/Amazon Aws-232F3E?style=flat&logo=Amazon Aws&logoColor=FFF"/>
    <img src="https://img.shields.io/badge/Amazon S3-569A31?style=flat&logo=Amazon S3&logoColor=FFF"/>
</div>

</br>

<p align=center><img src=./client/src/assets/images/main.gif/
width=80%  /></p>
<p align=center> 🏠 <a href=http://megacoffee-project.s3-website.ap-northeast-2.amazonaws.com>웹 페이지</a></p>
<p align=center> 💼 <a href=https://github.com/Book-Pie/FE/wiki>서비스 화면 구성 및 기능 링크</a></p>

## 1. 프로젝트 살펴보기 🔎

### 🔥 개요

자주 이용하는 메가 커피에 사이트는 사용자의 의견을 건의받는 게시판이 없습니다. 이용하는 사용자가 무엇을 원하는지 의견을 받을 수가 있는 게시판이 있으면 좋겠다고 생각해서 만들게 되었습니다.

<hr/>

### ⭐️ 주요 기능

- 사용자
  - 건의게시판 : 사용자는 간단한 회원가입 후 게시판에 음료 개선 사항을 건의 할 수 있습니다.
- 관리자
  - 사용자 관리 : 관리자 계정은 사용자의 상태(활동, 정지, 삭제) 및 권한을 관리 할 수 있습니다.
  - 메뉴 등록 : 관리자는 메뉴 게시판에 메뉴(커피, 음료, 차, 주스, 에이드)를 추가 할 수 있습니다.

<hr/>

### 💻 기술 스택

- `React` : 웹UI 라이브러리
- `Styled-components` : css-in-js을 통해 컴포넌트 스타일을 관리하기 위해 사용했습니다.
- `Redux/tookit` : 클라이언트 전역상태 관리 라이브러리
- `Express` : 웹서버를 구축을 위한 프레임워크
- `multer/multer-s3` : 이미지 처리 및 S3에 업로드를 위한 라이브러리
- `Mongoose` : MongoDB를 지원하는 라이브러리
- `Jsonwebtoken` : JWT 방식을 사용하기위한 라이브러리
- `Webpack` : 모듈을 병합하여 하나의 결과물을 만들기 위해 사용했습니다.
- `Babel` : JSX 코드 JS로 변경해주는 트랜스파일러

### 🤖 백엔드 API 목록

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
| /api/notice          | GET    | 건의하기 게시글 가져오기 |
| /api/notice/:id      | GET    | 건의하기 게시글 상세     |
| /api/notice          | POST   | 건의하기 게시글 등록     |
| /api/notice          | PATCH  | 건의하기 게시글 수정     |
| /api/notice          | DELETE | 건의하기 게시글 삭제     |
| /api/comments        | GET    | 건의하기 댓글 가져오기   |
| /api/comments/:id    | GET    | 건의하기 댓글 상세       |
| /api/comments        | POST   | 건의하기 댓글 등록       |
| /api/comments/:id    | PATCH  | 건의하기 댓글 수정       |
| /api/comments        | DELETE | 건의하기 댓글 삭제       |

## 2. 개발 살펴보기 👤

### 🪚 개발을 위한 툴

- Git, Github
  - 코드 버전 관리 및 공유하기 위해 사용했습니다.

### 🪚 Git 컨벤션

[Git Flow 전략](https://techblog.woowahan.com/2553/)을 따릅니다.

배포를 위해 사용하고 있는 S3에서 Main 브랜치에 커밋 푸시가 일어날 때마다 배포를 진행하므로 배포를 진행해야 할 때에만 Main 브랜치에 머지를 진행합니다.

- 브랜치 종류
  - main: main 브랜치를 기준으로 배포를 진행합니다.
  - develop: 개발을 진행하는 중심 브랜치입니다.
  - release: QA를 진행하는 브랜치입니다.
  - feature: 새로운 기능을 개발하는 브랜치입니다.

### 👨‍💻 배포 방식 및 환경

<p align=center><img src=./client/src/assets/images/deploy.png/
/></p>

<h4 align=center>배포 환경 그림</h4>

<br>

> #### 📜 배포 과정 설명

1. main branch에서 push를 진행를 합니다.
2. main branch push를 감지한 github은 git action 배포 스크립트를 실행합니다.
3. 빌드가 완료되고 AWS S3에 파일을 배포를하고 사용자는 배포된 사이트([메가커피 사이트](http://megacoffee-project.s3-website.ap-northeast-2.amazonaws.com/))를 접속합니다.

## 3. 🧑‍🎓 개발 후 느낀점

- 이번에 처음으로 Redux/tookit을 이용 하였습니다. 기존 Redux 코드 량이 줄어드는 걸보면서 사용하기 잘한거 같다 생각하였습니다. createSlice라는 함수 하나로 action, reduce를 모두 끝낼 수 있어서 좋고 tookit은 기본적으로 Thunk를 제공을 하여 따로 미들웨어 선택하는 고민이 없었습니다. tookit에서 제공해주는 createAsyncThunk 함수를 통해 간단히 미들웨어 단에서 비동기 통신을 할 수 있었습니다.

- 프로젝트에서 이미지들은 모두 S3에서 업로드 하도록 처리를 하였습니다.
  서버쪽에서 multer-s3를 이용한다면 간단히 S3에 업로드를 할 수 있어서 로컬에서 이미지 관리를 안해도 되어서 편했습니다.

- 클라이언트, 서버를 혼자 개발하면서 기간도 오래 걸렸지만 프론트와 백엔드가 통신하는 흐름을 더 이해할 수 있게 되었습니다. 실제 배포를 해보면서 배포 프로세스에 대해 조금은 이해한 거 같습니다. 다음 프로젝트에는 테스트 서버를 구축 후 개발하는 걸 목표입니다.

- Git Action CD 도구를 이용하여 간단히 배포를 해보았습니다. 직접 S3에 배포하거나 AWS CLI를 이용하지 않아도 자동으로 배포를 해주어서 좋은 경험이었습니다.
