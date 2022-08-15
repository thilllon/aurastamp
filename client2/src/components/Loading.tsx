import { Skeleton } from '@mui/material';
import { ReactNode } from 'react';

export const Loading = ({ children }: { children: ReactNode }) => {
  return (
    <Skeleton variant='rectangular' sx={{}}>
      {children}
    </Skeleton>
  );
};
