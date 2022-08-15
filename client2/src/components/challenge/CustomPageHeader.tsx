import { Box, Container, Typography } from '@mui/material';

export const CustomPageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <Container maxWidth={'lg'}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
          paddingY: (theme) => theme.spacing(4),
        }}
      >
        <Box display='flex' alignItems='center'>
          <Box>
            <Typography variant='h3' component='h3' gutterBottom>
              {title}
            </Typography>
            <Typography variant='subtitle2'>{subtitle}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
