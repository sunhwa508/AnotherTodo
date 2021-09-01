# 프리온보딩 Assignment 9 - [페이워크]

## 📽 미리보기

![화면 기록 2021-09-01 오후 4 27 08](https://user-images.githubusercontent.com/61695175/131630609-a5219f9d-e53a-4aaa-9cc2-e13fea94cb8d.gif)

# 🗓 개발 기간

2021/08/30 ~ 2021/09/02

# 📚 구현 사항

`전역상태관리` -
redux, redux-saga 전역 상태 관리 구현
(todo, modal, toast)

`컴포넌트` -
header, Todo리스트, 상세모달, Toast 컴포넌트 구현

`CRUD` - Todo 생성, 수정, 삭제 기능 구현

`필터링` - 생성일, deadline 순 정렬 필터 기능 구현

`백엔드` - Strapi, Postgres api 구현

# 🔨 기술스택 및 사용 라이브러리

> React, Typescript, Redux, Redux-saga, strapi, postgres

1. `"react-icons": "^4.2.0"` <br/>
   다양한 icons 사용을 위한 라이브러리
2. `"immer": "^9.0.5"` <br/>
   불변성을 지키다 보면 생길수 있는 복잡한 코드의 간결한 작성을 도와주는 라이브러리
3. `"react-datepicker": "^4.2.1"` <br/>
   deadLine설정을 위한 달력 라이브러리
4. `"redux-devtools-extension": "^2.13.9"` <br/>
   리덕스 디버깅을 위한 리덕스 개발자 도구
   Redux DevTool은 크롬 익스텐션 다운로드를 통해 사용 가능

# 📱 설치 및 시작하는 법

이 프로젝트는 Create React App으로 생성되었습니다.

> This project was bootstrapped with Create React App.

#### `yarn`

프로젝트에 필요한 npm packages, node_modules 다운로드

#### `yarn start`

개발모드로 웹 환경을 시작하는 명령어로
접속주소는 http://localhost:3000 입니다.

#### `yarn build`

빌드하는 명령어로 현재 설정되어있는 환경 변수에 따라 빌드 됩니다.

## 💄 코드 스타일 가이드

1. 코드 스타일의 일관성을 유지하기 위해 `eslint` 기반의 `airbnb-typescript` 규칙을 사용합니다.

2. `prettier` 플러그인을 사용하여 스타일을 관리합니다.

## 🌐 배포

> Netlify 무료배포 사이트를 이용해 배포하였습니다.

### [배포링크](https://paywork-todo.netlify.app)

## Reference

api 참조 - [api명세서](https://noisy-vertebra-1b7.notion.site/Todolist-api-c4b7d3cf69a84ca3b6fa402198d2b634)
immer 관련 문서 - [immer 도입하기](https://velog.io/@sunhwa508/immer-%EB%8F%84%EC%9E%85%ED%95%98%EA%B8%B0)
