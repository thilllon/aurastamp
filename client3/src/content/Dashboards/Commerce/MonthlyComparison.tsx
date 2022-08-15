import Label from '@/components/Label';
import { ArrowDownwardTwoTone, ArrowUpwardTwoTone } from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const ArrowUpwardWrapper = styled(ArrowUpwardTwoTone)(
  ({ theme }) => `
      color:  ${theme.palette.success.main};
`
);

const ArrowDownwardWrapper = styled(ArrowDownwardTwoTone)(
  ({ theme }) => `
      color:  ${theme.palette.error.main};
`
);

function MonthlyComparison() {
  const { t } = useTranslation();

  const data: any = {
    visitors: '65.485',
    conversion: '15.65%',
    revenue: '$8,486',
  };

  return (
    <Card sx={{ pt: 1, px: 1, height: '100%' }}>
      <CardHeader
        title={
          <>
            {t('Monthly Comparison')}
            <Typography variant='body2' component='span' fontWeight='bold' color='text.secondary'>
              (12 {t('weeks')})
            </Typography>
          </>
        }
      />
      <CardContent>
        <Box
          sx={{
            px: { lg: 4 },
            pt: 2,
            pb: 1,
            height: '100%',
            flex: 1,
            textAlign: 'center',
          }}
        >
          <Grid spacing={3} container>
            <Grid xs={12} sm item>
              <Typography variant='caption' gutterBottom>
                {t('Revenue')}
              </Typography>
              <Typography variant='h3' gutterBottom>
                {data.revenue}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pt: 1,
                }}
              >
                <Label color='success'>7%</Label>
                <ArrowUpwardWrapper sx={{ ml: 0.5, mr: -0.2 }} fontSize='small' />
              </Box>
            </Grid>
            <Divider orientation='vertical' flexItem />
            <Grid xs={12} sm item>
              <Typography variant='caption' gutterBottom>
                {t('Visitors')}
              </Typography>
              <Typography variant='h3' gutterBottom>
                {data.visitors}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pt: 1,
                }}
              >
                <Label color='success'>8%</Label>
                <ArrowDownwardWrapper sx={{ ml: 0.5, mr: -0.2 }} fontSize='small' />
              </Box>
            </Grid>
            <Divider orientation='vertical' flexItem />
            <Grid xs={12} sm item>
              <Typography variant='caption' gutterBottom>
                {t('Conversion')}
              </Typography>
              <Typography variant='h3' gutterBottom>
                {data.conversion}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pt: 1,
                }}
              >
                <Label color='success'>17%</Label>
                <ArrowUpwardWrapper sx={{ ml: 0.5, mr: -0.2 }} fontSize='small' />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MonthlyComparison;
