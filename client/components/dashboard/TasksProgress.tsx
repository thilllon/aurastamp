import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardProps,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';

type TasksProgressProps = CardProps;

export const TasksProgress = (props: TasksProgressProps) => (
  <Card sx={{ height: '100%' }} {...props}>
    <CardContent>
      <Grid container spacing={0} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color='textSecondary' gutterBottom variant='overline'>
            TASKS PROGRESS
          </Typography>
          <Typography color='textPrimary' variant='h4'>
            75.5%
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56,
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress value={75.5} variant='determinate' />
      </Box>
    </CardContent>
  </Card>
);
