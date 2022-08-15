import {
  Box,
  Card,
  CardHeader,
  Divider,
  LinearProgress,
  List,
  ListItem,
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
  ({ theme }) => `
        flex-grow: 1;
        margin-right: ${theme.spacing(1)};
`
);

const ListItemWrapper = styled(ListItem)(
  () => `
        border-radius: 0;
`
);

function SessionsByCountry() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader title={t('Sessions by Country')} />
      <Divider />
      <List disablePadding component='nav'>
        <ListItemWrapper sx={{ py: 3.15 }}>
          <US />
          <Typography variant='h5' color='text.primary' noWrap sx={{ minWidth: 80 }}>
            USA
          </Typography>
          <Box display='flex' alignItems='center' flexWrap='wrap' sx={{ ml: 1, flexGrow: 1 }}>
            <LinearProgressWrapper value={57} color='primary' variant='determinate' />
            <Typography variant='h4' color='text.primary'>
              57%
            </Typography>
          </Box>
        </ListItemWrapper>
        <Divider />
        <ListItemWrapper sx={{ py: 3.15 }}>
          <DE />
          <Typography variant='h5' color='text.primary' noWrap sx={{ minWidth: 80 }}>
            Germany
          </Typography>
          <Box display='flex' alignItems='center' flexWrap='wrap' sx={{ ml: 1, flexGrow: 1 }}>
            <LinearProgressWrapper value={34} color='primary' variant='determinate' />
            <Typography variant='h4' color='text.primary'>
              34%
            </Typography>
          </Box>
        </ListItemWrapper>
        <Divider />
        <ListItemWrapper sx={{ py: 3.15 }}>
          <FR />
          <Typography variant='h5' color='text.primary' noWrap sx={{ minWidth: 80 }}>
            France
          </Typography>
          <Box display='flex' alignItems='center' flexWrap='wrap' sx={{ ml: 1, flexGrow: 1 }}>
            <LinearProgressWrapper value={21} color='primary' variant='determinate' />
            <Typography variant='h4' color='text.primary'>
              21%
            </Typography>
          </Box>
        </ListItemWrapper>
        <Divider />
        <ListItemWrapper sx={{ py: 3.15 }}>
          <ES />
          <Typography variant='h5' color='text.primary' noWrap sx={{ minWidth: 80 }}>
            Spain
          </Typography>
          <Box display='flex' alignItems='center' flexWrap='wrap' sx={{ ml: 1, flexGrow: 1 }}>
            <LinearProgressWrapper value={13} color='primary' variant='determinate' />
            <Typography variant='h4' color='text.primary'>
              13%
            </Typography>
          </Box>
        </ListItemWrapper>
        <Divider />
        <ListItemWrapper sx={{ py: 3.15 }}>
          <CN />
          <Typography variant='h5' color='text.primary' noWrap sx={{ minWidth: 80 }}>
            China
          </Typography>
          <Box display='flex' alignItems='center' flexWrap='wrap' sx={{ ml: 1, flexGrow: 1 }}>
            <LinearProgressWrapper value={71} color='primary' variant='determinate' />
            <Typography variant='h4' color='text.primary'>
              71%
            </Typography>
          </Box>
        </ListItemWrapper>
        <Divider />
      </List>
    </Card>
  );
}

export default SessionsByCountry;
