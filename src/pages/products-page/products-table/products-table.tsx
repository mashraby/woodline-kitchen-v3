import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  IProduct,
  IProductsProps,
} from "../../../interfaces/products.interface";
import accounting from "accounting";
import { Button } from "@mui/material";
import { EditProductModal } from "../edit-product-modal/edit-modal";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
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

export const ProductsTable: React.FC<IProductsProps> = (props) => {
  const products: IProduct[] = props.products as any;
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const [prId, setPrId] = useState<string>("");

  const handleClick = (p: IProduct) => {
    setOpen(true);
    setName(p.name);
    setCost(p.cost);
    setPrId(p._id);
  };

  return (
    <>
      <EditProductModal
        open={open}
        setOpen={setOpen}
        name={name}
        cost={cost}
        id={prId}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ИД</StyledTableCell>
              <StyledTableCell>Продукт</StyledTableCell>
              <StyledTableCell>Цена</StyledTableCell>
              <StyledTableCell>Изменить</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product, index) => (
              <StyledTableRow key={product._id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>{product.name}</StyledTableCell>
                <StyledTableCell>
                  {accounting.formatNumber(product.cost, 0, " ") + " сум"}
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    onClick={() => handleClick(product)}
                    variant="outlined"
                  >
                    Изменить
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
