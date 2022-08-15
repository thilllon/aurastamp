import { HeadMetaTags } from '@/components/HeadMetaTags';
import { Link } from '@/components/Link';
import { BaseLayout } from '@/layouts/BaseLayout';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <>
      <HeadMetaTags
        title={'Aurastamp'}
        description={'aurastamp'}
        keywords={'aurastamp'}
        image={'/static/images/marketings/code-challenge-meta-image.png'}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button color='secondary' LinkComponent={Link} href='/request-demo'>
          {t('얼리 액세스 신청')}
        </Button>
      </Box>
    </>
  );
}

LandingPage.getLayout = (page) => {
  return <BaseLayout>{page}</BaseLayout>;
};
