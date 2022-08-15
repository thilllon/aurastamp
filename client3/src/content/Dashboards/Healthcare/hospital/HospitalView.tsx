import Footer from '@/components/Footer';
import { HeadMetaTags } from '@/components/HeadMetaTags';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { NotificationImportantTwoTone as NotificationImportantTwoToneIcon } from '@mui/icons-material';
import { Box, Card, Grid, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import AppointmentsAlt from './AppointmentsAlt';
import Departments from './Departments';
import Doctors from './Doctors';
import Notifications from './Notifications';
import OverallStatus from './OverallStatus';
import PageHeader from './PageHeaderHospital';
import RecentPatients from './RecentPatients';
import Surgeries from './Surgeries';
import UpcomingConsults from './UpcomingConsults';

function DashboardHospitalView() {
  const theme = useTheme();

  return (
    <>
      <HeadMetaTags title={''} />

      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{ px: 4 }}
        container
        direction='row'
        justifyContent='center'
        alignItems='stretch'
        spacing={3}
      >
        <Grid item xs={12}>
          <Card
            variant='outlined'
            sx={{
              background: alpha(theme.colors.info.main, 0.08),
              display: 'flex',
              alignItems: 'flex-start',
              p: 2,
            }}
          >
            <NotificationImportantTwoToneIcon
              sx={{
                mr: 1,
                color: theme.colors.info.main,
                fontSize: theme.typography.pxToRem(22),
              }}
            />
            <Box>
              <Typography variant='h4' sx={{ pt: 0.2 }} gutterBottom>
                Version 3.0 Update
              </Typography>
              <Typography variant='subtitle1' sx={{ fontSize: theme.typography.pxToRem(13) }}>
                Starting with version 3.0 we replaced <b>Chart.js</b> with <b>ApexCharts</b> for
                better UX and ease of use. If you still want to use the Chart.js plugin, we've
                included below a few implementation examples.
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item lg={8} xs={12}>
          <OverallStatus />
        </Grid>
        <Grid item lg={4} xs={12}>
          <Grid container direction='row' justifyContent='center' alignItems='stretch' spacing={3}>
            <Grid item lg={12} md={6} xs={12}>
              <AppointmentsAlt />
            </Grid>
            <Grid item lg={12} md={6} xs={12}>
              <Surgeries />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} lg={5} xs={12}>
          <Doctors />
        </Grid>
        <Grid item md={6} lg={7} xs={12}>
          <Departments />
        </Grid>
        <Grid item xs={12}>
          <RecentPatients />
        </Grid>
        <Grid item md={6} lg={7} xs={12}>
          <Notifications />
        </Grid>
        <Grid item md={6} lg={5} xs={12}>
          <UpcomingConsults />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default DashboardHospitalView;
