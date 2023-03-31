import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { MiniDrawer } from "../../components/sidebar/sidebar";
import { ReloadContext } from "../../context/reload.context";
import { IDeedline } from "../../interfaces/deedline.interface";
import { getDeedlines } from "../../services/api";
import { DeedlineTable } from "./deedline-table/deedline-table";

export const DeedlinePage: React.FC = () => {
  const [deedlines, setDeedlines] = useState<IDeedline[]>([]);
  const {reload} = useContext(ReloadContext)

  useEffect(() => {
    getDeedlines().then((data) => {
      setDeedlines(data);
    });
  }, [reload]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
          <Typography sx={{mb: 2}} variant="h4" component="h2">
            Срок действия
          </Typography>

          <DeedlineTable deedlines={deedlines} />
        </Box>
      </Box>
    </>
  );
};
