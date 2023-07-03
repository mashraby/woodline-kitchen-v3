import React, { useContext, useEffect, useState } from "react";

import { Box } from "@mui/system";
import MiniDrawer from "../../components/sidebar/sidebar";
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
import { getAnalytics } from "../../services/analytics.service";

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
    });
  }, [type]);

  return (
    <MiniDrawer>
      <Grid container spacing={{ xs: 1, sm: 2, md: 4, lg: 8 }}>
        <Grid item xs={12} md={12} sm={12} lg={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: {
                xs: "12px",
                sm: "16px",
                md: "18px",
                lg: "20px",
                xlg: "22px",
              },
            }}
          >
            <Typography
              variant="h6"
              fontSize={{ xs: "18px" }}
              fontWeight={{ xs: "bold" }}
            >
              ВАРИАНТЫ ФИЛЬТРА
            </Typography>
            <FormControl required>
              <InputLabel id="demo-simple-select-required-label">
                выбирать
              </InputLabel>
              <Select
                size={"small"}
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
        <Grid item xs={12} md={12} sm={12} lg={10}>
          <Bar options={options} data={ChartData} />
        </Grid>
      </Grid>
    </MiniDrawer>
  );
};
