import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardProps, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import { Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);

type TrafficByDeviceProps = CardProps;

export const TrafficByDevice = (props: TrafficByDeviceProps) => {
  const theme = useTheme();

  const devices = [
    { title: 'Desktop', value: 613, icon: LaptopMacIcon, color: '#3F51B5' },
    { title: 'Tablet', value: 15, icon: TabletIcon, color: '#E53935' },
    { title: 'Mobile', value: 23, icon: PhoneIcon, color: '#FB8C00' },
  ];

  return (
    <Card {...props}>
      <CardHeader title='Traffic by Device' />
      <Divider />
      <CardContent>
        <Box sx={{ height: 300, position: 'relative' }}>
          <Doughnut
            data={{
              datasets: [
                {
                  data: [63, 15, 22],
                  backgroundColor: ['#3F51B5', '#e53935', '#FB8C00'],
                  borderWidth: 8,
                  borderColor: '#FFFFFF',
                  hoverBorderColor: '#FFFFFF',
                },
              ],
              labels: ['Desktop', 'Tablet', 'Mobile'],
            }}
            options={{
              cutout: '60%',
              animation: false,
              layout: {
                padding: 0,
              },
              maintainAspectRatio: false,
              responsive: true,
              // legend: {
              //   display: false,
              // },
              // tooltips: {
              //   backgroundColor: theme.palette.background.paper,
              //   bodyFontColor: theme.palette.text.secondary,
              //   borderColor: theme.palette.divider,
              //   borderWidth: 1,
              //   enabled: true,
              //   footerFontColor: theme.palette.text.secondary,
              //   intersect: false,
              //   mode: 'index',
              //   titleFontColor: theme.palette.text.primary,
              // },
              backgroundColor: theme.palette.background.default,
              borderColor: theme.palette.divider,
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2,
          }}
        >
          {devices.map(({ color, icon: Icon, title, value }, idx) => (
            <Box key={idx} sx={{ p: 1, textAlign: 'center' }}>
              <Icon color='action' />
              <Typography color='textPrimary' variant='body1'>
                {title}
              </Typography>
              <Typography style={{ color }} variant='h4'>
                {`${value}%`}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
