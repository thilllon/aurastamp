import Label from '@/components/Label';
import {
  ArrowDownwardTwoTone,
  HelpOutlineTwoTone as HelpOutlineTwoToneIcon,
} from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const ArrowDownwardWrapper = styled(ArrowDownwardTwoTone)(
  ({ theme }) => `
      color:  ${theme.palette.error.main};
`
);

function Refunds() {
  const { t } = useTranslation();

  const data: any = {
    value: '2',
  };

  return (
    <Card sx={{ px: 1, pt: 1 }}>
      <CardHeader
        sx={{ pb: 0 }}
        titleTypographyProps={{
          variant: 'subtitle2',
          fontWeight: 'bold',
          color: 'textSecondary',
        }}
        action={
          <Tooltip placement='top' arrow title={t('This section can have a description!')}>
            <IconButton size='small' color='secondary'>
              <HelpOutlineTwoToneIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        }
        title={t('Refunds')}
      />
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h3'>{data.value}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Label color='error'>-50%</Label>
          <ArrowDownwardWrapper sx={{ ml: 0.5, mr: -0.2 }} fontSize='small'></ArrowDownwardWrapper>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Refunds;
