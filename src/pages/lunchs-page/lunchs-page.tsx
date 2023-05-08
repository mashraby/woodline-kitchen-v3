import React, { useEffect, useState } from "react";

// MUI components
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

// My Components
import { MiniDrawer } from "../../components/sidebar/sidebar";
import { ILunch } from "../../interfaces/lunchs.interfaces";
import { getLunchs } from "../../services/api";
import { LunchsTable } from "./lunchs-table/lunchs-table";
import { AxiosError } from "axios";

export const LunchsPage: React.FC = () => {
  const [lunchs, setLunchs] = useState<ILunch[]>([]);

  useEffect(() => {
    getLunchs().then((data) => {
      setLunchs(data);
    }).catch((err: AxiosError) => {
      if (err.response?.status === 401) {
        window.localStorage.removeItem("token");
        window.location.reload();
        window.location.href = "/login";
      }
    });
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />

        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
          <Typography sx={{my: 2}} variant="h4" component="h2">
            Обеды
          </Typography>
          

          <LunchsTable lunchs={lunchs} />
        </Box>
      </Box>
    </>
  );
};