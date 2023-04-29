import { Chart } from 'react-chartjs-2';
import { type User, type Health } from 'interfaces';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraphProps {
  healths: Health[];
  currentUser: User;
  handleGetHealths: (id: number) => Promise<void>;
}

const Graph = ({ handleGetHealths, healths }: GraphProps): JSX.Element => {
  console.log(healths);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Health Data Chart',
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        max: Math.max(...healths.map((health) => health.weight)) + 5,
        min: Math.min(...healths.map((health) => health.weight)) - 5,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        max: 50,
        min: 10,
      },
    },
  };

  const data = {
    labels: healths.map((health) => health.date),
    datasets: [
      {
        type: 'line' as const,
        label: '目標体重',
        data: healths.map((health) => health.user.targetWeight),
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        boxWidth: 10,
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: '体脂肪率',
        data: healths.map((health) => health.bodyFatPercent),
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
        yAxisID: 'y1',
      },
      {
        type: 'line' as const,
        label: '体重',
        data: healths.map((health) => health.weight),
        tension: 0.1,
        yAxisID: 'y',
      },
    ],
  };

  return (
    <>
      <Chart
        type='bar'
        width={600}
        height={400}
        options={options}
        data={data}
      />
    </>
  );
};

export default Graph;
