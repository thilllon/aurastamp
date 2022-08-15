import { alpha, useTheme } from '@mui/material/styles';
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

interface PageHeaderChartProps {
  data: any[];
  labels: string[];
}

const PageHeaderChart: FC<PageHeaderChartProps> = ({ data: dataProp, labels, ...rest }) => {
  const theme = useTheme();

  const data: any = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    const primaryGradient = ctx.createLinearGradient(0, 0, 0, 42);

    primaryGradient.addColorStop(0, alpha(theme.colors.alpha.trueWhite[30], 0.3));
    primaryGradient.addColorStop(0.5, alpha(theme.colors.alpha.trueWhite[30], 0.1));
    primaryGradient.addColorStop(1, alpha(theme.colors.alpha.trueWhite[30], 0));

    return {
      datasets: [
        {
          data: dataProp,
          backgroundColor: primaryGradient,
          borderColor: theme.colors.alpha.trueWhite[70],
          pointBorderColor: theme.colors.alpha.trueWhite[70],
          pointBorderWidth: 0,
          pointRadius: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: theme.colors.alpha.trueWhite[70],
          pointHoverBorderColor: theme.palette.common.white,
          pointHoverColor: theme.colors.alpha.trueWhite[70],
          pointHoverBorderWidth: 2,
          borderWidth: 1,
          pointBackgroundColor: theme.palette.common.white,
        },
      ],
      labels,
    };
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,

    legend: {
      display: false,
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
            beginAtZero: true,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
            beginAtZero: true,
          },
        },
      ],
    },
    tooltips: {
      enabled: false,
    },
  };

  return (
    <div {...rest}>
      <Line data={data} options={options} />
    </div>
  );
};

export default PageHeaderChart;
