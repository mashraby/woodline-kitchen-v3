import React, { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { editProduct, postProduct } from "../../../services/api";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";
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

interface EditProductProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  cost: number;
  id: string;
}

export const EditProductModal: React.FC<EditProductProps> = (props) => {
  const { open, setOpen, name, cost, id } = props;
  const handleClose = () => setOpen(false);
  const [nameEmpty, setNameEmpty] = useState<string>("");
  const [costEmpty, setCostEmpty] = useState<number>(0);
  const { reload, setReload } = useContext(ReloadContext);

  const editProductFn = () => {
    if (nameEmpty === "" && costEmpty === 0) {
      toast.warning("Hali malumotlarni ozgartirmadingiz");
    } else {
      editProduct({ id: id, name: nameEmpty, cost: costEmpty })
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            toast.success("product ozgartirildi");
          }
        })
        .catch((err: AxiosError) => {
          if (err) {
            toast.error("Product ozgarmadi qayta urinib koring");
          }
        })
        .finally(() => {
          setReload(!reload);
          setNameEmpty("");
          setCostEmpty(0);
          setOpen(false);
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
              Изменить продукты
            </Typography>
            <TextField
              type="text"
              defaultValue={name}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setNameEmpty(e.target.value);
              }}
              sx={{ my: 2, width: "100%" }}
              id={"outlined-basic"}
              label={"Введите название продукта"}
              variant="outlined"
            />
            <TextField
              type="number"
              defaultValue={cost}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setCostEmpty(+e.target.value);
              }}
              sx={{ mb: 2, width: "100%" }}
              id={"outlined-basic"}
              label={"Введите стоимость продукта"}
              variant="outlined"
            />
            <Button
              onClick={editProductFn}
              sx={{ width: "100%" }}
              variant="contained"
            >
              Изменить продукты
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
