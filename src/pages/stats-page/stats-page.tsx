import React, { useContext, useEffect, useState } from "react";

import { Box } from "@mui/system";
import { MiniDrawer } from "../../components/sidebar/sidebar";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { ReloadContext } from "../../context/reload.context";
import { IRole } from "../../interfaces/roles.interfaces";
import { AxiosError, AxiosResponse } from "axios";
import { getRoles } from "../../services/api.service";
import {
  ChiqimInt,
  FoydaInt,
  TodayTushum,
  getAnalytics,
  todaysChiqim,
  todaysFoyda,
  todaysTushum,
} from "../../services/analytics.service";
import accounting from "accounting";
import moment from "moment";
import "moment/locale/ru";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Кухонная аналитика",
    },
  },
};

export const StatsPage: React.FC = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const { reload } = useContext(ReloadContext);
  const [type, setType] = useState<string>("day");
  const [ChartData, setChartData] = useState<{
    labels: string[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [],
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

  useEffect(() => {
    getAnalytics(type).then((data) => {
      setChartData(data as any);
      console.log(data);
    });
  }, [type]);

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
        <Grid mt={1} container spacing={8}>
          <Grid item md={12} sm={12} lg={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "22px",
              }}
            >
              <Typography variant="h6">ВАРИАНТЫ ФИЛЬТРА</Typography>
              <FormControl required>
                <InputLabel id="demo-simple-select-required-label">
                  выбирать
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
                  <MenuItem value={"day"}>Ежедневно</MenuItem>
                  <MenuItem value={"week"}>Еженедельно</MenuItem>
                  <MenuItem value={"month"}>Ежемесячно</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item md={12} sm={12} lg={10}>
            <Bar options={options} data={ChartData} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
