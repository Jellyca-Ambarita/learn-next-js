// components/ChartComponent.tsx
import { Line } from 'react-chartjs-2';

const ChartComponent = () => {
  const data = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei'],
    datasets: [
      {
        label: 'Berat Badan',
        data: [70, 68, 65, 66, 64],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return <Line data={data} />;
};

export default ChartComponent;
