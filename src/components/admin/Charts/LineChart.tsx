import { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";

interface LineChartProps {
  data: number[];
  label: string;
  backgroundColor: string;
  borderColor: string;
  labels?: string[];
}

const months = ["January", "February", "March", "April", "May", "June", "July"];

export const LineChart = ({
  data,
  label,
  backgroundColor,
  borderColor,
  labels = months,
}: LineChartProps) => {
  const LineChartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const LineChartData: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor,
        borderColor,
        fill: true,
      },
    ],
  };

  return <Line data={LineChartData} options={LineChartOptions} />;
};

export default LineChart;
