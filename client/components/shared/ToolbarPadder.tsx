import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Toolbar } from '@mui/material';
import { css } from '@emotion/react';

// mui 툴바 이용시 툴바 사이즈와 동일한 패딩이 필요한 경우 사용함. 툴바 기본 설정 변경시 툴바 패더의 기본설정이 함께 변동되므로 높이 조절에 신경쓰지 않아도 됨

export const ToolbarPadder = () => {
  const theme = useTheme();
  return (
    <Toolbar
      css={css`
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: ${theme.spacing(0, 1)};
      `}
    />
  );
};
