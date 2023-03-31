import { useContext, useEffect, useState } from "react";
import {
  IPerson,
  IRow,
  UsersTableProps,
} from "../../../interfaces/users.interfaces";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, FormControlLabel, Switch, SwitchProps } from "@mui/material";
import accounting from "accounting";
import { getProducts, updateUserStatus } from "../../../services/api";
import { ReloadContext } from "../../../context/reload.context";
import {
  IWarehouse,
  IWarehouseProps,
} from "../../../interfaces/warehouse.interface";
import { IProduct } from "../../../interfaces/products.interface";
import { AddTakeModal } from "../add-take-modal/add-take-modal";

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

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
export const WareHouseTable: React.FC<IWarehouseProps> = (props) => {
  const warehouses: IWarehouse[] = props.warehouses;
  const [takeOpen, setTakeOpen] = useState<boolean>(false);
  const [prId, setPrId] = useState<string>("");

  return (
    <>
      <AddTakeModal
        takeOpen={takeOpen}
        setTakeOpen={setTakeOpen}
        productId={prId}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Food Name</StyledTableCell>
              <StyledTableCell>Food Cost</StyledTableCell>
              <StyledTableCell>Total Cost</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Add</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {warehouses?.map((w, index) => {
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{w.product.name}</StyledTableCell>
                  <StyledTableCell>
                    {accounting.formatNumber(w.product.cost, 0, " ") + " so'm"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {accounting.formatNumber(
                      w.product.cost * w.amount,
                      0,
                      " "
                    ) + " so'm"}
                  </StyledTableCell>
                  <StyledTableCell>{w.amount}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      onClick={() => {
                        setPrId(w._id);
                        setTakeOpen(true);
                      }}
                      variant="outlined"
                    >
                      Add or remove take
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
