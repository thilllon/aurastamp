import { ArrowUpward as ArrowUpwardIcon, People as PeopleIcon } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, CardProps, Grid, Typography } from '@mui/material';

type TotalCustomersProps = CardProps;

export const TotalCustomers = (props: TotalCustomersProps) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={0} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color='textSecondary' gutterBottom variant='overline'>
            TOTAL CUSTOMERS
          </Typography>
          <Typography color='textPrimary' variant='h4'>
            1,6k
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56,
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2,
        }}
      >
        <ArrowUpwardIcon color='success' />
        <Typography variant='body2' sx={{ mr: 1 }}>
          16%
        </Typography>
        <Typography color='textSecondary' variant='caption'>
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
