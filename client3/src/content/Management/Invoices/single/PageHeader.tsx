import { Link } from '@/components/Link';
import type { Invoice } from '@/models/invoice';
import { ArrowBackTwoTone as ArrowBackTwoToneIcon } from '@mui/icons-material';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface PageHeaderProps {
  invoice: Invoice;
}

const PageHeader: FC<PageHeaderProps> = ({ invoice }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid item>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Tooltip arrow placement='top' title={t('Go back')}>
              <IconButton href='/management/invoices' color='primary' sx={{ p: 2, mr: 2 }}>
                <ArrowBackTwoToneIcon />
              </IconButton>
            </Tooltip>
            <Box>
              <Typography variant='h3' component='h3' gutterBottom>
                #{invoice.number}
              </Typography>
              <Breadcrumbs maxItems={2} aria-label='breadcrumb'>
                <Link color='inherit' href='#'>
                  {t('Home')}
                </Link>
                <Link color='inherit' href='#'>
                  {t('Management')}
                </Link>
                <Link color='inherit' href='#'>
                  {t('Commerce')}
                </Link>
                <Link color='inherit' href='#'>
                  {t('Invoices')}
                </Link>
                <Typography color='text.primary'>
                  {t('Invoice')} #{invoice.number}
                </Typography>
              </Breadcrumbs>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Button sx={{ mt: { xs: 2, sm: 0 } }} href='/management/invoices' variant='contained'>
            {t('View all invoices')}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PageHeader;
