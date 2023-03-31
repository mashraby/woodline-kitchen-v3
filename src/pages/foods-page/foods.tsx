import React, { useContext, useEffect, useState } from "react";
import { MiniDrawer } from "../../components/sidebar/sidebar";
import { ReloadContext } from "../../context/reload.context";
import { getFoods } from "../../services/api";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Button, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FoodsTable } from "./foods-table/foods-table";
import { IFood } from "../../interfaces/foods.interfaces";
import { AddFoodModal } from "./add-food-modal/add-food-modal";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

export const FoodsPage: React.FC = () => {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { reload } = useContext(ReloadContext);


  useEffect((): void => {
    getFoods().then((data) => {
      setFoods(data);
    });
  }, [reload]);

  return (
    <>
      <AddFoodModal open={open} setOpen={setOpen} />
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
          <FlexWrapper>
            <Typography variant="h4" component="h2">
              Еда
            </Typography>
            <Button
              onClick={(): void => setOpen(true)}
              variant="contained"
              endIcon={<AddCircleOutlineIcon />}
            >
              Добавить еду
            </Button>
          </FlexWrapper>
          <FoodsTable foods={foods} />
        </Box>
      </Box>
    </>
  );
};
