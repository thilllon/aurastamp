import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import AppointmentsAlt from '@/content/Dashboards/Healthcare/hospital/AppointmentsAlt';
import Departments from '@/content/Dashboards/Healthcare/hospital/Departments';
import Doctors from '@/content/Dashboards/Healthcare/hospital/Doctors';
import Notifications from '@/content/Dashboards/Healthcare/hospital/Notifications';
import OverallStatus from '@/content/Dashboards/Healthcare/hospital/OverallStatus';
import PageHeader from '@/content/Dashboards/Healthcare/hospital/PageHeaderHospital';
import RecentPatients from '@/content/Dashboards/Healthcare/hospital/RecentPatients';
import Surgeries from '@/content/Dashboards/Healthcare/hospital/Surgeries';
import UpcomingConsults from '@/content/Dashboards/Healthcare/hospital/UpcomingConsults';
import { Grid } from '@mui/material';

function DashboardHospitalViewContent() {
  return (
    <>
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

export default DashboardHospitalViewContent;
