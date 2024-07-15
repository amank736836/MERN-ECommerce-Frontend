import { ChartData, ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";

interface PieChartProps {
  data: number[];
  labels: string[];
  backgroundColor: string[];
  offset?: number[];
}

export const PieChart = ({
  data,
  labels,
  backgroundColor,
  offset,
}: PieChartProps) => {
  const PieChartData: ChartData<"pie", number[], string> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 1,
        offset,
      },
    ],
  };

  const PieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Pie data={PieChartData} options={PieChartOptions} />;
};
