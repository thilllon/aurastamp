import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Box, Button, Card, CardContent, CardHeader, CardProps, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

type SalesBarGraphProps = CardProps;

export const SalesBarGraph = (props: SalesBarGraphProps) => {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        backgroundColor: '#3F51B5',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [18, 5, 19, 27, 29, 19, 20],
        label: 'This year',
        maxBarThickness: 10,
      },
      {
        backgroundColor: '#EEEEEE',
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [11, 20, 12, 29, 30, 25, 13],
        label: 'Last year',
        maxBarThickness: 10,
      },
    ],
    labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 aug'],
  };

  return (
    <Card {...props}>
      <CardHeader
        action={
          <Button endIcon={<ArrowDropDownIcon fontSize='small' />} size='small'>
            Last 7 days
          </Button>
        }
        title='Latest Sales'
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative',
          }}
        >
          <Bar
            data={{
              datasets: [
                {
                  backgroundColor: '#3F51B5',
                  barPercentage: 0.5,
                  barThickness: 12,
                  borderRadius: 4,
                  categoryPercentage: 0.5,
                  data: [18, 5, 19, 27, 29, 19, 20],
                  label: 'This year',
                  maxBarThickness: 10,
                },
                {
                  backgroundColor: '#EEEEEE',
                  barPercentage: 0.5,
                  barThickness: 12,
                  borderRadius: 4,
                  categoryPercentage: 0.5,
                  data: [11, 20, 12, 29, 30, 25, 13],
                  label: 'Last year',
                  maxBarThickness: 10,
                },
              ],
              labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 aug'],
            }}
            options={{
              animation: false,
              // cornerRadius: 20,
              layout: { padding: 0 },
              maintainAspectRatio: false,
              responsive: true,
              // xAxes: [
              //   {
              //     ticks: {
              //       fontColor: theme.palette.text.secondary,
              //     },
              //     gridLines: {
              //       display: false,
              //       drawBorder: false,
              //     },
              //   },
              // ],
              // yAxes: [
              //   {
              //     ticks: {
              //       fontColor: theme.palette.text.secondary,
              //       beginAtZero: true,
              //       min: 0,
              //     },
              //     gridLines: {
              //       borderDash: [2],
              //       borderDashOffset: [2],
              //       color: theme.palette.divider,
              //       drawBorder: false,
              //       zeroLineBorderDash: [2],
              //       zeroLineBorderDashOffset: [2],
              //       zeroLineColor: theme.palette.divider,
              //     },
              //   },
              // ],
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
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  backgroundColor: theme.palette.background.paper,
                  // bodyFontColor: theme.palette.text.secondary,
                  bodyColor: theme.palette.text.secondary,
                  bodyFont: {
                    size: 14,
                  },
                  borderColor: theme.palette.divider,
                  borderWidth: 1,
                  enabled: true,
                  footerFont: {
                    //
                  },
                  footerColor: theme.palette.text.secondary,
                  // footerFontColor: theme.palette.text.secondary,
                  intersect: false,
                  mode: 'index',
                  // titleFontColor: theme.palette.text.primary,
                  titleColor: theme.palette.text.primary,
                },
              },
            }}
          />
        </Box>
      </CardContent>

      <Divider />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, py: 2 }}>
        <Button color='primary' endIcon={<ArrowRightIcon fontSize='small' />} size='small'>
          Overview
        </Button>
      </Box>
    </Card>
  );
};
