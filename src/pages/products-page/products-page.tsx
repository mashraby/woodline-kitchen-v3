import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MiniDrawer } from "../../components/sidebar/sidebar";
import { ReloadContext } from "../../context/reload.context";
import { IProduct } from "../../interfaces/products.interface";
import { getProducts } from "../../services/api";
import { AddProductModal } from "./add-product-modal/add-product-modal";
import { ProductsTable } from "./products-table/products-table";

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

export const ProductsPage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const {reload} = useContext(ReloadContext)

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, [reload]);

  return (
    <>
      <AddProductModal open={open} setOpen={setOpen} />
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            px: 3,
            py: 12,
          }}
        >
          <FlexWrapper>
            <Typography variant="h4" component="h2">
              Продукты
            </Typography>
            <Button onClick={() => setOpen(true)} variant="contained">
              Добавить продукты
            </Button>
          </FlexWrapper>

          <ProductsTable products={products} />
        </Box>
      </Box>
    </>
  );
};
