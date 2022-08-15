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
      <Typography variant='h3' component='h3' gutterBottom>
        {t('Finance Dashboard')}
      </Typography>
      <Typography variant='subtitle2'>
        {user.name}, {t('This could be your beautiful finance administration panel.')}
      </Typography>
    </>
  );
}

export default PageHeader;
