import { defaultSessionUser } from '@/lib/next-auth-react-query';
import { Typography } from '@mui/material';
import { SessionUser } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

function PageHeader() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const user: SessionUser = session?.user ?? defaultSessionUser;

  return (
    <>
      <Typography variant='h2' component='h3' sx={{ py: 1 }}>
        {t('Welcome')}, {user.name}!
      </Typography>
      <Typography variant='h4' color='text.secondary' fontWeight='normal'>
        {t('Since your last login there were')} <b>3</b> {t('new patients appointments and ')}
        <b>10</b> {t('new prescription requests.')}
      </Typography>
    </>
  );
}

export default PageHeader;
