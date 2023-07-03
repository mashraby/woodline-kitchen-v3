import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { IPerson } from "../../../interfaces/users.interfaces";

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
import { OneUserAnalytics } from "../../../services/api.service";

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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "space-around",
  minHeight: 300
};

interface AnalyticModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  date: number;
}

interface userInt {
  user: IPerson | null;
  profit: number;
}

export const AnalyticModal: React.FC<AnalyticModalProps> = (props) => {
  const { setOpen, open, id, date } = props;
  const handleClose = () => setOpen(false);
  const [anUser, setAnUser] = useState<userInt>({
    user: null,
    profit: 0,
  });

  const [chartData, setChartData] = useState<any>();

  const [type, setType] = useState<string>("day");

  useEffect(() => {
    OneUserAnalytics(type, id).then((data) => setChartData(data));
  }, [id, type]);

  options.plugins.title.text = `Аналитика ${
    anUser.user?.fullname ?? "пользователь"
  }`;

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container spacing={{ xs: 1, sm: 2, md: 4, lg: 8 }}>
              <Grid item xs={12} md={12} sm={12} lg={3}>
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
                    noWrap
                    variant="h6"
                    fontSize={{ xs: "16px" }}
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
              <Grid item xs={12} md={12} sm={12} lg={9}>
                <Bar options={options} data={chartData} />
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    </>
  );
};
