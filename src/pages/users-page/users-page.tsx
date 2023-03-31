import React, { useContext, useEffect, useState } from "react";
import { MiniDrawer } from "../../components/sidebar/sidebar";
import { ReloadContext } from "../../context/reload.context";
import { IPerson } from "../../interfaces/users.interfaces";
import { getUsers, getUsersPagination } from "../../services/api";
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

  useEffect((): void => {
    getUsersPagination(page, pageSize).then((data) => {
      setUsers(data.users);
      setTotalPage(data.totalPages);
    });
  }, [reload, page, pageSize]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
          <FlexWrapper>
            <Typography variant="h4" component="h2">
              Пользователи
            </Typography>

            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">
                size
              </InputLabel>
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
          <Pagination
            onChange={handlePageChange}
            sx={{ mt: 5, display: "flex", justifyContent: "center" }}
            count={totalPage}
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
};
