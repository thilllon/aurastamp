import {
  Box,
  Card,
  CardHeader,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image, { ImageProps } from 'next/image';
import { useTranslation } from 'react-i18next';

const CN = (props: Partial<ImageProps>) => (
  <Image alt='CN' src='/static/images/flags/cn.svg' width={45} height={30} {...props} />
);
const DE = (props: Partial<ImageProps>) => (
  <Image alt='DE' src='/static/images/flags/de.svg' width={45} height={30} {...props} />
);
const AE = (props: Partial<ImageProps>) => (
  <Image alt='AE' src='/static/images/flags/ae.svg' width={45} height={30} {...props} />
);
const ES = (props: Partial<ImageProps>) => (
  <Image alt='ES' src='/static/images/flags/es.svg' width={45} height={30} {...props} />
);
const FR = (props: Partial<ImageProps>) => (
  <Image alt='FR' src='/static/images/flags/fr.svg' width={45} height={30} {...props} />
);
const US = (props: Partial<ImageProps>) => (
  <Image alt='US' src='/static/images/flags/us.svg' width={45} height={30} {...props} />
);

const LinearProgressWrapper = styled(LinearProgress)(
  () => `
        flex-grow: 1;
`
);

function SalesByCountry() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader title={t('Sales by Country')} />
      <Divider />
      <List disablePadding component='div'>
        <ListItem component='div' sx={{ py: 2, flexDirection: 'column' }}>
          <Box display='flex' alignItems='center' width='100%'>
            <ListItemAvatar sx={{ minWidth: '36px', display: 'flex', alignItems: 'center' }}>
              <US />
            </ListItemAvatar>
            <ListItemText
              primary='USA'
              primaryTypographyProps={{
                variant: 'h5',
                color: 'textPrimary',
                noWrap: true,
              }}
            />

            <Box display='flex' alignItems='center'>
              <Box sx={{ mr: 3 }}>
                <Typography align='right' variant='subtitle2' noWrap gutterBottom>
                  {t('Orders')}
                </Typography>
                <Typography align='right' variant='h5'>
                  8
                </Typography>
              </Box>
              <Box>
                <Typography align='right' variant='subtitle2' noWrap gutterBottom>
                  {t('Total')}
                </Typography>
                <Typography align='right' variant='h5'>
                  $5,493.22
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display='block' width='100%' sx={{ mt: 2 }}>
            <LinearProgressWrapper value={57} color='primary' variant='determinate' />
          </Box>
        </ListItem>
        <Divider />
        <ListItem component='div' sx={{ py: 2, flexDirection: 'column' }}>
          <Box display='flex' alignItems='center' width='100%'>
            <ListItemAvatar sx={{ minWidth: '36px', display: 'flex', alignItems: 'center' }}>
              <ES />
            </ListItemAvatar>
            <ListItemText
              primary='Spain'
              primaryTypographyProps={{
                variant: 'h5',
                color: 'textPrimary',
                noWrap: true,
              }}
            />

            <Box display='flex' alignItems='center'>
              <Box sx={{ mr: 3 }}>
                <Typography align='right' variant='subtitle2' noWrap gutterBottom>
                  {t('Orders')}
                </Typography>
                <Typography align='right' variant='h5'>
                  41
                </Typography>
              </Box>
              <Box>
                <Typography align='right' variant='subtitle2' noWrap gutterBottom>
                  {t('Total')}
                </Typography>
                <Typography align='right' variant='h5'>
                  $7,489.00
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display='block' width='100%' sx={{ mt: 2 }}>
            <LinearProgressWrapper value={23} color='primary' variant='determinate' />
          </Box>
        </ListItem>
        <Divider />
        <ListItem component='div' sx={{ py: 2, flexDirection: 'column' }}>
          <Box display='flex' alignItems='center' width='100%'>
            <ListItemAvatar sx={{ minWidth: '36px', display: 'flex', alignItems: 'center' }}>
              <DE />
            </ListItemAvatar>
            <ListItemText
              primary='Germany'
              primaryTypographyProps={{
                variant: 'h5',
                color: 'textPrimary',
                noWrap: true,
              }}
            />

            <Box display='flex' alignItems='center'>
              <Box sx={{ mr: 3 }}>
                <Typography align='right' variant='subtitle2' noWrap gutterBottom>
                  {t('Orders')}
                </Typography>
                <Typography align='right' variant='h5'>
                  12
                </Typography>
              </Box>
              <Box>
                <Typography align='right' variant='subtitle2' noWrap gutterBottom>
                  {t('Total')}
                </Typography>
                <Typography align='right' variant='h5'>
                  $3,589.33
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display='block' width='100%' sx={{ mt: 2 }}>
            <LinearProgressWrapper value={34} color='primary' variant='determinate' />
          </Box>
        </ListItem>
        <Divider />
      </List>
    </Card>
  );
}

export default SalesByCountry;
