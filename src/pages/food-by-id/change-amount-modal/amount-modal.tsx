import React, { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { TextField, Typography } from "@mui/material";
import { ReloadContext } from "../../../context/reload.context";
import { IChangeAmountProps } from "../../../interfaces/foods.interfaces";
import {
  putProductAmount,
  updateFoodPrice,
} from "../../../services/api.service";
import { toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";

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

export const ChangeAmountModal: React.FC<IChangeAmountProps> = (props) => {
  const { amountOpen, setAmountOpen, amount, prodId, changeFoodId } = props;
  const handleClose = () => setAmountOpen(false);
  const { reload, setReload } = useContext(ReloadContext);
  const [newAmount, setNewAmount] = useState<number>(0);

  const handleChangeAmount = () => {
    if (newAmount !== 0) {
      putProductAmount(changeFoodId as string, prodId, newAmount)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            toast.success("Amount muvaffaqiyatli ozgartirildi");
          }
        })
        .catch((err: AxiosError) => {
          if (err) {
            toast.error("Amount ozgarmadi qayta urinib koring");
          }
        })
        .finally(() => {
          setReload(!reload);
          setAmountOpen(false);
          setNewAmount(0);
        });
    } else {
      toast.warning("Hali amountni ozgartirmadingiz");
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={amountOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={amountOpen}>
          <Box sx={style}>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h4"
              component="div"
            >
              Change amount
            </Typography>
            <TextField
              onChange={(evt) => setNewAmount(+evt.target.value)}
              defaultValue={amount}
              type="number"
              sx={{ my: 2, width: "100%" }}
              id={"outlined-basic"}
              label={"Amount"}
              variant="outlined"
            />

            <Button
              onClick={handleChangeAmount}
              sx={{ width: "100%" }}
              variant="contained"
              endIcon={<ChangeCircleIcon />}
            >
              Change amount
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
