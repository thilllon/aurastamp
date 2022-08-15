import Label from '@/components/Label';
import {
  ArrowUpwardTwoTone,
  HelpOutlineTwoTone as HelpOutlineTwoToneIcon,
} from '@mui/icons-material';
import { Box, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const ArrowUpwardWrapper = styled(ArrowUpwardTwoTone)(
  ({ theme }) => `
      color:  ${theme.palette.success.main};
`
);
function GrossSales() {
  const { t } = useTranslation();

  const data: any = {
    value: '$3,854.15',
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
        title={t('Gross Sales')}
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
          <Label color='success'>+10%</Label>
          <ArrowUpwardWrapper sx={{ ml: 0.5, mr: -0.2 }} fontSize='small' />
        </Box>
      </CardContent>
    </Card>
  );
}

export default GrossSales;
