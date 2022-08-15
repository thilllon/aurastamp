import { LiveHelpTwoTone as LiveHelpTwoToneIcon } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.primary.main};
      color: ${theme.palette.getContrastText(theme.colors.primary.main)};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.primary};
      margin-right: ${theme.spacing(2)};
`
);

function PageHeader() {
  const { t } = useTranslation();

  return (
    <Box display={{ sm: 'block', md: 'flex' }} alignItems='center'>
      <AvatarPrimary sx={{ mb: { xs: 2, md: 0 } }} variant='rounded'>
        <LiveHelpTwoToneIcon fontSize='large' />
      </AvatarPrimary>
      <Box>
        <Typography variant='h3' component='h3' gutterBottom>
          {t('Helpdesk')}
        </Typography>
        <Typography variant='subtitle2'>
          Rachael Simons, {t('this is your helpdesk dashboard overview for today')},
          <b>{format(new Date(), 'MMMM dd yyyy')}</b>
        </Typography>
      </Box>
    </Box>
  );
}

export default PageHeader;
