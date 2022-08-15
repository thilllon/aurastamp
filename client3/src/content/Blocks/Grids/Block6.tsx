import Text from '@/components/Text';
import {
  AccountBalanceWalletTwoTone as AccountBalanceWalletTwoToneIcon,
  MonetizationOnTwoTone as MonetizationOnTwoToneIcon,
  PersonTwoTone as PersonTwoToneIcon,
  SubscriptionsTwoTone as SubscriptionsTwoToneIcon,
} from '@mui/icons-material';
import { Box, Card, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const CardBorderBottom = styled(Card)(
  () => `
    border-bottom: transparent 5px solid;
  `
);

function Block6() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={3}>
        <CardBorderBottom
          sx={{
            borderBottomColor: `${theme.colors.success.main}`,
            py: 3,
            textAlign: 'center',
          }}
        >
          <Text color='success'>
            <PersonTwoToneIcon fontSize='large' />
          </Text>
          <Box mt={0.5}>
            <Typography component='span' variant='h4'>
              1,585
            </Typography>
            <Typography component='span' variant='subtitle2'>
              {t('users')}
            </Typography>
          </Box>
        </CardBorderBottom>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardBorderBottom
          sx={{
            borderBottomColor: `${theme.colors.warning.main}`,
            py: 3,
            textAlign: 'center',
          }}
        >
          <Text color='warning'>
            <MonetizationOnTwoToneIcon fontSize='large' />
          </Text>
          <Box mt={0.5}>
            <Typography component='span' variant='h4'>
              32,595
            </Typography>
            <Typography component='span' variant='subtitle2'>
              {t('clicks')}
            </Typography>
          </Box>
        </CardBorderBottom>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardBorderBottom
          sx={{
            borderBottomColor: `${theme.colors.primary.main}`,
            py: 3,
            textAlign: 'center',
          }}
        >
          <Text color='primary'>
            <AccountBalanceWalletTwoToneIcon fontSize='large' />
          </Text>
          <Box mt={0.5}>
            <Typography component='span' variant='h4'>
              $12,634
            </Typography>
            <Typography component='span' variant='subtitle2'>
              {t('revenue')}
            </Typography>
          </Box>
        </CardBorderBottom>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardBorderBottom
          sx={{
            borderBottomColor: `${theme.colors.error.main}`,
            py: 3,
            textAlign: 'center',
          }}
        >
          <Text color='error'>
            <SubscriptionsTwoToneIcon fontSize='large' />
          </Text>
          <Box mt={0.5}>
            <Typography component='span' variant='h4'>
              643
            </Typography>
            <Typography component='span' variant='subtitle2'>
              {t('sales')}
            </Typography>
          </Box>
        </CardBorderBottom>
      </Grid>
    </Grid>
  );
}

export default Block6;
