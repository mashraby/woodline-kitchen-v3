import React from "react";
import { Line } from "react-chartjs-2";
import Chart, {
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js/auto";
import { Box } from "@mui/system";
import { MiniDrawer } from "../../components/sidebar/sidebar";

Chart.register(LinearScale, PointElement, LineElement, Title);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "My First dataset",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const StatsPage: React.FC = () => (
  <Box sx={{ display: "flex" }}>
    <MiniDrawer />
    <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
      <Line data={data} options={options} />
    </Box>
  </Box>
);
