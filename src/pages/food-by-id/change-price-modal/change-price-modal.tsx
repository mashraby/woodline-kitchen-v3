import React, { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { TextField, Typography } from "@mui/material";
import { ReloadContext } from "../../../context/reload.context";
import { IChangeFoodProps } from "../../../interfaces/foods.interfaces";
import { updateFoodPrice } from "../../../services/api";
import { toast } from "react-toastify";

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

export const ChangeFoodModal: React.FC<IChangeFoodProps> = (props) => {
  const { changeOpen, setChangeOpen, oldCost, foodId } = props;
  const handleClose = () => setChangeOpen(false);
  const [costEmpty, setCostEmty] = useState<boolean>(false);
  const [newCost, setNewCost] = useState<number>();
  const { reload, setReload } = useContext(ReloadContext);

  const changeFoodPrice = (): void => {
    if (newCost !== undefined) {
      setReload(!reload);
      updateFoodPrice(foodId, newCost)
        .then((data) => {
          if (data && data.status === 200) {
            toast.success("Food narxi o'zgartirildi");
          }
        })
        .catch((err) => {
          if (err) {
            toast.error("Muammo yuz berdi qayta urinib koring");
          }
        })
        .finally(() => {
          setNewCost(undefined);
          setChangeOpen(false);
        });
    } else {
      toast.warning("Hali ovqat narxini o'zgartirmadingiz");
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={changeOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={changeOpen}>
          <Box sx={style}>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h4"
              component="div"
            >
              Изменить цену
            </Typography>
            <TextField
              defaultValue={oldCost}
              error={costEmpty ? true : false}
              type="number"
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setCostEmty(false);
                setNewCost(+e.target.value);
              }}
              sx={{ my: 2, width: "100%" }}
              id={costEmpty ? "outlined-error" : "outlined-basic"}
              label={costEmpty ? "Введите значение" : "Напишите стоимость еды"}
              variant="outlined"
            />

            <Button
              onClick={changeFoodPrice}
              sx={{ width: "100%" }}
              variant="contained"
              endIcon={<ChangeCircleIcon />}
            >
              Изменить цену
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
