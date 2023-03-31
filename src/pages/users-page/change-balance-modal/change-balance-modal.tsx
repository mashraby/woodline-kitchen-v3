import React, { useContext, useState } from "react";
import { TextField, Typography, Button, Modal, Box } from "@mui/material";
import { IOpenModalProps } from "../../../interfaces/users.interfaces";
import { postBalance } from "../../../services/api";
import { ReloadContext } from "../../../context/reload.context";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { toast } from "react-toastify";
import accounting from "accounting";

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

export const BasicModal: React.FC<IOpenModalProps> = (props) => {
  const { setOpen, open, text, userId, balance, setBalance } = props;
  const handleClose = () => setOpen(false);
  const [empty, setEmpty] = useState<boolean>(false);
  const [changeBalance, setChangeBalance] = useState<number>();
  const { reload, setReload } = useContext(ReloadContext);

  const handleChangeBalance = (): void => {
    if (changeBalance !== undefined) {
      postBalance(userId, changeBalance, true)
        .then((res) => console.log(res))
        .finally((): void => {
          setChangeBalance(undefined);
          setOpen(false);
          setReload(!reload);
          toast.success("Balance qo'shildi");
        });
    } else {
      setEmpty(true);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ mb: 1.5 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {"Fullname: " + text}
          </Typography>
          <Typography
            sx={{ mb: 1.5 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {"Balance: " + accounting.formatNumber(balance, 0, " ") + " so'm"}
          </Typography>
          <TextField
            error={empty ? true : false}
            required={true}
            type="number"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ): void => {
              setEmpty(false);
              setChangeBalance(+e.target.value);

            }}
            sx={{ width: 1, mb: 1.5 }}
            id={empty ? "outlined-error" : "outlined-basic"}
            label={empty ? "Введите значение" : "Добавить баланс"}
            variant="outlined"
          />    
          <Button
            onClick={handleChangeBalance}
            sx={{ width: 1 }}
            variant="contained"
            endIcon={<AddCircleOutlineIcon />}
          >
            Добавить баланс
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
