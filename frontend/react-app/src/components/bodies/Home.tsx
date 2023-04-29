import { Line } from 'react-chartjs-2';

const data = {
  // x 軸のラベル
  labels: ['1 月', '2 月'],
  datasets: [
    {
      label: 'Dataset',
      // データの値
      data: [65, 59],
      // グラフの背景色
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)'],
      // グラフの枠線の色
      borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)'],
      // グラフの枠線の太さ
      borderWidth: 1,
    },
  ],
};

// レンダリング
const Graph = (): JSX.Element => {
  return <Line data={data} />;
};

export default Graph;
