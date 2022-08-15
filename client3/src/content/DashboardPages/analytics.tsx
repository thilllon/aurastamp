import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import ActiveReferrals from '@/content/Dashboards/Analytics/ActiveReferrals';
import AudienceOverview from '@/content/Dashboards/Analytics/AudienceOverview';
import BounceRate from '@/content/Dashboards/Analytics/BounceRate';
import Conversions from '@/content/Dashboards/Analytics/Conversions';
import ConversionsAlt from '@/content/Dashboards/Analytics/ConversionsAlt';
import PageHeader from '@/content/Dashboards/Analytics/PageHeader';
import PendingInvitations from '@/content/Dashboards/Analytics/PendingInvitations';
import SessionsByCountry from '@/content/Dashboards/Analytics/SessionsByCountry';
import TopLandingPages from '@/content/Dashboards/Analytics/TopLandingPages';
import TrafficSources from '@/content/Dashboards/Analytics/TrafficSources';
import { Grid } from '@mui/material';

function DashboardAnalyticsContent() {
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
        <Grid item lg={8} md={6} xs={12}>
          <Grid container spacing={3} direction='row' justifyContent='center' alignItems='stretch'>
            <Grid item sm={6} xs={12}>
              <ActiveReferrals />
            </Grid>
            <Grid item sm={6} xs={12}>
              <PendingInvitations />
            </Grid>
            <Grid item sm={6} xs={12}>
              <BounceRate />
            </Grid>
            <Grid item sm={6} xs={12}>
              <ConversionsAlt />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <SessionsByCountry />
        </Grid>
        <Grid item xs={12}>
          <AudienceOverview />
        </Grid>
        <Grid item md={5} xs={12}>
          <Conversions />
        </Grid>
        <Grid item md={7} xs={12}>
          <TopLandingPages />
        </Grid>
        <Grid item xs={12}>
          <TrafficSources />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default DashboardAnalyticsContent;
