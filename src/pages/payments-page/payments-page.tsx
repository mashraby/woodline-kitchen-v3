import React, { useContext, useEffect, useState } from "react";
import { MiniDrawer } from "../../components/sidebar/sidebar";
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
import { getPaginationPayments, getPayments } from "../../services/api";
import { IPayment } from "../../interfaces/payments.interfacess";
import { PaymentsTable } from "./payments-table/payments-table";

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

  useEffect(() => {
    getPaginationPayments(page, pageSize).then((data) => {
      setPayments(data.payments);
      setTotalPage(data.totalPages);
    });
  }, [page, pageSize]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  console.log(payments);
  console.log(page);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 12 }}>
          <FlexWrapper>
            <Typography variant="h4" component="h2">
              Платежи
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
          <PaymentsTable payments={payments} size={pageSize} page={page} />
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
