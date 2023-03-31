import React, { useContext, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "styled-components";
import { MiniDrawer } from "../../components/sidebar/sidebar";
import { IWarehouse } from "../../interfaces/warehouse.interface";
import { getWarehouses } from "../../services/api";
import { WareHouseTable } from "./warehouse-table/warehouse-table";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AddWarehouseModal } from "./add-modal/add-modal";
import { ReloadContext } from "../../context/reload.context";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

export const WareHousePage: React.FC = () => {
  const [warehouses, setWarehouses] = useState<Array<IWarehouse>>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { reload } = useContext(ReloadContext);

  useEffect(() => {
    getWarehouses().then((data) => {
      setWarehouses(data);
    });
  }, [reload]);

  return (
    <>
      <AddWarehouseModal open={open} setOpen={setOpen} />

      <Box sx={{ display: "flex" }}>
        <MiniDrawer />

        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
          <FlexWrapper>
            <Typography variant="h4" component="h2">
              Инвентаризация
            </Typography>

            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              endIcon={<AddCircleOutlineIcon />}
            >
              Добавить Инвентаризация
            </Button>
          </FlexWrapper>

          <WareHouseTable warehouses={warehouses} />
        </Box>
      </Box>
    </>
  );
};
