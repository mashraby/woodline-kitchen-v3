import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import MiniDrawer from "../../components/sidebar/sidebar";
import { ReloadContext } from "../../context/reload.context";
import { IProduct } from "../../interfaces/products.interface";
import { getProducts, searchProduct } from "../../services/api.service";
import { AddProductModal } from "./add-product-modal/add-product-modal";
import { ProductsTable } from "./products-table/products-table";
import { AxiosError } from "axios";
import { SearchContext } from "../../context/search.context";
import { useLocation } from "react-router-dom";

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
  const { reload } = useContext(ReloadContext);
  const { searchValue } = useContext(SearchContext);
  const { pathname } = useLocation();

  useEffect(() => {
    pathname === "/products" && searchValue.trim() !== ""
      ? searchProduct(searchValue).then((data) => setProducts(data))
      : getProducts()
          .then((data) => {
            setProducts(data);
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
      <AddProductModal open={open} setOpen={setOpen} />
      <MiniDrawer>
        <FlexWrapper>
          <Typography variant="h4" component="h2">
            Продукты
          </Typography>
          <Button onClick={() => setOpen(true)} variant="contained">
            Добавить продукты
          </Button>
        </FlexWrapper>

        <ProductsTable products={products} />
      </MiniDrawer>
    </>
  );
};
