# functionalities

- [ ] dark mode
- [ ] google analytics
- [ x ] playwright
- [ x ] eslint 설정
- [ x ] husky + lint staged
- [ x ] react-query 적용
- [ x ] i18n
- [ ] 안쓰는 브랜치의 github workflow 의 크론잡 자꾸 동작되는데 지우는 방법
- [ ] 깃 워크플로우 예전 기록 지우기
- [ ] react-draggable
- [ ] development에서만 babel을 쓰도록 next 설정방법 찾기
- [ ] facebook faiss
- [ ] NFT image 주소 찾기
- [ x ] jsx 프라그마 제거 `/** @jsxImportSource @emotion/react */`
- [ ] excel upload
- [ ] react-device-detect
- [ ] avatar uploader
- [ x ] ckeditor
- [ x ] connect mongo
- [ x ] storybook ts
- [ ] mui sample code converter
- [ ] mini variant에 listitembutton 수정
- [ ] https://mui.com/components/buttons/ inputProps로 수정
- [ ] i18n 에러 수정 `react-i18next:: You will need to pass in an i18next instance by using initReactI18next`
- [ ] `AvatarUploader.tsx` 컴포넌트 수정
- [ ] UserProps에서 displayName, userName으로 수정
- [ ] 검색페이지에서 query params로 사용되는 값들을 any가 아니라 특정 타입으로 제한하기
- [ ] 코드에서 type any 없애기
- [ ] 코드에서 console 없애기(주석 포함)

# convention

- `px` 보다 `rem` 쓸 것
- callback event 변수는 `ev`로 통일
- `next/link`를 wrapping한 custom `<Link>`를 사용할 것
- media query 대신 sx props 사용(mui 추천방식)
- 커스텀 서버(next-connect)를 안쓰는 이유는 i18n 미지원
- 대부분의 nextjs server-side plugin library가 next의 버전에 따라 빠른 대응을 안함

# storybook

- https://ideal-succotash-4384c159.pages.github.io/

# misc

- refactoring으로 함수 만들기 onClick handler같은거 만들때 좋을듯
- rename 으로 컨텍스트에 맞게 단어 이름 변경할때 사용
- css peek으로 css 관련 정의부분이동
- peek으로 함수 정의부분 이동
- `Drawer` 레이아웃에서 `container={container}` MUI 예제를 보여줄 때만 custom element이고 기본값은 `document.body`
- https://www.figma.com/file/WZztLxOrLcM1yEkRx8Pyiv/NFT_website-design?node-id=0%3A1
- `css`라는 이름으로 props를 만들면 transpile시 모두 사라지므로 `cssProps`라는 이름으로 통일하여 사용할 것

# deployment

# mui datatables 사용하기위해 이전 버전의 material 패키지 설치 필요

```sh
pnpm add @material-ui/core @material-ui/icons
```
