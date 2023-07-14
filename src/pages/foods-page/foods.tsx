import React, { useContext, useEffect, useState } from "react";
import MiniDrawer from "../../components/sidebar/sidebar";
import { ReloadContext } from "../../context/reload.context";
import { getFoods, searchFood } from "../../services/api.service";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Button, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FoodsTable } from "./foods-table/foods-table";
import { IFood } from "../../interfaces/foods.interfaces";
import { AddFoodModal } from "./add-food-modal/add-food-modal";
import { AxiosError } from "axios";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../context/search.context";

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

  const { pathname } = useLocation();
  const { searchValue } = useContext(SearchContext);

  useEffect((): void => {
    pathname === "/foods" && searchValue.trim() !== ""
      ? searchFood(searchValue).then((data) => {
          setFoods(data);
        })
      : getFoods()
          .then((data) => {
            setFoods(data);
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
      <AddFoodModal open={open} setOpen={setOpen} />
      <MiniDrawer>
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
      </MiniDrawer>
    </>
  );
};
