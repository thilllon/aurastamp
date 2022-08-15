import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import Block8 from '@/content/Blocks/ChartsSmall/Block6';
import Block7 from '@/content/Blocks/ListsLarge/Block10';
import Block4 from '@/content/Blocks/ListsLarge/Block3';
import Block5 from '@/content/Blocks/ListsLarge/Block4';
import Block6 from '@/content/Blocks/ListsLarge/Block9';
import Block3 from '@/content/Blocks/ProgressCircular/Block8';
import Block1 from '@/content/Blocks/SparklinesLarge/Block7';
import Block2 from '@/content/Dashboards/Expenses/Block2';
import PageHeader from '@/content/Dashboards/Expenses/PageHeader';
import { Grid } from '@mui/material';

function DashboardExpensesContent() {
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
        <Grid item xs={12}>
          <Block3 />
        </Grid>
        <Grid item xs={12} md={6}>
          <Block4 />
        </Grid>
        <Grid item xs={12} md={6}>
          <Block5 />
        </Grid>
        <Grid item xs={12} md={6}>
          <Block6 />
        </Grid>
        <Grid item xs={12} md={6}>
          <Block7 />
        </Grid>
        <Grid item xs={12}>
          <Block8 />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default DashboardExpensesContent;
