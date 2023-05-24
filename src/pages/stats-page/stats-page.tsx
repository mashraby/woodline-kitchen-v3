import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart, {
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js/auto";
import { Box } from "@mui/system";
import { MiniDrawer } from "../../components/sidebar/sidebar";
import { VertBar } from "./vert-bar/vert-bar";
import {
  Alert,
  AlertTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import BasicDateCalendar from "./date-calendar/date-calendar";
import StaticTimePickerLandscape from "./time/time";
import { DoughnutChart } from "./doughnt-chart/d-chart";
import { AreaChart } from "./area-chart/area-chart";
import { ReloadContext } from "../../context/reload.context";
import { IRole } from "../../interfaces/roles.interfaces";
import { AxiosError, AxiosResponse } from "axios";
import { getRoles } from "../../services/api.service";
import {
  ChiqimInt,
  FoydaInt,
  TodayTushum,
  todaysChiqim,
  todaysFoyda,
  todaysTushum,
} from "../../services/analytics.service";
import accounting from "accounting";
import moment from "moment";
import "moment/locale/ru";

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

interface DoughnutChartProps {
  data: number[];
  labels: string[];
}

export const StatsPage: React.FC = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const { reload } = useContext(ReloadContext);
  const [type, setType] = useState<string>("day");

  const [todayTushum, setTodayTushum] = useState<TodayTushum>({
    date: "",
    profit: 0,
  });

  const [todayChiqim, setTodayChiqim] = useState<ChiqimInt>({
    date: {
      start: "",
      end: "",
    },
    orders: 0,
    sum: 0,
  });

  const [todayFoyda, setTodayFoyda] = useState<FoydaInt>({
    date: {
      start: "",
      end: "",
    },
    sum: 0,
  });

  useEffect(() => {
    getRoles()
      .then((res: AxiosResponse) => {
        setRoles(res.data);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          window.localStorage.removeItem("token");
          window.location.reload();
          window.location.href = "/login";
        }
      });
  }, [reload]);

  const date = new Date();

  useEffect(() => {
    todaysTushum(type, date.getTime()).then((data) => setTodayTushum(data));
    todaysChiqim(type, date.getTime()).then((data) => setTodayChiqim(data));
    todaysFoyda(type, date.getTime()).then((data) => setTodayFoyda(data));
  }, [type]);

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
        {/* <BasicDateCalendar /> */}

        <Box
          sx={{ display: "flex", justifyContent: "space-between" }}
          my={"20px"}
        >
          <Typography variant="h3" fontFamily={"monospace"} fontWeight={"500"}>
            {type === "day"
              ? "Kunlik xisobot"
              : type === "week"
              ? "Xaftalik xisobot"
              : type === "month"
              ? "Oylik xisobot"
              : "Yillik xisobot"}
          </Typography>

          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-required-label">
              Daily
            </InputLabel>
            <Select
              defaultValue="day"
              onChange={(e: SelectChangeEvent) => {
                setType(e.target.value);
              }}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              label="size *"
            >
              <MenuItem value={"day"}>Daily</MenuItem>
              <MenuItem value={"week"}>Weekly</MenuItem>
              <MenuItem value={"month"}>Monthly</MenuItem>
              <MenuItem value={"year"}>Yearly</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={4} mb={"20px"}>
          <Grid item xs={4}>
            <Alert icon={false} severity="error">
              <AlertTitle sx={{ fontSize: "26px" }}>
                💰 Umumiy savdo - ({todayChiqim.orders} ta zakaz)
              </AlertTitle>
              <Box fontSize={"20px"}>
                {accounting.formatNumber(todayTushum.profit, 0, " ")} so'm
              </Box>
            </Alert>
          </Grid>

          <Grid item xs={4}>
            <Alert icon={false} severity="info">
              <AlertTitle sx={{ fontSize: "26px" }}>💸 Xarajat</AlertTitle>
              <Box fontSize={"20px"}>
                {accounting.formatNumber(todayChiqim.sum, 0, " ")} so'm
              </Box>
            </Alert>
          </Grid>

          <Grid item xs={4}>
            <Alert icon={false} severity="success">
              <AlertTitle sx={{ fontSize: "26px" }}>🤑 Sof foyda</AlertTitle>
              <Box fontSize={"20px"}>
                {accounting.formatNumber(todayFoyda.sum, 0, " ")} so'm
              </Box>
            </Alert>
          </Grid>
        </Grid>

        {/* <Grid container spacing={8}>
          <Grid item xs={6}>
            <AreaChart />
          </Grid>
          <Grid item xs={6}>
            <DoughnutChart />
          </Grid>
        </Grid>
        <Grid container spacing={8}>
          <Grid item xs={6}>
            <VertBar />
          </Grid>
          <Grid item xs={6}>
            <Line data={data} options={options} />
          </Grid>
        </Grid> */}
      </Box>
    </Box>
  );
};
