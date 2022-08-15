import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC, ReactNode } from 'react';

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(4)};
`
);

interface PageTitleWrapperProps {
  children?: ReactNode;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
  return <PageTitle className='MuiPageTitle-wrapper'>{children}</PageTitle>;
};

export default PageTitleWrapper;
