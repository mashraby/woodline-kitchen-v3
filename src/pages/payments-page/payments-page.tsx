import React, { useContext, useEffect, useState } from "react";
import MiniDrawer from "../../components/sidebar/sidebar";
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
import {
  getPaginationPayments,
  getPayments,
  searchPayments,
} from "../../services/api.service";
import { IPayment } from "../../interfaces/payments.interfacess";
import { PaymentsTable } from "./payments-table/payments-table";
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

export const PaymentsPage: React.FC = () => {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [totalPage, setTotalPage] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { pathname } = useLocation();
  const { searchValue } = useContext(SearchContext);

  useEffect(() => {
    pathname === "/payments" && searchValue.trim() !== ""
      ? searchPayments(searchValue).then((data) => {
          console.log(data);
          setPayments(data);
        })
      : getPaginationPayments(page, pageSize)
          .then((data) => {
            setPayments(data.payments);
            setTotalPage(data.totalPages);
          })
          .catch((err: AxiosError) => {
            if (err.response?.status === 401) {
              window.localStorage.removeItem("token");
              window.location.reload();
              window.location.href = "/login";
            }
          });
  }, [page, pageSize, searchValue]);

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
            Платежи
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
        <PaymentsTable payments={payments} size={pageSize} page={page} />
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
