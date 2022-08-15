import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import Leaderboard from '@/content/Dashboards/Learning/Leaderboard';
import PageHeader from '@/content/Dashboards/Learning/PageHeader';
import RecentCourses from '@/content/Dashboards/Learning/RecentCourses';
import TimeSpent from '@/content/Dashboards/Learning/TimeSpent';
import TopTrainers from '@/content/Dashboards/Learning/TopTrainers';
import { Grid } from '@mui/material';
import dynamic from 'next/dynamic';

const UpcomingConferences = dynamic(
  () => import('src/content/Dashboards/Learning/UpcomingConferences'),
  { ssr: true }
);

function DashboardLearningContent() {
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
        <Grid item xs={12}>
          <TimeSpent />
        </Grid>
        <Grid item xs={12} md={6}>
          <TopTrainers />
        </Grid>
        <Grid item xs={12} md={6}>
          <Leaderboard />
        </Grid>
        <Grid item xs={12}>
          <UpcomingConferences />
        </Grid>
        <Grid item xs={12}>
          <RecentCourses />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}

export default DashboardLearningContent;
