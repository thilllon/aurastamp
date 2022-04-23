import { Box } from '@mui/material';
import React from 'react';

type FooterProps = {};

export const Footer = ({}: FooterProps) => {
  return (
    <Box
      component='footer'
      sx={{
        display: 'flex',
        height: 0,
        // border: '2px solid',
        // zIndex: 999,
        // background: 'blue',
      }}
    ></Box>
  );
};
