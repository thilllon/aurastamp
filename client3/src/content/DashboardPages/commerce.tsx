import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import Customers from '@/content/Dashboards/Commerce/Customers';
import FullReport from '@/content/Dashboards/Commerce/FullReport';
import GrossSales from '@/content/Dashboards/Commerce/GrossSales';
import MonthlyComparison from '@/content/Dashboards/Commerce/MonthlyComparison';
import MonthlyGoals from '@/content/Dashboards/Commerce/MonthlyGoals';
import Orders from '@/content/Dashboards/Commerce/Orders';
import PageHeader from '@/content/Dashboards/Commerce/PageHeader';
import RecentTransactions from '@/content/Dashboards/Commerce/RecentTransactions';
import Refunds from '@/content/Dashboards/Commerce/Refunds';
import SalesByCategory from '@/content/Dashboards/Commerce/SalesByCategory';
import SalesByCountry from '@/content/Dashboards/Commerce/SalesByCountry';
import TopProducts from '@/content/Dashboards/Commerce/TopProducts';
import Traffic from '@/content/Dashboards/Commerce/Traffic';
import VisitorsOverview from '@/content/Dashboards/Commerce/VisitorsOverview';
import { Grid } from '@mui/material';

function DashboardCommerceContent() {
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
          <Grid container direction='row' justifyContent='center' alignItems='stretch' spacing={3}>
            <Grid item lg={3} sm={6} xs={12}>
              <GrossSales />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Customers />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Orders />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Refunds />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} lg={7} xs={12}>
          <VisitorsOverview />
        </Grid>
        <Grid item md={6} lg={5} xs={12}>
          <RecentTransactions />
        </Grid>
        <Grid item lg={5} xs={12}>
          <Grid container direction='row' justifyContent='center' alignItems='stretch' spacing={3}>
            <Grid item lg={12} md={6} xs={12}>
              <FullReport />
            </Grid>
            <Grid item lg={12} md={6} xs={12}>
              <SalesByCategory />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={7} xs={12}>
          <TopProducts />
        </Grid>
        <Grid item md={6} lg={7} xs={12}>
          <MonthlyComparison />
        </Grid>
        <Grid item md={6} lg={5} xs={12}>
          <MonthlyGoals />
        </Grid>
        <Grid item md={6} lg={5} xs={12}>
          <SalesByCountry />
        </Grid>
        <Grid item md={6} lg={7} xs={12}>
          <Traffic />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}

export default DashboardCommerceContent;
