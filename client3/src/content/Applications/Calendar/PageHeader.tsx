import { EventTwoTone as EventTwoToneIcon } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface PageHeaderProps {
  handleCreateEvent?: () => void;
}

const PageHeader: FC<PageHeaderProps> = ({ handleCreateEvent = () => {} }) => {
  const { t } = useTranslation();

  return (
    <Grid container justifyContent='space-between' alignItems='center'>
      <Grid item>
        <Typography variant='h3' component='h3' gutterBottom>
          {t('Events')}
        </Typography>
        <Typography variant='subtitle2'>
          {t('Check out the latest events and meetings in your calendar')}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          onClick={handleCreateEvent}
          variant='contained'
          color='primary'
          startIcon={<EventTwoToneIcon fontSize='small' />}
        >
          {t('Add meeting')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
