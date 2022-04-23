import { Avatar, Card, CardContent, CardProps, Grid, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

type TotalProfitProps = CardProps;

export const TotalProfit = (props: TotalProfitProps) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={0} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color='textSecondary' gutterBottom variant='overline'>
            TOTAL PROFIT
          </Typography>
          <Typography color='textPrimary' variant='h4'>
            $23k
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56,
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
