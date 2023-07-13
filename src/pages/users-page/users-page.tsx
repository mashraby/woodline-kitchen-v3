import React, { useContext, useEffect, useState } from "react";
import MiniDrawer from "../../components/sidebar/sidebar";
import { ReloadContext } from "../../context/reload.context";
import { IPerson } from "../../interfaces/users.interfaces";
import {
  getSearchUsers,
  getUsers,
  getUsersPagination,
} from "../../services/api.service";
import { UsersTable } from "./users-table/users-table";
import Box from "@mui/material/Box";
import styled from "styled-components";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import { getUserAnalytics } from "../../services/analytics.service";
import { instance } from "../../config/axios.config";
import { SearchContext } from "../../context/search.context";
import { useLocation } from "react-router-dom";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<IPerson[]>([]);
  const [totalPage, setTotalPage] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { reload } = useContext(ReloadContext);
  const { searchValue } = useContext(SearchContext);
  const { pathname } = useLocation();

  useEffect((): void => {
    searchValue !== "" && pathname === "/users"
      ? getSearchUsers(searchValue).then((data) => setUsers(data))
      : getUsersPagination(page, pageSize)
          .then((data) => {
            setUsers(data.users);

            setTotalPage(data.totalPages);
          })
          .catch((err: AxiosError) => {
            if (err.response?.status === 401) {
              window.localStorage.removeItem("token");
              window.location.reload();
              window.location.href = "/login";
            }
          });
  }, [reload, page, pageSize, searchValue]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  return (
    <>
      <MiniDrawer>
        <FlexWrapper>
          <Typography variant="h4" component="h2">
            Пользователи
          </Typography>

          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-required-label">size</InputLabel>
            <Select
              defaultValue="10"
              onChange={(e: SelectChangeEvent) => {
                setPageSize(+e.target.value);
              }}
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              label="size *"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </FlexWrapper>
        <UsersTable users={users} />
        {searchValue === "" ? (
          <Pagination
            onChange={handlePageChange}
            sx={{ mt: 5, display: "flex", justifyContent: "center" }}
            count={totalPage}
            color="primary"
          />
        ) : null}
      </MiniDrawer>
    </>
  );
};
