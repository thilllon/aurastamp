import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { ArrowDownward as ArrowDownwardIcon, Money as MoneyIcon } from '@mui/icons-material';

type BudgetProps = {
  // FIXME: CardProps 자동완성이 안되어서 임시로 생성
  children?: React.ReactNode;
  raised?: boolean;
};

export const Budget = (props: BudgetProps) => (
  <Card sx={{ height: '100%' }} {...props}>
    <CardContent>
      <Grid container spacing={0} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color='textSecondary' gutterBottom variant='overline'>
            BUDGET
          </Typography>
          <Typography color='textPrimary' variant='h4'>
            $24k
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56,
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ArrowDownwardIcon color='error' />
        <Typography
          color='error'
          sx={{
            mr: 1,
          }}
          variant='body2'
        >
          12%
        </Typography>
        <Typography color='textSecondary' variant='caption'>
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
