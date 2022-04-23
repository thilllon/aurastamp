import React, { ReactNode, useState, useEffect, useContext } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { Box, Typography, Container, TypographyProps } from '@mui/material';
import { useRouter } from 'next/router';
import { Link } from '@/components/shared/Link';
import Image from 'next/image';

type CopyableTypographyProps = TypographyProps;

// FIXME: 클릭시 클립보드로 카피되도록 변경
export const CopyableTypography = ({ children }: CopyableTypographyProps) => {
  return (
    <Typography
      sx={{
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'underline',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      {children}
    </Typography>
  );
};
