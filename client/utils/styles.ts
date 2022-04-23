// NOTE: 필요한 경우 추가하여 사용하고 최대한 convention을 지키도록 노력하였음. css props를 통한 inline styling을 하는 경우 반복되는 스타일 구문이 가독성을 해치게 됨. 특히 display를 이용한 스타일링에서 함께 사용되는 스타일 집합이 많음. 해당 스타일 집합을 여기에 정리해두었음.

import { css } from '@emotion/react';

export const frncc = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

export const FRNCC = {
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
};
export const frnce = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-end;
`;

export const frwcc = css`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

export const FRWCC = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  alignItems: 'center',
};

export const fcncc = css`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const FCNCC = {
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  alignItems: 'center',
};

export const fcwcc = css`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
`;

export const FCWCC = {
  display: 'flex',
  flexFlow: 'column wrap',
  justifyContent: 'center',
  alignItems: 'center',
};

export const frnss = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const FRNSS = {
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

export const frwss = css`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const FRWSS = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

export const fcnss = css`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const FCNSS = {
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

export const fcwss = css`
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const FCWSS = {
  display: 'flex',
  flexFlow: 'column wrap',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

export const fcnsc = css`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`;

export const FCNSC = {
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

export const frnsc = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;

export const FRNSC = {
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
};

// white-space: nowrap;
// text-overflow: ellipsis;
// width: 100px;
// overflow: hidden;
// background: gainsboro;
