import React, { useContext, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { ReloadContext } from "../../../context/reload.context";
import {
  IAddNewProductProps,
  IChangeFoodProps,
} from "../../../interfaces/foods.interfaces";
import { addProductById, getProducts } from "../../../services/api";
import { toast } from "react-toastify";
import { IProduct } from "../../../interfaces/products.interface";
import { AxiosResponse } from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const AddNewProductModal: React.FC<IAddNewProductProps> = (props) => {
  const { newProdOpen, setNewProdOpen, foodId } = props;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [product, setProduct] = useState<string | undefined>();
  const [amount, setAmount] = useState<number>(0);

  const handleClose = () => setNewProdOpen(false);

  const { reload, setReload } = useContext(ReloadContext);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, [reload]);

  const handleCreateNewProduct = () => {
    if (product !== undefined && amount !== 0) {
      addProductById(foodId as string, product as string, amount)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            toast.success("Product qo'shildi");
          }
        })
        .catch((err) => {
          if (err) {
            toast.error("Product qo'shilmadi qayta urinib koring");
          }
        })
        .finally(() => {
          setNewProdOpen(false);
          setReload(!reload);
          setProduct(undefined);
          setAmount(0);
        });
    } else {
      toast.info("Inputlar bo'sh bo'lmasligi lozim");
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={newProdOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={newProdOpen}>
          <Box sx={style}>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h4"
              component="div"
            >
              Добавить продукт
            </Typography>

            <Autocomplete
              onChange={(_, newVal) => {
                setProduct(newVal?.value);
              }}
              disablePortal
              id="combo-box-demo"
              options={products?.map((prod) => {
                return {
                  label: prod.name,
                  value: prod._id,
                };
              })}
              sx={{ mt: 2 }}
              renderInput={(params) => (
                <TextField {...params} label={`product`} />
              )}
            />

            <TextField
              type="number"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setAmount(+e.target.value);
              }}
              sx={{ my: 2, width: "100%" }}
              id={"outlined-basic"}
              label={"amount"}
              variant="outlined"
            />

            <Button
              onClick={handleCreateNewProduct}
              sx={{ width: "100%" }}
              variant="contained"
              endIcon={<ChangeCircleIcon />}
            >
              Добавить продукт
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
