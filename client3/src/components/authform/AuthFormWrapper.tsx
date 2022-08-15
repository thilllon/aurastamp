import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AuthFormWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  width: '100%',
  height: 'auto',
  minHeight: `calc(100vh - ${theme.header.height})`, // header를 제외한 높이만큼 높이를 지정하기 위함
  [theme.breakpoints.up('md')]: {
    height: '100%',
  },
  justifyContent: 'center',
  alignItems: 'center',
}));

export const AuthFormContainer = ({ children }) => {
  return (
    <Container maxWidth='xs' sx={{ py: { xs: 2, md: 4 } }}>
      {children}
    </Container>
  );
};
