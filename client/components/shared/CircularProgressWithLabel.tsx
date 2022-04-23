import { Box, Tooltip, Typography } from '@mui/material';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import React from 'react';

// Mui CircularProgress의 경우 가운데 수치값을 표현하기 힘듦

// TODO: mui pull request 하기

type CircularProgressWithLabelProps = {
  value?: number;
  title?: string;
} & CircularProgressProps;

export const CircularProgressWithLabel = React.memo(
  ({ value, ...others }: CircularProgressWithLabelProps) => {
    const defaultProps: Partial<CircularProgressProps> = {
      size: 40,
      thickness: 4,
    };

    if (typeof value === 'undefined') {
      return <CircularProgress />;
    }
    if (99 < value && value < 100) {
      value = 99;
    }

    return (
      <Tooltip title={others.title ?? ''}>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            sx={{
              color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700],
            }}
            variant='determinate'
            {...defaultProps}
            {...others}
            value={100}
          />
          <CircularProgress
            variant='determinate'
            sx={{
              animationDuration: '500ms',
              position: 'absolute',
              left: 0,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: 'round',
              },
              // color: (theme) =>
              // value === 100 ? theme.palette.primary.main : theme.palette.gray[500],
            }}
            {...defaultProps}
            {...others}
            value={value}
          />

          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant='caption' component='div' color='text.secondary'>
              {`${Math.round(value)}%`}
            </Typography>
          </Box>
        </Box>
      </Tooltip>
    );
  }
);
