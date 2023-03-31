import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  IPayment,
  IPaymentsProps,
} from "../../../interfaces/payments.interfacess";
import accounting from "accounting";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const PaymentsTable: React.FC<IPaymentsProps> = (props) => {
  const payments: IPayment[] = props.payments as any;
  const size: number = props.size;
  const page: number = props.page;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Balance</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments?.map((payment, index) => {
              return (
                <StyledTableRow key={payment._id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{payment.user?.fullname}</StyledTableCell>
                  <StyledTableCell>
                    {accounting.formatNumber(payment.balance, 0, " ") + " so'm"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {accounting.formatNumber(payment.amount, 0, " ") + " so'm"}
                  </StyledTableCell>
                  <StyledTableCell>{payment.date}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
