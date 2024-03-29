import React, { useContext, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import styled from "styled-components";
import MiniDrawer from "../../components/sidebar/sidebar";
import { IWarehouse } from "../../interfaces/warehouse.interface";
import { getWarehouses, searchWarehouse } from "../../services/api.service";
import { WareHouseTable } from "./warehouse-table/warehouse-table";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AddWarehouseModal } from "./add-modal/add-modal";
import { ReloadContext } from "../../context/reload.context";
import { AxiosError } from "axios";
import { SearchContext } from "../../context/search.context";
import { useLocation } from "react-router-dom";

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
  const { searchValue } = useContext(SearchContext);
  const { pathname } = useLocation();

  useEffect(() => {
    pathname === "/warehouse" && searchValue.trim() !== ""
      ? searchWarehouse(searchValue).then((data) => setWarehouses(data))
      : getWarehouses()
          .then((data) => {
            setWarehouses(data);
          })
          .catch((err: AxiosError) => {
            if (err.response?.status === 401) {
              window.localStorage.removeItem("token");
              window.location.reload();
              window.location.href = "/login";
            }
          });
  }, [reload, searchValue]);

  return (
    <>
      <AddWarehouseModal open={open} setOpen={setOpen} />

      <MiniDrawer>
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
      </MiniDrawer>
    </>
  );
};
