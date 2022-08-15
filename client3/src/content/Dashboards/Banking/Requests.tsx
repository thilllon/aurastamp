import { ArrowDownwardTwoTone, RequestPageTwoTone } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.gradients.purple1};
      color:  ${theme.palette.primary.contrastText};
`
);

const ArrowDownwardWrapper = styled(ArrowDownwardTwoTone)(
  ({ theme }) => `
      color:  ${theme.palette.error.main};
`
);

function Requests() {
  const { t } = useTranslation();

  const data: any = {
    value: '$4,486',
  };

  return (
    <Card>
      <CardContent>
        <Box display='flex' alignItems='center'>
          <AvatarWrapper>
            <RequestPageTwoTone />
          </AvatarWrapper>
          <Typography sx={{ ml: 1 }} variant='body1' color='text.secondary' component='div'>
            {t('Requests')}
          </Typography>
        </Box>
        <Box display='flex' alignItems='center' sx={{ ml: -1.5, py: 3, justifyContent: 'center' }}>
          <ArrowDownwardWrapper />
          <Typography variant='h2' color='text.primary'>
            {data.value}
          </Typography>
        </Box>
        <Typography align='center' variant='body2' color='text.secondary' component='div'>
          <b>-23%</b> less than last week
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Requests;
