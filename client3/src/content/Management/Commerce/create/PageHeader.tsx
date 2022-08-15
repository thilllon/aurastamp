import { Link } from '@/components/Link';
import { ArrowBackTwoTone as ArrowBackTwoToneIcon } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const RootWrapper = styled(Box)(
  () => `
    flex: 1;
`
);

function PageHeader() {
  const { t } = useTranslation();

  return (
    <RootWrapper>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Box>
              <Typography variant='h3' component='h3' gutterBottom>
                {t('Add new product')}
              </Typography>
              <Typography variant='subtitle2'>
                {t('Fill in the fields below to create a new product')}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, sm: 0 } }}
            component={Link}
            startIcon={<ArrowBackTwoToneIcon />}
            href='/management/commerce/products'
            variant='contained'
          >
            {t('Go back to all products')}
          </Button>
        </Grid>
      </Grid>
    </RootWrapper>
  );
}

export default PageHeader;
