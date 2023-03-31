import { useContext, useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { IAddWarehouseProps } from "../../../interfaces/warehouse.interface";
import { IProduct } from "../../../interfaces/products.interface";
import { getProducts, postWarehouse } from "../../../services/api";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { ReloadContext } from "../../../context/reload.context";

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

export const AddWarehouseModal: React.FC<IAddWarehouseProps> = (props) => {
  const { open, setOpen } = props;
  const [products, setProducts] = useState<IProduct[]>([]);
  const handleClose = () => setOpen(false);
  const [product, setProduct] = useState<string | undefined>("");
  const [amount, setAmount] = useState<number>(0);
  const { reload, setReload } = useContext(ReloadContext);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const createWarehouse = () => {
    if (product === undefined || (product === "" && amount === 0)) {
      toast.warning("Inputlar bo'sh bo'lmasligi kerak");
    } else {
      postWarehouse(product, amount)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            toast.success("Successfully created");
          }
        })
        .catch((err) => {
          if (err) {
            toast.error("Qoshilmadi qayta urinib koring");
          }
        })
        .finally(() => {
          setOpen(false);
          setReload(!reload);
          setProduct("");
          setAmount(0);
        });
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h4"
              component="div"
            >
              Добавить Инвентаризация
            </Typography>
            <Autocomplete
              onChange={(evt, newVal) => {
                setProduct(newVal?.value);
              }}
              disablePortal
              id="combo-box-demo"
              options={products?.map((prod) => {
                return {
                  label: prod.name,
                  value: prod._id,
                  cost: prod.cost,
                };
              })}
              sx={{ my: 3 }}
              renderInput={(params) => (
                <TextField
                  onChange={(evt) => {
                    console.log(evt.target.value);
                  }}
                  {...params}
                  label={`product`}
                />
              )}
            />

            <TextField
              onChange={(evt) => setAmount(+evt.target.value)}
              sx={{ mb: 3 }}
              type="number"
              variant="outlined"
              label="amount"
              fullWidth
            />

            <Button
              onClick={createWarehouse}
              sx={{ width: "100%" }}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Добавить роль
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};