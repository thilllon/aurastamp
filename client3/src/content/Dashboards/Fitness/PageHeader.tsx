import { defaultSessionUser } from '@/lib/next-auth-react-query';
import { Avatar, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import { SessionUser } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

function PageHeader() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const user: SessionUser = session?.user ?? defaultSessionUser;

  const theme = useTheme();

  return (
    <Grid container alignItems='center'>
      <Grid item>
        <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant='rounded'
          alt={user.name}
          src={user.image}
        />
      </Grid>
      <Grid item>
        <Typography variant='h3' component='h3' gutterBottom>
          {t('Welcome')}, {user.name}!
        </Typography>
        <Typography variant='subtitle2'>
          {t('These are your analytics stats for today')},
          <b>{format(new Date(), 'MMMM dd yyyy')}</b>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
