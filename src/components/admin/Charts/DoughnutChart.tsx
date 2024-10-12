import { ChartData, ChartOptions } from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface DoughnutChartProps {
  data: number[];
  labels: string[];
  backgroundColor: string[];
  cutout?: number | string;
  legends?: boolean;
  offset?: number[];
}

export const DoughnutChart = ({
  data = [],
  labels = [],
  backgroundColor = [],
  cutout,
  legends = true,
  offset,
}: DoughnutChartProps) => {
  const DoughnutChartData: ChartData<"doughnut", number[], string> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 0,
        offset,
      },
    ],
  };

  const DoughnutChartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: legends,
        position: "bottom",
        labels: {
          padding: 40,
        },
      },
    },
    cutout,
  };

  return <Doughnut data={DoughnutChartData} options={DoughnutChartOptions} />;
};
