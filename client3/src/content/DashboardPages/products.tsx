import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import Block3 from '@/content/Blocks/ChartsLarge/Block5';
import Block5 from '@/content/Blocks/ChartsSmall/Block5';
import Block1 from '@/content/Dashboards/Products/Block1';
import Block2 from '@/content/Dashboards/Products/Block2';
import Block4 from '@/content/Dashboards/Products/Block4';
import Block6 from '@/content/Dashboards/Products/Block6';
import PageHeader from '@/content/Dashboards/Products/PageHeader';
import { Grid } from '@mui/material';

function DashboardProductsContent() {
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
        <Grid item xs={12}>
          <Block2 />
        </Grid>
        <Grid item xs={12} xl={6}>
          <Block3 />
        </Grid>
        <Grid item xs={12} xl={6}>
          <Block4 />
        </Grid>
        <Grid item xs={12}>
          <Block5 />
        </Grid>
        <Grid item xs={12}>
          <Block6 />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}

export default DashboardProductsContent;
