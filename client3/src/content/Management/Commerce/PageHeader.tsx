import { Link } from '@/components/Link';
import { AddTwoTone as AddTwoToneIcon } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function PageHeader() {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent='space-between' alignItems='center'>
      <Grid item>
        <Typography variant='h3' component='h3' gutterBottom>
          {t('Products')}
        </Typography>
        <Typography variant='subtitle2'>
          {t('Use this page to manage your products , the fast and easy way.')}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, sm: 0 } }}
          component={Link}
          href='/management/commerce/products/create'
          variant='contained'
          startIcon={<AddTwoToneIcon fontSize='small' />}
        >
          {t('Create product')}
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
