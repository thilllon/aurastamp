# proved.work

# Code Convention

- `react`, `react hooks`, `next.js`에 대한 기본적인 내용은 알고 있다는 전제하에 문서를 작성하였다. 그럼에도 remind가 필요한 부분에 대해서는 해당 프레임워크에 대한 내용을 일부 추가로 기술한다.
- `next.js`는 next로 표기한다.
- server-side render는 ssr로 표기한다.
- Material UI는 mui로 표기한다.

## folder structure

- . (dot) 으로 시작하는 폴더는 next 빌드에 포함되지 않는 리소스이고, 그러함을 명시적으로 나타내기 위해 prefix로 .을 사용한다. 반면에 .으로 시작하지 않는다고 반드시 빌드에 포함되는 것은 아님을 알린다. 그 목록은 `tsconfig.json`을 확인하면 된다.

- `.http`: rest-client를 통해서 API 테스트를 할 수 있는 파일을 모음
- `.husky`: husky 설정 파일
- `.legacy`: 이 프로젝트는 tokyo template을 바탕으로 만들어졌다. 천개 가량의 파일중 현재 사용하지 않는 파일을 모두 .legacy
- `.next`: next build artifacts
- `.sh`: shell script files
- `.vscode`: vscode settings
- `e2e`: end-to-end test code files
- `pages`: next page code files
- `public`: publicly accessible files after deployed
- `src`: pages에서 사용될 코드
- `types`: 프로젝트에서 사용될 type

## overview

### design

- 최대한 mui를 이용하는 방식으로 작성한다. 개발자가 부족한 환경에서 디자인 작업에 리소스를 가장 적게 사용하기 위한 노력이다.
- 모든 html tag는 `@mui/material`에서 import한다.
- theme 파일은 `PureLightTheme.ts`를 사용하고 있다.
- 특정 html tag가 필요한 경우, mui의 property 중 component를 설정한다. 그렇지 않고 html tag 사용시 theme이 수정되는 일이 발생할 시 지옥을 경험한다.
- figma 등 기획문서에 있는 것을 바로 구현하지말고(중요), tokyo template site에서 비슷한 컴포넌트가 있는지 확인하고, 있다면 해당 컴포넌트를 그대로 가져와서 사용한다.
- text는 `Typography`를 사용하고, `dev.proved.work/fonts`
- Link는 @/components/Link에서 가져와서 사용해야한다. 넥스트의 next/link는 일반적인 anchor tag와 동작방식이 다르다.@mui/link의 디자인을 따라야한다. 그 두개를 합친것이 커스텀 링크이다. 이것은 독자적으로 만든게 아니라 도쿄에서 제공되는 컴포넌트이고 실제로 자주 쓰이는 방식이다

## pages

- ssr을 위해 getServerSideProps를 사용하는 경우, 로그인 상태를 필요로 하는 경우가 있다. 이 경우를 위한 wrapper를 만들어두었으므로 이 wrapper를 공통적으로 사용한다.
  - `withAuthGssp`
- 반대로 로그인 화면과 같이 로그인이 되어있지 않아야만 하는 경우를 위한 wrapper도 공통적으로 사용한다.
  - `withoutAuthGssp`
- `_` 경로는 `_middleware.ts`를 직접 읽어보면 알겠지만 개발환경에서만 접근 가능한 경로이다. 여기서 개발시 사용할 테스트 페이지를 구성해 볼 수 있다.

##

# Understanding code structure of Tokyo Nextjs template by Bloom UI

굉장히 많은 파일이 있기때문에 이 가이드가 코드 구조를 파악하는데 도움을 줄 수 있기를 바란다.

https://tokyo-white-nextjs.bloomui.com/dashboards/reports

## layouts

템플릿은 총 6개의 디자인 테마를 제공한다. 여기서는 그 테마를 블루프린트 라는 이름으로 관리한다. 블루프린트는 다음과 같다.

- extended sidebar(이게 기본. 사이드바가 어두운)
- accent header (상단 헤더가 가장 z index가 높은 형태)
- accent sidebar (사이드 바가 가장 zindex가 높은 형태)
- boxed sidebar
- collapsed sidebar
- bottom navigation
- top navigation

- 각 레이아웃안에 실제 화면에서 보여줄 사이드바, 헤더, 칠드런을 그림
- 이때 사이드바, 헤더는 레이아웃에 디펜던시가 있기때문에 src/layouts/{블루프린트종류}/헤더, 사이드바에 파일이 있음

# 리덕스

- 기존에 리덕스를 제거하려고했으나, 모두 제거하고 보니 로그인부터 안되고 있음
- 기존에 로그인 방식을 jwt, auth0, firebase, aws amplifier 를 제공하고 있으나, 우리는 결국 next-auth를 이용하기로 했음.
- 그래서 일단은 돌아가도록 하기위해서 useAuth를 남겨두고, signin시도시 useAuth의 login을 같이 부르는 식으로 "동작하게끔" 해둠

general

- blurpints
- dashboard
- data display
- application

management

- users
- projects
- commerce
- invocies

extra pages

- auth pages
- status

foundations

- overview
- documents

## Page 컴포넌트 작성하기

- 페이지는 1개의 default export를 반드시 가져야한다.
- getServerSideProps를 통해서 서버에서 필요한 데이터를 가져올 수 있다.
- withAuthGssp, withoutAuthGssp를 이용해서 반드시 로그인이 필요한 페이지, 로그아웃된 상태에서만 접근 가능한 페이지를 구분 할 수 있다. auth 관련 로직을 getServerSideProps에 넣게 되면 비지니스 로직과 섞이게 되어 불필요한 코드가 늘어나고 가독성을 해치게된다.

## 디자인

- 오픈소스 material UI 라이브러리를 이용하여 만들어진, tokyo UI 를 사용중이고, 여기서 제공하는 여러 theme 가운데 PureLightTheme을 사용중이다.
- 컴포넌트를 직접 수정하기 보다는 전체 theme을 수정하는 경우가 많을 것이고, 직접 컴포넌트를 수정하는 경우 스타일 수정이 아니라 semantic props를 수정하는것이 옳다.
- 부득이 스타일을 직접 수정해야한다면 style 프로퍼티가 아닌 sx 프로퍼티를 사용한다.
- html 기본 태그를 사용하는것을 지양하고 mui 컴포넌트를 사용해야 디자인 수정이 용이하다.

## guards, layout

guards와 layout은 기능에 따라 나누었다. layout은 디자인 측면으로 나눈것이고guard는 특정 상태일때 화면을렌더링 하지 않도록 막는 역할이다. baselayout은 로그인 유무와 관계없이 보여야하므로 로그인 유무를 확인할때 한번 flicker하게된다. 단계적 화면 shifting을 막기 위해 useSession의 status가 loading상태일때는 화면을 렌더링 하지 않도록 막아주는 Guest guard를 이용한다.
만약 로그인이 반드시 필요한 페이지인 경우 authenticated라른 가드를 쓸 필요없이, getSErverSideProps를 이용하는것이 더 깔끔하고 next.js의 표준 방식이다. 이때 반복되는 코드를 줄이기 위해 withAuthGssp HOC를 만들어두었다.
즉 정리하면,

1. 로그인 해야하는 페이지 => 레이아웃 관계없이 withAuthGssp() 사용
2. 로그인 안해야하는 페이지 => 레이아웃 관계없이 withoutAuthGssp() 사용
3. 로그인 상관없는 페이지 => <Guest> 가드 사용

### sidebar 완전히 없애기

```
사이드바
src/layouts/AccentSidebarLayout/Sidebar/index.tsx # sidebarwrapper에서 lg, xs

헤더
src/layouts/AccentSidebarLayout/Header/index.tsx # 토글버튼

레이아웃
src/layouts/accestsidebarlayout/index # pl:theme.sidebar.width
```

## 해야하는거

import orgnize
export default => named export
material-iccons 전부 named import 로 모으기
useAuth login
redux 제거
fullcallendar 에러
리액트 버전업(17.2에 맞춰뒀다고 되있긴하지만 18기능쓸려면 올려야함)
사이드바 완전 없애는 토글링 기능
sentry

Component.defaultProps 대신에 default value 쓰는 방식으로 수정

## react 18

useDropzone({ accept: { 'image/jpeg': ['jpg'], 'image/png': ['png'] } });

chart의 입력값들 전부 any
autocomplete mui any
swiper v6 -> v8
firebase migration 포기
국기 바꾸기

18에서 깨지는 부분들

http://localhost:3333/dashboards/healthcare/hospital

http://localhost:3333/dashboards/learning

<Hero/>

```

const someHardCalculation = () => {
  for (let i = 0; i < 9999999; i++) {
    i++;
  }
  if (Math.random() > 0.5) {
    throw new Error('Something went wrong');
  }
  return i;
};

const express = require('express');
const app = express();
app
  .get('/', (req, res) => {
    return someHardCalculation();
  })
  .listen(4000);

// understanding of express
// access-control-allow-origin
// async throw
// stringify
// multithreaded

// understanding of javascript
// bigint

// understanding of typescript
// |,&,Omit,Pick,Partial,Readonly,Required,never,undefined,void, extends false

// understanding of react
// HoC
// useEffect cleanup function

// understadning of rxjs
//

```

## codemod

```ts
const IconButtonError = styled(IconButton)(
  ({ theme }) => `
        background: ${theme.colors.error.lighter};
        color: ${theme.colors.error.main};
        width: ${theme.spacing(10)};
        height: ${theme.spacing(10)};
        margin: ${theme.spacing(1.5)};

        &:hover {
            background: ${lighten(theme.colors.error.lighter, 0.4)};
        }
`
);

const FilterOptions = styled(Card)(
  ({ theme }) => `
      padding: ${theme.spacing(2)};
      border: 1px solid ${theme.colors.alpha.black[10]};
  `
);
const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
);

const aaaaaaaaaaa = styled(IconButton)(
  ({ theme }) => `
    @media (max-width: ${theme.breakpoints.values.sm}px) {
      display: none;
    }
    @media (min-width: ${theme.breakpoints.values.md}px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    border: 1px solid ${theme.colors.alpha.black[10]};
    transition: ${theme.transitions.create(['background', 'color'])};
    color: ${theme.colors.alpha.trueWhite[50]};
    position: absolute;
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
    top: 50%;
    margin-top: ${theme.spacing(-1.5)};
    border-radius: 100px;

    &:hover {
      color: ${theme.colors.alpha.trueWhite[100]};
      background: ${theme.colors.alpha.trueWhite[10]};
    }

    &.MuiSwipe-left {
      left: ${theme.spacing(1.5)};
    }
    
    &.MuiSwipe-right {
      right: ${theme.spacing(1.5)};
    }
`
);
```

- backtick으로 시작하는 부분을 css로 인식.
- 해당 부분을 replace
- semicolon으로 모든 행 분리
- colon으로 key, value 분리
- for key, kebab-case에서 camelCase로 변경
- for value, $를 포함하지 않는 경우 single-quote로 묶기
- for value, $로 시작하고 한번만 포함하는 경우 `${}`를 제거
- for value, $를 포함하는 나머지 경우 전체를 backtick으로 묶기
- scss 스타일 multiple depth는 어떻게 고려?
- for media query,
- for media query, max-width의 경우 [theme.breakpoints.up('??')]로 변경
- for media query, min-width의 경우 [theme.breakpoints.down('??')]
- 이때 '??'는 'theme.breakpoints.values.??'

```js
border: `1px solid ${theme.colors.alpha.black[10]}`;
```

```css
@media (max-width: ${theme.breakpoints.values.sm}px);
```

```ts
[theme.breakpoints.up('md')];
```

### autoComplete

- html5
- https://developer.mozilla.org/ko/docs/Web/HTML/Attributes/autocomplete

- axiosClient 관련 수정사항

  - retry 로직
  - axiosError type 수정해서 `verifyEmail.error.response.data.message` 이거를 `error.message`로 쓸수있게 가능한지 확인할것

- `callbackUrl`이 url에 계속 추가되고있음

# react hydration error

https://nextjs.org/docs/messages/react-hydration-error

# git branch

```sh
git checkout dev
git branch -df qa # 로컬 지우고
git push origin :qa # 기존 브랜치 지우고
git checkout -b qa # 다시 만들고
git push --set-upstream origin qa # 새롭게 푸쉬

# 번거로우니 alias 등록
git config alias.qa '!f() { (git checkout dev || true) && (git branch -df qa || true) && (git checkout -b qa || true) && (git push origin :qa || true) && (git push --set-upstream origin qa || true) && (git checkout dev && true) && (git branch -df qa && true) }; f'

git config alias.staging '!f() { (git checkout dev || true) && (git branch -df staging || true) && (git checkout -b staging || true) && (git push origin :staging || true) && (git push --set-upstream origin staging || true) && (git checkout dev && true) && (git branch -df staging && true)}; f'
```

```json
# Axios Error
{
  code: "ERR_NETWORK"
  message: "Network Error"
  name: "AxiosError"
  config: {
    transitional: {…},
    transformRequest: Array(1),
    transformResponse: Array(1),
    timeout: 0,
    adapter: ƒ, …
  }
  request: XMLHttpRequest {
    data: undefined,
    onreadystatechange: null,
    readyState: 4,
    timeout: 0,
    withCredentials: true, …
  }
  response: XMLHttpRequest {
    config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
    data: {statusCode: 409, message: 'Signed up already', error: 'Conflict'}
    headers: {content-length: '67', content-type: 'application/json; charset=utf-8'}
    request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: true, upload: XMLHttpRequestUpload, …}
    status: 409
    statusText: "Conflict"
    …
  }
}
```

### form data validation

```
  ^[a-zA-Z0-9]      # start with an alphanumeric character
  (                 # start of (group 1)
    [._-](?![._-])  # follow by a dot, hyphen, or underscore, negative lookahead to
                    # ensures dot, hyphen, and underscore does not appear consecutively
    |               # or
    [a-zA-Z0-9]     # an alphanumeric character
  )                 # end of (group 1)
  {3,18}            # ensures the length of (group 1) between 3 and 18
  [a-zA-Z0-9]$      # end with an alphanumeric character
                    # To sum up, {3,18} plus the first and last alphanumeric characters,
                    # total length became {5,20}
```
