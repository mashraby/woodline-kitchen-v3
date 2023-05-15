import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ILunch, ILunchsProps } from "../../../interfaces/lunchs.interfaces";
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

export const LunchsTable: React.FC<ILunchsProps> = (props) => {
  const lunchs: ILunch[] = props.lunchs as any;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ИД</StyledTableCell>
              <StyledTableCell>Еда</StyledTableCell>
              <StyledTableCell>Цена</StyledTableCell>
              <StyledTableCell>Согласен пользователей</StyledTableCell>
              <StyledTableCell>Несогласные пользователей</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lunchs?.map((lunch, index) => (
              <StyledTableRow key={lunch._id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>
                  {lunch.food?.name ? lunch.food?.name : ""}
                </StyledTableCell>
                <StyledTableCell>
                  {accounting.formatNumber(
                    lunch.food?.cost ? lunch.food?.cost : 0,
                    0,
                    " "
                  ) + " so'm"}
                </StyledTableCell>
                <StyledTableCell>{lunch.agree_users.length}</StyledTableCell>
                <StyledTableCell>{lunch.disagree.length}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
