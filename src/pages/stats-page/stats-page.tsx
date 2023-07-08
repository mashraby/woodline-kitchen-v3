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
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ReloadContext } from "../../context/reload.context";
import { IRole } from "../../interfaces/roles.interfaces";
import { AxiosError, AxiosResponse } from "axios";
import { getRoles } from "../../services/api.service";
import {
  getAnalytics,
  getAnalyticsForCook,
} from "../../services/analytics.service";
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

export const options2 = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Шеф-аналитика",
    },
  },
};

export const StatsPage: React.FC = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const { reload } = useContext(ReloadContext);
  const [type, setType] = useState<string>("day");
  const [type2, setType2] = useState<string>("day");
  const [ChartData, setChartData] = useState<{
    labels: string[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [],
  });

  const [ChartData2, setChartData2] = useState<{
    labels: string[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [],
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  useEffect(() => {
    getAnalyticsForCook(type2).then((data) => {
      setChartData2(data as any);
    });
  }, [type2]);

  return (
    <MiniDrawer>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Аналитика для кухни" {...a11yProps(0)} />
          <Tab label="Аналитика для шеф-повара" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
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
                    setType2(e.target.value);
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
            <Bar options={options2} data={ChartData2} />
          </Grid>
        </Grid>
      </CustomTabPanel>
    </MiniDrawer>
  );
};
