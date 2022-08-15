import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import ActiveSubscriptions from '@/content/Dashboards/Finance/ActiveSubscriptions';
import AllExpenses from '@/content/Dashboards/Finance/AllExpenses';
import Budget from '@/content/Dashboards/Finance/Budget';
import MyCards from '@/content/Dashboards/Finance/MyCards';
import PageHeader from '@/content/Dashboards/Finance/PageHeader';
import RecentTransactions from '@/content/Dashboards/Finance/RecentTransactions';
import UpgradeAccount from '@/content/Dashboards/Finance/UpgradeAccount';
import { Grid } from '@mui/material';

function DashboardFinanceContent() {
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
        <Grid item lg={7} md={6} xs={12}>
          <RecentTransactions />
        </Grid>
        <Grid item lg={5} md={6} xs={12}>
          <MyCards />
        </Grid>
        <Grid item xs={12}>
          <UpgradeAccount />
        </Grid>
        <Grid item md={6} lg={5} xs={12}>
          <Budget />
        </Grid>
        <Grid item md={6} lg={7} xs={12}>
          <AllExpenses />
        </Grid>
        <Grid item xs={12}>
          <ActiveSubscriptions />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}

export default DashboardFinanceContent;
