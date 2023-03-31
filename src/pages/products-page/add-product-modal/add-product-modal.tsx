import { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { TextField, Typography } from "@mui/material";
import { postProduct } from "../../../services/api";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";
import { ReloadContext } from "../../../context/reload.context";
import { IAddProductProps } from "../../../interfaces/products.interface";

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

export const AddProductModal: React.FC<IAddProductProps> = (props) => {
  const { open, setOpen } = props;
  const handleClose = () => setOpen(false);
  const [nameEmpty, setNameEmpty] = useState<boolean>(false);
  const [costEmpty, setCostEmpty] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<number>(0);
  const { reload, setReload } = useContext(ReloadContext);

  const createProduct = () => {
    if (name !== "" && cost !== 0) {
      postProduct(name, cost)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            toast.success("Product muvaffaqiyatli qo'shildi");
          }
        })
        .finally(() => {
          setReload(!reload);
          setOpen(false);
          setName("");
          setCost(0);
        })
        .catch((err: AxiosError) => {
          if (err) {
            toast.error("Product qo'shilmadi qayta urinib koring");
          }
        });
    } else {
      setNameEmpty(true);
      setCostEmpty(true);
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
              Добавить продукты
            </Typography>
            <TextField
              type="text"
              error={nameEmpty ? true : false}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setNameEmpty(false);
                setName(e.target.value);
              }}
              sx={{ my: 2, width: "100%" }}
              id={nameEmpty ? "outlined-error" : "outlined-basic"}
              label={
                nameEmpty ? "Введите значение" : "Введите название продукта"
              }
              variant="outlined"
            />
            <TextField
              type="number"
              error={costEmpty ? true : false}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setCostEmpty(false);
                setCost(+e.target.value);
              }}
              sx={{ mb: 2, width: "100%" }}
              id={costEmpty ? "outlined-error" : "outlined-basic"}
              label={
                costEmpty ? "Введите значение" : "Введите стоимость продукта"
              }
              variant="outlined"
            />
            <Button
              onClick={createProduct}
              sx={{ width: "100%" }}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Добавить продукты
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
