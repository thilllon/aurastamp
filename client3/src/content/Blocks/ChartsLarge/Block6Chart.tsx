import { useTheme } from '@mui/material/styles';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { FC } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Block6ChartProps {
  className?: string;
  data: any;
  labels: string[];
}

const Block6Chart: FC<Block6ChartProps> = ({ data: dataProp, labels, ...rest }) => {
  const theme = useTheme();

  const data: any = {
    datasets: [
      {
        label: 'New Likes',
        backgroundColor: 'transparent',
        data: dataProp.current,
        borderColor: theme.colors.primary.main,
        pointBorderColor: theme.palette.primary.main,
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: theme.palette.primary.main,
        pointHoverBorderColor: theme.colors.alpha.trueWhite[100],
        pointHoverColor: theme.palette.primary.main,
        pointHoverBorderWidth: 4,
        pointBackgroundColor: theme.palette.primary.main,
        lineTension: 0.01,
      },
    ],
    labels,
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    cornerRadius: 4,
    legend: {
      display: false,
    },
    layout: {
      padding: {
        left: theme.spacing(0),
        right: theme.spacing(0),
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
            borderDash: [6],
            borderDashOffset: [0],
            drawBorder: false,
            color: theme.colors.alpha.trueWhite[10],
          },
          ticks: {
            beginAtZero: false,
            fontColor: theme.colors.alpha.trueWhite[50],
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            borderDash: [6],
            borderDashOffset: [0],
            color: theme.colors.alpha.trueWhite[10],
            drawBorder: false,
            zeroLineBorderDash: [6],
            zeroLineBorderDashOffset: [0],
            zeroLineColor: theme.colors.alpha.trueWhite[10],
          },
          ticks: {
            display: true,
            beginAtZero: false,
            min: 10,
            max: 45,
            fontColor: theme.colors.alpha.trueWhite[50],
            maxTicksLimit: 10,
          },
        },
      ],
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      caretSize: 6,
      displayColors: true,
      yPadding: 8,
      xPadding: 16,
      borderWidth: 4,
      bodySpacing: 10,
      titleFontSize: 16,
      borderColor: theme.colors.alpha.white[100],
      backgroundColor: theme.colors.alpha.white[100],
      titleFontColor: theme.palette.common.black,
      bodyFontColor: theme.palette.common.black,
      footerFontColor: theme.palette.common.black,
    },
    hover: {
      mode: 'index',
      intersect: true,
    },
  };

  return (
    <div {...rest}>
      <Line data={data} options={options} />
    </div>
  );
};

export default Block6Chart;
