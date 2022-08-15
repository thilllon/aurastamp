import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import Block1 from '@/content/Blocks/Statistics/Block3';
import PageHeader from '@/content/Dashboards/Reports/PageHeader';
import { Grid } from '@mui/material';

function DashboardReportsContent() {
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
        spacing={4}
      >
        <Grid item xs={12}>
          <Block1 />
        </Grid>
        {/* <Grid item md={7} xs={12}>
          <Grid container direction='row' justifyContent='center' alignItems='stretch' spacing={4}>
            <Grid item xs={12}>
              <Block2 />
            </Grid>
            <Grid item xs={12}>
              <Block4 />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5} xs={12}>
          <Block3 />
        </Grid>
        <Grid item xs={12}>
          <Block5 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block6 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block7 />
        </Grid>
        <Grid item md={5} xs={12}>
          <Block8 />
        </Grid>
        <Grid item md={7} xs={12}>
          <Block9 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block10 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block11 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block12 />
        </Grid>
        <Grid item md={6} xs={12}>
          <Block13 />
        </Grid> */}
      </Grid>
      <Footer />
    </>
  );
}

export default DashboardReportsContent;
