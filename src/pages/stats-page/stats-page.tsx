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
} from "@mui/material";
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

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [23, 90, 54, 67 , 77, 42, 99],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [77, 64, 12, 59, 34, 81, 55],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

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
        <Grid container spacing={8}>
          <Grid item xs={10}>
            <Bar options={options} data={data} /> 
          </Grid>
          <Grid item xs={2}>
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
